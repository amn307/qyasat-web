import type { AnalyticsEvent } from "./types";
import fs from "node:fs/promises";
import path from "node:path";
import { runtimeStoragePath } from "@/lib/storage/runtime-path";
import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { requirePersistentStorage } from "@/lib/firebase/cms-store";

const COLLECTION = "analytics_events";
const MAX_EVENTS = 20000;
const localPath = runtimeStoragePath(
  "storage",
  "private",
  "analytics-events.json"
);

async function readLocal(): Promise<AnalyticsEvent[]> {
  try {
    return JSON.parse(
      await fs.readFile(localPath, "utf8")
    ) as AnalyticsEvent[];
  } catch {
    return [];
  }
}

async function writeLocal(events: AnalyticsEvent[]) {
  requirePersistentStorage();

  await fs.mkdir(path.dirname(localPath), {
    recursive: true,
  });

  await fs.writeFile(
    localPath,
    JSON.stringify(events.slice(-MAX_EVENTS), null, 2) + "\n",
    "utf8"
  );
}

/**
 * Firestore does not allow undefined values.
 * This recursively removes undefined values while preserving
 * strings, numbers, booleans, nulls, arrays and nested objects.
 */
function removeUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .filter((item) => item !== undefined)
      .map((item) => removeUndefined(item)) as T;
  }

  if (
    value !== null &&
    typeof value === "object"
  ) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, item]) => item !== undefined)
        .map(([key, item]) => [
          key,
          removeUndefined(item),
        ])
    ) as T;
  }

  return value;
}

export async function readAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  if (!isFirebaseAdminConfigured()) {
    return readLocal();
  }

  const snapshot = await getAdminDb()
    .collection(COLLECTION)
    .orderBy("timestamp", "desc")
    .limit(MAX_EVENTS)
    .get();

  return snapshot.docs
    .map((doc) => doc.data() as AnalyticsEvent)
    .reverse();
}

export async function appendAnalyticsEvent(
  event: AnalyticsEvent
) {
  if (!isFirebaseAdminConfigured()) {
    const events = await readLocal();
    events.push(event);
    await writeLocal(events);
    return;
  }

  const cleanEvent = removeUndefined(event);

  await getAdminDb()
    .collection(COLLECTION)
    .add(cleanEvent);
}

export function buildAnalyticsReport(
  events: AnalyticsEvent[],
  days = 30
) {
  const since = Date.now() - days * 86400000;

  const filtered = events.filter(
    (event) =>
      new Date(event.timestamp).getTime() >= since
  );

  const sessions = new Map<
    string,
    AnalyticsEvent[]
  >();

  for (const event of filtered) {
    const list =
      sessions.get(event.sessionId) || [];

    list.push(event);

    sessions.set(
      event.sessionId,
      list
    );
  }

  const countBy = (
    selector: (
      event: AnalyticsEvent
    ) => string,
    match?: (
      event: AnalyticsEvent
    ) => boolean
  ) => {
    const map = new Map<
      string,
      number
    >();

    for (const event of filtered) {
      if (
        match &&
        !match(event)
      ) {
        continue;
      }

      const key =
        selector(event) ||
        "Unknown";

      map.set(
        key,
        (map.get(key) || 0) + 1
      );
    }

    return [
      ...map.entries(),
    ]
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, 10)
      .map(
        ([name, value]) => ({
          name,
          value,
        })
      );
  };

  let totalEngagement = 0;
  let engagedSessions = 0;

  const recentSessions = [
    ...sessions.entries(),
  ]
    .map(
      ([sessionId, list]) => {
        const sorted = [
          ...list,
        ].sort((a, b) =>
          a.timestamp.localeCompare(
            b.timestamp
          )
        );

        const pageViews =
          sorted.filter(
            (event) =>
              event.type ===
              "page_view"
          );

        const engagement =
          sorted.reduce(
            (sum, event) =>
              sum +
              (event.durationMs ||
                0),
            0
          );

        totalEngagement +=
          engagement;

        if (engagement > 0) {
          engagedSessions++;
        }

        return {
          sessionId,
          visitorId:
            sorted[0]
              ?.visitorId,
          startedAt:
            sorted[0]
              ?.timestamp,
          lastActivityAt:
            sorted.at(-1)
              ?.timestamp,
          entryPage:
            pageViews[0]
              ?.path ||
            sorted[0]?.path,
          exitPage:
            pageViews.at(-1)
              ?.path ||
            sorted.at(-1)
              ?.path,
          path: pageViews.map(
            (event) =>
              event.path
          ),
          durationMs:
            engagement,
          events:
            sorted.length,
        };
      }
    )
    .sort((a, b) =>
      (
        b.lastActivityAt ||
        ""
      ).localeCompare(
        a.lastActivityAt ||
          ""
      )
    )
    .slice(0, 25);

  const uniqueVisitors =
    new Set(
      filtered.map(
        (event) =>
          event.visitorId
      )
    ).size;

  const pageViews =
    filtered.filter(
      (event) =>
        event.type ===
        "page_view"
    ).length;

  return {
    rangeDays: days,

    summary: {
      visitors:
        uniqueVisitors,

      sessions:
        sessions.size,

      pageViews,

      averageEngagementMs:
        engagedSessions
          ? Math.round(
              totalEngagement /
                engagedSessions
            )
          : 0,

      conversions:
        filtered.filter(
          (event) =>
            [
              "contact_form_submit",
              "whatsapp_click",
              "phone_click",
              "email_click",
            ].includes(
              event.type
            )
        ).length,
    },

    topPages: countBy(
      (event) =>
        event.path,
      (event) =>
        event.type ===
        "page_view"
    ),

    exitPages:
      recentSessions
        .reduce(
          (
            acc: {
              name: string;
              value: number;
            }[],
            session
          ) => {
            const name =
              session.exitPage ||
              "Unknown";

            const found =
              acc.find(
                (item) =>
                  item.name ===
                  name
              );

            if (found) {
              found.value++;
            } else {
              acc.push({
                name,
                value: 1,
              });
            }

            return acc;
          },
          []
        )
        .sort(
          (a, b) =>
            b.value -
            a.value
        )
        .slice(0, 10),

    events: countBy(
      (event) =>
        event.type
    ),

    referrers: countBy(
      (event) =>
        event.referrer ||
        "Direct",
      (event) =>
        event.type ===
        "page_view"
    ),

    recentSessions,
  };
}