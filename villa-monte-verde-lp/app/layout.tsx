import type { Metadata } from "next";
import { Manrope, Marcellus } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const clarityScript = `
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "xxakuvahbt");
`;

const chatBridgeScript = `
(() => {
  const widgetHostId = "fluxia-chat-widget-feb12c61644a11f1a7d136bbe7cca700";
  const tenantLabel = "Pousada Villa Monte Verde";
  let retryTimer = 0;

  const syncTenantLabel = () => {
    const host = document.getElementById(widgetHostId);
    const root = host?.shadowRoot;
    const title = root?.querySelector(".toolbar-title");
    if (title) title.textContent = tenantLabel;

    if (root && !root.querySelector("#villa-mobile-chat-layout")) {
      const style = document.createElement("style");
      style.id = "villa-mobile-chat-layout";
      style.textContent =
        "@media (max-width: 700px) {" +
        ".launcher { display: none !important; }" +
        ".panel { inset: 0 !important; width: 100vw !important; max-width: 100vw !important; height: 100dvh !important; }" +
        "}";
      root.appendChild(style);
    }

    return Boolean(root);
  };

  window.addEventListener("message", (event) => {
    if (event.data?.type !== "fluxia-chat-ready") return;
    setTimeout(syncTenantLabel, 0);
  });

  const syncTimer = window.setInterval(() => {
    if (syncTenantLabel()) window.clearInterval(syncTimer);
  }, 100);

  const openChat = () => {
    const host = document.getElementById(widgetHostId);
    const launcher = host?.shadowRoot?.querySelector(".avatar");

    if (!launcher) return false;
    launcher.click();
    return true;
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element) || !target.closest("[data-chat-trigger]")) {
      return;
    }

    clearInterval(retryTimer);
    if (openChat()) return;

    let attempts = 0;
    retryTimer = window.setInterval(() => {
      attempts += 1;
      if (openChat() || attempts >= 80) clearInterval(retryTimer);
    }, 100);
  });
})();
`;

const revealScript = `
(() => {
  if (window.__villaRevealInitialized) return;
  window.__villaRevealInitialized = true;

  const root = document.documentElement;
  const elements = [...document.querySelectorAll("[data-reveal]")];

  if (!elements.length || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  root.classList.add("reveal-ready");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

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
`;

export const metadata: Metadata = {
  title: "Pousada Villa Monte Verde | Um refúgio para dois",
  description:
    "Chalés românticos com lareira e hidro, a poucos minutos do centro de Monte Verde.",
};

const widgetLogoUrl =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:3000/lp/pousada-villa-monte-verde/logo-villa-monte-verde-dourado.png"
    : "https://lps.pousadavillamonteverde.com.br/logo-villa-monte-verde-dourado.png";

const widgetAgentAvatarUrl =
  "https://images3.motor-reserva.com.br/curl/storage/2910/202206021654181502logo.png";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${marcellus.variable}`}>
        {children}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: clarityScript }}
        />
        <button
          className="mobile-chat-launcher"
          type="button"
          data-chat-trigger
          aria-label="Abrir atendimento da Pousada Villa Monte Verde"
        >
          <img
            src="/lp/pousada-villa-monte-verde/logo-villa-monte-verde-dourado.png"
            alt=""
          />
          <span aria-hidden="true">1</span>
        </button>
        <script
          async
          src="https://app.fluxianexus.com.br/chat-widget.js"
          data-slug="feb12c61644a11f1a7d136bbe7cca700"
          data-agent="reservas"
          data-theme="light"
          data-color="#a85b00"
          data-background-color="#f3eee7"
          data-assistant-color="#ece4da"
          data-user-color="#e59a08"
          data-text-color="#271f18"
          data-logo-url={widgetLogoUrl}
          data-agent-icon="logo"
          data-agent-avatar-url={widgetAgentAvatarUrl}
          data-avatar={widgetLogoUrl}
          data-greeting="Olá! Eu sou a FluxIA da Pousada Villa Monte Verde. Como posso ajudar com sua hospedagem?"
          data-title="Viva essa experiência"
          data-subtitle="Tire dúvidas e planeje sua estadia"
          data-cta="Conversar agora"
        />
        <script dangerouslySetInnerHTML={{ __html: chatBridgeScript }} />
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </body>
    </html>
  );
}
