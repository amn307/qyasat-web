"use client";
import { useEffect } from "react";

function id(key: string, session = false) {
  const store = session ? sessionStorage : localStorage;
  let value = store.getItem(key);
  if (!value) { value = crypto.randomUUID(); store.setItem(key, value); }
  return value;
}

export function VisitorTracker({ enabled, locale }: { enabled: boolean; locale: string }) {
  useEffect(() => {
    if (!enabled || navigator.doNotTrack === "1") return;
    const visitorId = id("qyasat_visitor_id"); const sessionId = id("qyasat_session_id", true);
    let lastTick = Date.now(); let active = document.visibilityState === "visible";
    const send = (type: string, extra: Record<string, unknown> = {}) => {
      const payload = JSON.stringify({ visitorId, sessionId, type, path: location.pathname + location.search, title: document.title, referrer: document.referrer, locale, ...extra });
      if (type === "session_end" && navigator.sendBeacon) navigator.sendBeacon("/api/analytics/collect", new Blob([payload], {type:"application/json"}));
      else fetch("/api/analytics/collect", {method:"POST",headers:{"content-type":"application/json"},body:payload,keepalive:true}).catch(()=>{});
    };
    send("page_view");
    const heartbeat = setInterval(() => { if(active){ const now=Date.now(); send("engagement", {durationMs: now-lastTick}); lastTick=now; } }, 15000);
    const visibility = () => { const now=Date.now(); if(active && document.visibilityState !== "visible") send("engagement", {durationMs: now-lastTick}); active=document.visibilityState === "visible"; lastTick=now; };
    const click = (event: MouseEvent) => { const el=(event.target as HTMLElement).closest("a,button") as HTMLElement | null; if(!el) return; const text=(el.innerText||el.getAttribute("aria-label")||"").trim().slice(0,120); const href=el instanceof HTMLAnchorElement ? el.href : ""; let type="click"; if(/wa\.me|whatsapp/i.test(href+text)) type="whatsapp_click"; else if(/^tel:/i.test(href)) type="phone_click"; else if(/^mailto:/i.test(href)) type="email_click"; send(type,{metadata:{text,href}}); };
    let scroll50=false, scroll90=false; const scroll=()=>{const p=(scrollY+innerHeight)/document.documentElement.scrollHeight; if(p>=.5&&!scroll50){scroll50=true;send("scroll_50")} if(p>=.9&&!scroll90){scroll90=true;send("scroll_90")}};
    document.addEventListener("visibilitychange", visibility); document.addEventListener("click", click); addEventListener("scroll",scroll,{passive:true}); addEventListener("pagehide",()=>send("session_end"));
    return ()=>{clearInterval(heartbeat);document.removeEventListener("visibilitychange",visibility);document.removeEventListener("click",click);removeEventListener("scroll",scroll)};
  }, [enabled, locale]);
  return null;
}
