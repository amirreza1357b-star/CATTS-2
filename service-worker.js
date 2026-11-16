/* service-worker.js — نسخه‌ی اصلاح‌شده
   قبلاً: «اول حافظه، بعد شبکه» بود و CACHE_VERSION هیچ‌وقت عوض نمی‌شد؛ برای همین همیشه نسخه‌ی قدیمی سایت اول نشان داده می‌شد.
   حالا: «اول شبکه، بعد حافظه». فایل‌های ?v=... یک‌بار ذخیره می‌شوند (نه هر بار یک نسخه‌ی جدید)،
   و PDF/صوت/ویدیو ذخیره نمی‌شوند تا حافظه‌ی مرورگر پر نشود.
   بعد از هر آپدیت بزرگ فقط عدد VERSION را عوض کن. */
const VERSION = "2026-11-16-b";
const CACHE_VERSION = "catts-" + VERSION;
const APP_SHELL = ["./", "./index.html", "./manifest.json"];
const NO_CACHE = /\.(pdf|mp3|m4a|ogg|wav|mp4|webm|zip)(\?|$)/i;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => Promise.all(APP_SHELL.map((u) => fetch(u, { cache: "reload" }).then((r) => r.ok && cache.put(u, r)).catch(() => {}))))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const res = await fetch(req, { cache: "no-cache" });
      if (res && res.status === 200 && !NO_CACHE.test(url.pathname)) {
        const key = new Request(url.origin + url.pathname);        /* بدون ?v=timestamp */
        const cache = await caches.open(CACHE_VERSION);
        cache.put(key, res.clone());
      }
      return res;
    } catch (err) {
      const hit = (await caches.match(req, { ignoreSearch: true })) ||
                  (req.mode === "navigate" ? (await caches.match("./index.html")) || (await caches.match("./")) : null);
      if (hit) return hit;
      return new Response("آفلاین هستی و این فایل هنوز ذخیره نشده است.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }
  })());
});
