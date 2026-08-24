"use client";

import { useEffect, useState } from "react";

const KEY = "qyasat_admin_lang";

const pairs = [
  ["قياسات", "Qyasat"],
  ["لوحة التحكم", "Control Panel"],
  ["إدارة موقع qyasat.sa", "qyasat.sa Admin"],
  ["الرئيسية", "Dashboard"],
  ["خريطة المشروع", "Roadmap"],
  ["الثيم والستايل", "Theme & Style"],
  ["الإعدادات", "Settings"],
  ["حساب الإدارة", "Admin Account"],
  ["نصوص الرئيسية", "Homepage Texts"],
  ["المشاريع", "Projects"],
  ["الميديا", "Media"],
  ["الخدمات", "Services"],
  ["البلوق", "Blog"],
  ["المدونة", "Blog"],
  ["الرسائل", "Messages"],
  ["تبديل الحساب", "Switch Account"],
  ["خروج", "Sign out"],

  ["سجّل دخولك باسم المستخدم وكلمة المرور. بعدها لوحة التحكم تفتح مباشرة.", "Log in with your username and password. The control panel will open directly."],
  ["اسم المستخدم", "Username"],
  ["كلمة المرور", "Password"],
  ["دخول", "Log in"],
  ["جاري تسجيل الدخول...", "Logging in..."],
  ["اسم المستخدم أو كلمة المرور غير صحيحة.", "Username or password is incorrect."],
  ["فشل إنشاء الدخول.", "Failed to create login session."],
  ["تم تسجيل الخروج.", "Signed out."],
  ["جاري فتح لوحة التحكم...", "Opening control panel..."],
  ["إذا لم تكن مسجلًا، سيتم تحويلك لصفحة الدخول.", "If you are not logged in, you will be redirected to the login page."],

  ["إدارة نصوص الموقع", "Site Texts Management"],
  ["تحكم مركزي بكل النصوص العربية والإنجليزية حسب المفتاح والقسم، مع واجهة مناسبة للتحرير السريع.", "Central control for Arabic and English texts by key and section, with a fast editing interface."],
  ["نسخ API النصوص", "Copy Texts API"],
  ["إضافة نص جديد", "Add New Text"],
  ["المفتاح", "Key"],
  ["القسم", "Section"],
  ["الاسم الداخلي", "Internal Name"],
  ["النص العربي", "Arabic Text"],
  ["النص الإنجليزي", "English Text"],
  ["إضافة النص", "Add Text"],
  ["كل الأقسام", "All Sections"],
  ["عربي", "Arabic"],
  ["إنجليزي", "English"],
  ["حفظ", "Save"],
  ["حفظ...", "Saving..."],
  ["حذف", "Delete"],
  ["لا توجد نصوص مطابقة للبحث الحالي.", "No texts match the current search."],

  ["مكتبة الملفات والصور", "Media Library"],
  ["ارفع الشعارات، صور الصفحة الرئيسية، صور الخدمات، وصور Open Graph. كل ملف يأخذ رابط مباشر.", "Upload logos, homepage images, service images, and Open Graph images. Each file gets a direct URL."],
  ["رفع", "Upload"],
  ["تحديث", "Refresh"],
  ["تحميل", "Load"],
  ["بحث بالاسم أو النوع...", "Search by name or type..."],
  ["نسخ الرابط", "Copy URL"],
  ["اختيار من الميديا", "Choose from media"],
  ["رفع ملفات", "Upload Files"],
  ["الصور المتاحة", "Available Images"],
  ["لا توجد صور. ارفع صورة من صفحة الميديا.", "No images available. Upload an image from the media page."],
  ["جاري تحميل الملفات...", "Loading files..."],

  ["إعدادات الموقع", "Site Settings"],
  ["تحكم بالشعار، روابط الصور، بيانات التواصل، وروابط السوشال.", "Control logo, image URLs, contact details, and social links."],
  ["البراند والصور", "Brand & Images"],
  ["الشعار", "Logo"],
  ["Alt Text للشعار", "Logo Alt Text"],
  ["صورة Open Graph", "Open Graph Image"],
  ["بيانات التواصل", "Contact Details"],
  ["العنوان العربي", "Arabic Address"],
  ["العنوان الإنجليزي", "English Address"],
  ["روابط السوشال", "Social Links"],

  ["إدارة SEO", "SEO Management"],
  ["تحكم بعناوين الصفحات والوصف والكلمات المفتاحية و Open Graph.", "Control page titles, descriptions, keywords, and Open Graph."],
  ["الدخول محفوظ تلقائيًا عبر Token", "Login is saved automatically by token"],
  ["عنوان الصفحة", "Page Title"],
  ["وصف الصفحة", "Page Description"],
  ["الكلمات المفتاحية", "Keywords"],
  ["عنوان Open Graph", "Open Graph Title"],
  ["وصف Open Graph", "Open Graph Description"],
  ["صورة Open Graph", "Open Graph Image"],

  ["إدارة Pixels", "Pixels Management"],
  ["أضف أكواد Google Analytics, Meta Pixel, TikTok Pixel أو أي كود تتبع.", "Add Google Analytics, Meta Pixel, TikTok Pixel, or any tracking code."],
  ["إضافة Pixel", "Add Pixel"],
  ["تم حفظ البكسلات.", "Pixels saved."],
  ["Pixel جديد", "New Pixel"],
  ["الاسم", "Name"],
  ["الموقع", "Location"],
  ["مفعل", "Active"],
  ["الكود", "Code"],

  ["غيّر اسم المستخدم وكلمة المرور من اللوحة بدون أوامر.", "Change username and password from the dashboard without commands."],
  ["لأمان التغيير، أدخل كلمة المرور الحالية ثم البيانات الجديدة.", "For security, enter the current password, then the new details."],
  ["اسم المستخدم الحالي", "Current Username"],
  ["كلمة المرور الحالية", "Current Password"],
  ["اسم المستخدم الجديد", "New Username"],
  ["كلمة المرور الجديدة", "New Password"],
  ["حفظ الحساب", "Save Account"],

  ["إدارة الخدمات", "Services Management"],
  ["أضف، عدّل، عطّل، واحذف الخدمات بالعربي والإنجليزي.", "Add, edit, disable, and delete services in Arabic and English."],
  ["إضافة خدمة", "Add Service"],
  ["خدمة جديدة", "New Service"],
  ["وصف الخدمة", "Service Description"],
  ["الترتيب", "Order"],
  ["رابط صورة الخدمة", "Service Image URL"],
  ["العنوان العربي", "Arabic Title"],
  ["العنوان الإنجليزي", "English Title"],
  ["الوصف العربي", "Arabic Description"],
  ["الوصف الإنجليزي", "English Description"],
  ["الخدمة فعالة", "Service Active"],

  ["إدارة البلوق", "Blog Management"],
  ["إنشاء وتعديل المقالات بالعربي والإنجليزي مع SEO وصورة رئيسية.", "Create and edit Arabic and English posts with SEO and a cover image."],
  ["مقال جديد", "New Post"],
  ["الكل", "All"],
  ["مسودة", "Draft"],
  ["منشور", "Published"],
  ["تحرير المقال", "Edit Post"],
  ["معاينة", "Preview"],
  ["تاريخ النشر", "Publish Date"],
  ["التصنيف", "Category"],
  ["الكاتب", "Author"],
  ["العنوان", "Title"],
  ["المختصر", "Excerpt"],
  ["المحتوى", "Content"],
  ["صورة المقال الرئيسية", "Post Cover Image"],
  ["صورة OG للمقال", "Post OG Image"],
  ["حفظ المقال", "Save Post"],
  ["اختر مقالًا أو أنشئ مقال جديد.", "Select a post or create a new one."],
  ["لا توجد مقالات.", "No posts."],

  ["رسائل التواصل", "Contact Messages"],
  ["صندوق CRM بسيط للرسائل القادمة من نموذج التواصل.", "Simple CRM inbox for messages submitted through the contact form."],
  ["الإجمالي", "Total"],
  ["جديدة", "New"],
  ["قيد المتابعة", "In Progress"],
  ["منتهية", "Done"],
  ["مؤرشفة", "Archived"],
  ["كل الحالات", "All Statuses"],
  ["الأولوية", "Priority"],
  ["منخفضة", "Low"],
  ["عادية", "Normal"],
  ["عالية", "High"],
  ["الجوال:", "Phone:"],
  ["الإيميل:", "Email:"],
  ["الميزانية:", "Budget:"],
  ["التاريخ:", "Date:"],
  ["الحالة", "Status"],
  ["ملاحظات داخلية", "Internal Notes"],
  ["حفظ الملاحظات", "Save Notes"],
  ["اختر رسالة لعرض التفاصيل.", "Select a message to view details."],
  ["لا توجد رسائل مطابقة.", "No matching messages."],

  ["مساعد كتابة الرسائل", "Message Writer Assistant"],
  ["أنشئ رسائل واتساب، إيميلات، SMS، ونصوص موقع بنبرة مناسبة وسجل محفوظ داخل اللوحة.", "Create WhatsApp messages, emails, SMS, and website copy with the right tone and saved history."],
  ["نسخ المسودة", "Copy Draft"],
  ["تم النسخ", "Copied"],
  ["إعداد الرسالة", "Message Setup"],
  ["اللغة", "Language"],
  ["العربية", "Arabic"],
  ["القناة", "Channel"],
  ["واتساب", "WhatsApp"],
  ["إيميل", "Email"],
  ["رسالة قصيرة", "SMS"],
  ["نص موقع", "Website Copy"],
  ["النبرة", "Tone"],
  ["احترافية", "Professional"],
  ["فاخرة", "Luxury"],
  ["ودّية", "Friendly"],
  ["بيعية", "Sales"],
  ["اعتذار ومعالجة", "Apology & Recovery"],
  ["الجمهور", "Audience"],
  ["هدف الرسالة", "Message Goal"],
  ["التفاصيل", "Details"],
  ["الدعوة للإجراء", "Call to Action"],
  ["إنشاء الرسالة", "Generate Message"],
  ["جاري الإنشاء...", "Generating..."],
  ["آخر المسودات", "Recent Drafts"],
  ["لم يتم إنشاء رسالة بعد", "No message generated yet"],
  ["ستظهر الرسالة هنا بعد إنشائها.", "The message will appear here after generation."],
  ["لا توجد مسودات محفوظة بعد.", "No saved drafts yet."],

  ["تحكم كامل بالألوان، شكل الأزرار، الكروت، عرض الصفحة، وتأثيرات الخلفية.", "Full control over colors, buttons, cards, page width, and background effects."],
  ["حفظ الثيم", "Save Theme"],
  ["قوالب جاهزة", "Presets"],
  ["فاخر فاتح", "Luxury Light"],
  ["أسود ذهبي", "Black Gold"],
  ["أزرق تقني", "Tech Blue"],
  ["الألوان", "Colors"],
  ["الشكل العام", "General Style"],
  ["اسم الثيم", "Theme Name"],
  ["الخطوط Typography", "Typography"],
  ["اختر الخط العربي والإنجليزي وخط العناوين وحجم النص العام.", "Choose Arabic, English, heading fonts, and base text size."],
  ["الخط العربي", "Arabic Font"],
  ["الخط الإنجليزي", "English Font"],
  ["خط العناوين", "Heading Font"],
  ["حجم النص الأساسي", "Base Font Size"],
  ["وزن العناوين", "Heading Weight"],
  ["تباعد الحروف", "Letter Spacing"],
  ["معاينة مباشرة تقريبية للثيم قبل الحفظ. The quick brown fox jumps over the lazy dog.", "Approximate live preview before saving. The quick brown fox jumps over the lazy dog."],
  ["زر تجريبي", "Sample Button"],

  ["إدارة الصفحة الرئيسية", "Homepage Management"],
  ["هذا هو مركز التحكم الفعلي للصفحة الرئيسية. أي تعديل هنا يحفظ في مصدر النصوص المستخدم مباشرة في /ar.", "This is the actual homepage control center. Any change here is saved directly to the content source used by /ar."],
  ["حفظ التعديلات", "Save Changes"],
  ["إعادة تحميل", "Reload"],
  ["معاينة /ar", "Preview /ar"],
  ["العنوان الرئيسي والأزرار", "Main Title & Buttons"],
  ["الشارة", "Badge"],
  ["بداية العنوان", "Title Prefix"],
  ["النص المميز", "Highlighted Text"],
  ["وصف الهيرو", "Hero Description"],
  ["زر رئيسي", "Primary Button"],
  ["رابط الزر الرئيسي", "Primary Button Link"],
  ["زر ثانوي", "Secondary Button"],
  ["رابط الزر الثانوي", "Secondary Button Link"],
  ["مؤثرات الأوربيت والبرمجة", "Orbit & Code Visuals"],
  ["عنوان كرت الكود", "Code Card Title"],
  ["نص كرت الكود", "Code Card Text"],
  ["عنوان الكرت السفلي", "Bottom Card Title"],
  ["نص الكرت السفلي", "Bottom Card Text"],
  ["عنوان صغير", "Kicker"],
  ["الوصف", "Description"],
  ["عناصر الخدمات", "Service Items"],
  ["الأتمتة والذكاء", "Automation & AI"],
  ["عناصر الأتمتة", "Automation Items"],
  ["آلية العمل", "Process"],
  ["خطوات العمل", "Process Steps"],
  ["الأعمال", "Work"],
  ["عناصر الأعمال", "Work Items"],
  ["التواصل والنداء النهائي", "Contact & Final CTA"],
  ["عنوان صندوق التقدير", "Estimator Box Title"],
  ["وصف صندوق التقدير", "Estimator Box Description"],
  ["زر صندوق التقدير", "Estimator Box Button"],
  ["رابط صندوق التقدير", "Estimator Box Link"],
  ["عنوان التواصل", "Contact Title"],
  ["وصف التواصل", "Contact Description"],
  ["إضافة عنصر", "Add Item"],
  ["الأيقونة/الرقم", "Icon / Number"],
  ["الوسم", "Tag"],
  ["تعذر تحميل بيانات الصفحة الرئيسية.", "Failed to load homepage data."],
  ["تعذر حفظ التعديلات.", "Failed to save changes."],
  ["تم حفظ التعديلات وربطها بالصفحة الرئيسية.", "Changes saved and linked to the homepage."],

  ["تم تحميل.", "Loaded."],
  ["تم التحميل.", "Loaded."],
  ["فشل التحميل.", "Loading failed."],
  ["فشل التحميل. سجّل الدخول مرة أخرى.", "Loading failed. Log in again."],
  ["جاري التحميل...", "Loading..."],
  ["جاري الحفظ...", "Saving..."],
  ["تم الحفظ.", "Saved."],
  ["فشل الحفظ.", "Saving failed."],
  ["تم الحذف.", "Deleted."],
  ["فشل الحذف.", "Delete failed."],
  ["نشط", "Active"],
  ["غير نشط", "Inactive"],
  ["فعال", "Active"],
  ["غير فعال", "Inactive"],
  ["نعم", "Yes"],
  ["لا", "No"],
  ["إلغاء", "Cancel"],
  ["تأكيد", "Confirm"],
  ["تعديل", "Edit"],
  ["إضافة", "Add"],
  ["بحث", "Search"],
  ["اختر", "Choose"],
  ["رابط", "Link"],
  ["صورة", "Image"],
  ["ملف", "File"],
  ["نوع", "Type"],
  ["تاريخ", "Date"],

  ["إدارة الرئيسية", "Homepage Management"],
  ["عدّل الهيرو، الخدمات، آلية العمل، الأعمال، والتواصل من مكان واحد.", "Edit hero, services, process, work, and contact from one place."],
  ["ارفع الشعارات والصور وملفات الواجهة واستخدم الروابط مباشرة.", "Upload logos, images, and interface files, then use their links directly."],
  ["أضف وعدّل الخدمات بالعربي والإنجليزي مع الصور والترتيب.", "Add and edit services in Arabic and English with images and ordering."],
  ["SEO و Pixels", "SEO & Pixels"],
  ["اضبط الظهور في البحث وأكواد التتبع والتحويلات.", "Control search visibility, tracking codes, and conversions."],
  ["مركز تحكم مرتب لإدارة الموقع والمحتوى والنمو", "A clean control center for managing the website, content, and growth"],
  ["هذه اللوحة تجمع أهم أدوات قياسات: الصفحة الرئيسية، الميديا، الخدمات، SEO، الرسائل، والهوية في واجهة واحدة واضحة.", "This dashboard brings together Qyasat's key tools: homepage, media, services, SEO, messages, and identity in one clear interface."],
  ["الموقع العام", "Public Website"],
  ["الواجهة العامة تعمل بلغتين مع محتوى مستقل لكل لغة.", "The public website works in two languages with independent content for each language."],
  ["إدارة المحتوى، الإعدادات، الرسائل، والخدمات من مكان واحد.", "Manage content, settings, messages, and services from one place."],
  ["الهوية", "Identity"],
  ["تنظيف بقايا MZ Code واعتماد هوية قياسات في النصوص والروابط.", "Clean MZ Code leftovers and apply the Qyasat identity across text and links."],
  ["أفضل مسار الآن", "Best Path Now"],
  ["ثبّت المحتوى واللغة قبل إضافة أي موديولات جديدة", "Stabilize content and language before adding new modules"],
  ["الأولوية الحالية هي تنظيف النصوص، ضبط النسخة الإنجليزية، وترتيب لوحة التحكم حتى تكون جاهزة للتوسع.", "The current priority is cleaning text, fixing the English version, and organizing the admin dashboard so it is ready to scale."],
  ["معاينة العربي", "Preview Arabic"],
  ["معاينة الإنجليزي", "Preview English"],
  ["خطوات التشغيل", "Operating Steps"],
  ["راجع الصفحة الرئيسية", "Review the homepage"],
  ["ارفع الصور والشعار", "Upload images and logo"],
  ["عدّل الخدمات وSEO", "Edit services and SEO"],
  ["افتح المعاينة قبل النشر", "Open preview before publishing"],
] as const;

const exact = new Map<string, string>(pairs);

function getLang() {
  if (typeof window === "undefined") return "ar";
  const url = new URL(window.location.href);
  const fromUrl = url.searchParams.get("lang");
  if (fromUrl === "ar" || fromUrl === "en") {
    localStorage.setItem(KEY, fromUrl);
    return fromUrl;
  }
  return localStorage.getItem(KEY) === "en" ? "en" : "ar";
}

function translateValue(value: string) {
  if (!value || !/[\u0600-\u06FF]/.test(value)) return value;

  const trimmed = value.trim();
  if (!trimmed) return value;

  const direct = exact.get(trimmed);
  if (direct) return value.replace(trimmed, direct);

  if (trimmed.startsWith("آخر تحديث:")) return value.replace("آخر تحديث:", "Last updated:");
  if (trimmed.startsWith("عدد الملفات:")) return value.replace("عدد الملفات:", "Files count:");
  if (trimmed.startsWith("عدد الرسائل:")) return value.replace("عدد الرسائل:", "Messages count:");

  const item = trimmed.match(/^عنصر\s+(\d+)$/);
  if (item) return value.replace(trimmed, `Item ${item[1]}`);

  const section = trimmed.match(/^قسم\s+(\d+)$/);
  if (section) return value.replace(trimmed, `Section ${section[1]}`);

  let next = value;
  for (const [ar, en] of pairs) {
    if (next.includes(ar)) next = next.split(ar).join(en);
  }

  return next;
}

function translateElementAttributes(root: ParentNode) {
  const selector = [
    "input",
    "textarea",
    "select",
    "option",
    "button",
    "[placeholder]",
    "[title]",
    "[aria-label]",
    "[data-placeholder]"
  ].join(",");

  root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    const attrs = ["placeholder", "title", "aria-label", "data-placeholder"];
    for (const attr of attrs) {
      const raw = el.getAttribute(attr);
      if (raw) {
        const next = translateValue(raw);
        if (next !== raw) el.setAttribute(attr, next);
      }
    }

    if (el instanceof HTMLInputElement) {
      const type = el.type.toLowerCase();
      if (["button", "submit", "reset"].includes(type) && el.value) {
        const next = translateValue(el.value);
        if (next !== el.value) el.value = next;
      }
    }

    if (el instanceof HTMLOptionElement && el.text) {
      const next = translateValue(el.text);
      if (next !== el.text) el.text = next;
    }
  });
}

function translateTextNodes(root: ParentNode) {
  const blocked = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"]);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const parent = node.parentElement;
    if (!parent || blocked.has(parent.tagName)) continue;
    if (!node.nodeValue || !/[\u0600-\u06FF]/.test(node.nodeValue)) continue;
    nodes.push(node);
  }

  for (const node of nodes) {
    const next = translateValue(node.nodeValue || "");
    if (next !== node.nodeValue) node.nodeValue = next;
  }
}

function applyLang() {
  const lang = getLang();
  document.documentElement.dataset.adminLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";

  const main = document.querySelector("[data-admin-root='true']");
  if (main) main.setAttribute("dir", lang === "en" ? "ltr" : "rtl");

  if (lang !== "en") return;

  translateTextNodes(document.body);
  translateElementAttributes(document.body);
  document.title = translateValue(document.title);
}

export function AdminLanguageSwitch() {
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    setLang(getLang());
    applyLang();

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(applyLang);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "title", "aria-label", "value"]
    });

    window.addEventListener("qyasat-admin-translate", applyLang);

    return () => {
      observer.disconnect();
      window.removeEventListener("qyasat-admin-translate", applyLang);
    };
  }, []);

  function change(next: "ar" | "en") {
    localStorage.setItem(KEY, next);
    setLang(next);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url.toString());

    window.location.reload();
  }

  return (
    <>
      <div className="qyasat-admin-lang-switch" aria-label="Admin language switch">
        <button type="button" onClick={() => change("ar")} className={lang === "ar" ? "active" : ""}>AR</button>
        <button type="button" onClick={() => change("en")} className={lang === "en" ? "active" : ""}>EN</button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .qyasat-admin-lang-switch {
              position: fixed;
              top: 14px;
              left: 14px;
              z-index: 99999;
              display: flex;
              gap: 6px;
              padding: 6px;
              border-radius: 999px;
              border: 1px solid rgba(15, 23, 42, 0.12);
              background: rgba(255, 255, 255, 0.92);
              box-shadow: 0 16px 40px rgba(15, 23, 42, 0.16);
              backdrop-filter: blur(14px);
            }

            /* Keep the language switch in the same place for Arabic and English. */
            html[data-admin-lang="en"] .qyasat-admin-lang-switch {
              left: 14px;
              right: auto;
            }

            .qyasat-admin-lang-switch button {
              border: 0;
              border-radius: 999px;
              padding: 7px 12px;
              font-size: 12px;
              font-weight: 900;
              cursor: pointer;
              color: rgb(71 85 105);
              background: transparent;
            }

            .qyasat-admin-lang-switch button.active {
              color: white;
              background: rgb(15 23 42);
            }

            /*
             * Arabic and English intentionally share one physical layout:
             * sidebar on the right, content on the left, and identical card order.
             * Only the language of the text changes.
             */
            html[data-admin-lang="en"] [data-admin-root="true"] {
              direction: rtl;
            }

            html[data-admin-lang="en"] [data-admin-root="true"] aside {
              right: 0 !important;
              left: auto !important;
              border-left: 1px solid rgb(226 232 240) !important;
              border-right: 0 !important;
            }

            html[data-admin-lang="en"] [data-admin-root="true"] input,
            html[data-admin-lang="en"] [data-admin-root="true"] textarea,
            html[data-admin-lang="en"] [data-admin-root="true"] select,
            html[data-admin-lang="en"] [data-admin-root="true"] option {
              direction: ltr;
              text-align: left;
            }

            html[data-admin-lang="en"] [data-admin-root="true"] [data-admin-copy="true"],
            html[data-admin-lang="en"] [data-admin-root="true"] h1,
            html[data-admin-lang="en"] [data-admin-root="true"] h2,
            html[data-admin-lang="en"] [data-admin-root="true"] h3,
            html[data-admin-lang="en"] [data-admin-root="true"] p,
            html[data-admin-lang="en"] [data-admin-root="true"] label,
            html[data-admin-lang="en"] [data-admin-root="true"] button,
            html[data-admin-lang="en"] [data-admin-root="true"] a,
            html[data-admin-lang="en"] [data-admin-root="true"] span {
              unicode-bidi: plaintext;
            }

            @media (min-width: 1024px) {
              html[data-admin-lang="en"] [data-admin-root="true"] > section {
                margin-right: 18rem !important;
                margin-left: 0 !important;
              }
            }
          `
        }}
      />
    </>
  );
}
