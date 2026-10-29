import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "http://127.0.0.1:3000";
const outputDirectory = path.join(process.cwd(), "entrega");
const outputFile = path.join(
  outputDirectory,
  "Pousada Villa Monte Verde - Preview Atualizado.html",
);

const mimeByExtension = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function fetchBuffer(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Não foi possível carregar ${url}: ${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function toDataUri(assetUrl) {
  const absoluteUrl = new URL(String(assetUrl).replaceAll("&amp;", "&"), origin);
  const buffer = await fetchBuffer(absoluteUrl);
  const extension = path.extname(absoluteUrl.pathname).toLowerCase();
  const mime =
    mimeByExtension[extension] ||
    (await fetch(absoluteUrl)).headers.get("content-type") ||
    "application/octet-stream";

  return `data:${mime};base64,${buffer.toString("base64")}`;
}

async function inlineCssAssets(css, stylesheetUrl) {
  const assetMatches = [
    ...css.matchAll(/url\((["']?)([^)"']+)\1\)/g),
  ];
  const replacements = new Map();

  for (const match of assetMatches) {
    const assetPath = match[2];
    if (
      assetPath.startsWith("data:") ||
      assetPath.startsWith("#") ||
      replacements.has(assetPath)
    ) {
      continue;
    }

    const absoluteAssetUrl = new URL(assetPath, stylesheetUrl);
    replacements.set(assetPath, await toDataUri(absoluteAssetUrl));
  }

  for (const [assetPath, dataUri] of replacements) {
    css = css.replaceAll(assetPath, dataUri);
  }

  return css;
}

let html = (await fetchBuffer(origin)).toString("utf8");

const stylesheetMatches = [
  ...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g),
];

for (const match of stylesheetMatches) {
  const stylesheetUrl = new URL(match[1], origin);
  let css = (await fetchBuffer(stylesheetUrl)).toString("utf8");
  css = await inlineCssAssets(css, stylesheetUrl);
  html = html.replace(match[0], `<style>${css}</style>`);
}

const imageTags = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);

for (const originalTag of imageTags) {
  const srcMatch = originalTag.match(/\ssrc="([^"]+)"/);
  if (!srcMatch) continue;

  const sourceUrl = srcMatch[1].replaceAll("&amp;", "&");
  const dataUri = await toDataUri(sourceUrl);
  const portableTag = originalTag
    .replace(/\s+srcSet="[^"]*"/g, "")
    .replace(/\s+sizes="[^"]*"/g, "")
    .replace(/\s+loading="lazy"/g, "")
    .replace(srcMatch[0], ` src="${dataUri}"`);

  html = html.replace(originalTag, portableTag);
}

html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
  .replace(/<link[^>]+rel="preload"[^>]*>/g, "")
  .replace(/<link[^>]+rel="modulepreload"[^>]*>/g, "")
  .replace(
    "<head>",
    `<head>
<!--
  Prévia portátil da Pousada Villa Monte Verde.
  Este arquivo contém os estilos, fontes e imagens necessários para abrir offline.
-->`,
  );

const portableRevealScript = `<script>
(() => {
  const root = document.documentElement;
  const elements = [...document.querySelectorAll("[data-reveal]")];
  if (!elements.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.classList.add("reveal-ready");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  elements.forEach((element) => observer.observe(element));
  let frame = 0;
  const revealVisible = () => {
    frame = 0;
    elements.forEach((element) => {
      if (element.classList.contains("is-visible")) return;
      const bounds = element.getBoundingClientRect();
      if (bounds.top < innerHeight * 0.92 && bounds.bottom > 0) {
        element.classList.add("is-visible");
        observer.unobserve(element);
      }
    });
  };
  const scheduleCheck = () => {
    if (frame) return;
    frame = requestAnimationFrame(revealVisible);
  };
  addEventListener("scroll", scheduleCheck, { passive: true });
  addEventListener("resize", scheduleCheck);
  scheduleCheck();
})();
</script>`;

const portableClarityScript = `<script type="text/javascript">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "y1b625a3mx");
</script>`;

const portableChatBridge = `<script>
(() => {
  const widgetSlug = "feb12c61644a11f1a7d136bbe7cca700";
  const widgetHostId = "fluxia-chat-widget-" + widgetSlug;
  const tenantLabel = "Pousada Villa Monte Verde";
  let retryTimer = 0;

  const syncTenantLabel = () => {
    const host = document.getElementById(widgetHostId);
    const root = host ? host.shadowRoot : null;
    const title = root
      ? root.querySelector(".toolbar-title")
      : null;
    if (title) title.textContent = tenantLabel;

    if (root && !root.querySelector("#villa-mobile-chat-layout")) {
      const style = document.createElement("style");
      style.id = "villa-mobile-chat-layout";
      style.textContent =
        ".avatar { border-color: #38282a !important; }" +
        "@media (max-width: 700px) {" +
        ".launcher { display: none !important; }" +
        ".panel { inset: 0 !important; width: 100vw !important; max-width: 100vw !important; height: 100dvh !important; }" +
        "}";
      root.appendChild(style);
    }

    return Boolean(root);
  };

  window.addEventListener("message", (event) => {
    if (!event.data || event.data.type !== "fluxia-chat-ready") return;
    setTimeout(syncTenantLabel, 0);
  });

  const syncTimer = setInterval(() => {
    if (syncTenantLabel()) clearInterval(syncTimer);
  }, 100);

  const openChat = () => {
    const host = document.getElementById(widgetHostId);
    const launcher = host && host.shadowRoot
      ? host.shadowRoot.querySelector(".avatar")
      : null;

    if (!launcher) return false;
    launcher.click();
    return true;
  };

  document.querySelectorAll("[data-chat-trigger]").forEach((button) => {
    button.addEventListener("click", () => {
      clearInterval(retryTimer);
      if (openChat()) return;

      let attempts = 0;
      retryTimer = setInterval(() => {
        attempts += 1;
        if (openChat() || attempts >= 80) clearInterval(retryTimer);
      }, 100);
    });
  });
})();
</script>
<script async
  src="https://app.fluxianexus.com.br/chat-widget.js"
  data-slug="feb12c61644a11f1a7d136bbe7cca700"
  data-agent="reservas"
  data-theme="light"
  data-color="#38282a"
  data-background-color="#f3eee7"
  data-assistant-color="#ece4da"
  data-user-color="#f2cf8b"
  data-text-color="#271f18"
  data-logo-url="https://lps.pousadavillamonteverde.com.br/logo-villa-monte-verde-dourado.png"
  data-agent-icon="logo"
  data-agent-avatar-url="https://images3.motor-reserva.com.br/curl/storage/2910/202206021654181502logo.png"
  data-avatar="https://lps.pousadavillamonteverde.com.br/logo-villa-monte-verde-dourado.png"
  data-greeting="Olá! Eu sou a FluxIA da Pousada Villa Monte Verde. Como posso ajudar com seu casamento?"
  data-title="Seu casamento na Villa"
  data-subtitle="Tire dúvidas sobre seu casamento"
  data-cta="Falar sobre casamento"></script>`;

const portableVideoScript = `<script id="wedding-video-playback">${await readFile(path.join(process.cwd(), "public/scripts/wedding-video-scroll.js"), "utf8")}</script>`;

html = html.replace(
  "</body>",
  `${portableClarityScript}${portableRevealScript}${portableChatBridge}${portableVideoScript}</body>`,
);

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, html, "utf8");

console.log(outputFile);
console.log(`${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB`);
