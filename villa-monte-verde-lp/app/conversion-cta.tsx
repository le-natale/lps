"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";

type ChatCtaProps = {
  label: string;
  source: string;
  tone?: "gold" | "wood";
};

export function ChatCta({
  label,
  source,
  tone = "gold",
}: ChatCtaProps) {
  return (
    <button
      className={`cta-button cta-button--${tone}`}
      type="button"
      data-chat-trigger
      data-chat-source={source}
    >
      {label}
      <ArrowUpRight aria-hidden="true" size={17} />
    </button>
  );
}

export function WhatsAppCta() {
  return (
    <a
      className="cta-button cta-button--whatsapp"
      href="https://wa.me/5535997382399?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20casamentos%20na%20Pousada%20Villa%20Monte%20Verde."
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp-trigger
    >
      <MessageCircle aria-hidden="true" size={18} />
      Conversar pelo WhatsApp
    </a>
  );
}
