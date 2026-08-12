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
      href="https://wa.me/5535997382399?text=Ol%25C3%25A1%252C%2520vim%2520pelo%2520Instagram%2520e%2520quero%2520saber%2520mais%2520informa%25C3%25A7%25C3%25B5es%21"
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp-trigger
    >
      <MessageCircle aria-hidden="true" size={18} />
      Reservar pelo WhatsApp
    </a>
  );
}
