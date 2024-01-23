(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) c(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const s of t.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && c(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (t.credentials = "omit")
        : (t.credentials = "same-origin"),
      t
    );
  }
  function c(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = n(e);
    fetch(e.href, t);
  }
})();
const a = async (r, o = {}) => {
    try {
      const n = await fetch(r, o);
      if (!n.ok) throw new Error(`Error fetching data at ${r}`);
      return await n.json();
    } catch (n) {
      return console.warn(n), null;
    }
  },
  i = async () => {
    const { data: r } = await a("https://ponyapi.net/v1/character/all");
    return r;
  },
  l = async (r) => await a(`https://ponyapi.net/v1/character/${r}`),
  f = async () => {
    const r = await i();
    console.log(r),
      r.forEach(async (o) => {
        const { data: n } = await l(o.id);
        console.log(o.id, n[0]);
      });
  };
f();
