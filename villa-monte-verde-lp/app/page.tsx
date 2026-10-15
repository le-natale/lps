import Image from "next/image";
import {
  ArrowDown,
  Bath,
  Clock3,
  Flame,
  MapPin,
  Mountain,
  Star,
  Utensils,
} from "lucide-react";
import { ChatCta, WhatsAppCta } from "./conversion-cta";

const trustItems = [
  { value: "200 m", label: "do centro de Monte Verde" },
  { value: "5.0", label: "Excelência no TripAdvisor" },
  { value: "11 anos", label: "recebendo histórias a dois" },
];

const details = [
  {
    icon: Flame,
    title: "O que aquece de verdade",
    text: "Lareira e ambientes preparados para os dias frios da serra.",
  },
  {
    icon: Bath,
    title: "Aqui, o tempo para.",
    text: "Hidro e banheiras pensadas para relaxar e aproveitar a dois.",
  },
  {
    icon: Utensils,
    title: "Sabores da montanha",
    text: "Café da manhã completo e uma experiência gastronômica no local.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Villa Monte Verde — início">
          <Image
            src="/images/villa-monte-verde-logo-dourado.png"
            alt="Pousada Villa Monte Verde"
            width={250}
            height={109}
            priority
          />
        </a>

        <nav aria-label="Navegação principal">
          <a href="#experiencia">A experiência</a>
          <a href="#acomodacoes">Acomodações</a>
          <a href="#localizacao">Localização</a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <Image
          className="hero-image"
          src="/images/hero-casamento.webp"
          alt="Noivos brindando em uma acomodação decorada para casamento"
          fill
          priority
          unoptimized
          sizes="100vw"
        />
        <div className="hero-shade" />

        <div className="hero-content">
          <p className="hero-location">
            <Mountain aria-hidden="true" size={17} />
            Monte Verde, Minas Gerais
          </p>
          <h1>
            Para quem vive o momento
            <span> em cada detalhe.</span>
          </h1>
          <p className="hero-copy">
            Chalés com lareira e hidro, sabores da montanha e um cuidado que
            começa antes de vocês chegarem.
          </p>
          <div className="hero-actions">
            <ChatCta label="Quero essa experiência" source="hero" />
            <a className="text-link light hero-link" href="#experiencia">
              Conhecer a Villa
              <ArrowDown aria-hidden="true" size={17} />
            </a>
          </div>
        </div>

        <p className="hero-note">
          A poucos passos do centro.
          <br />
          Perto de tudo, longe da pressa.
        </p>
      </section>

      <section className="trust-strip" aria-label="Destaques da pousada">
        {trustItems.map((item) => (
          <div key={item.value}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="care-section" id="experiencia">
        <div className="section-heading">
          <p className="kicker" data-reveal="up">Antes mesmo do check-in</p>
          <h2 data-reveal="up">O cuidado começa em cada gesto.</h2>
          <p data-reveal="up">
            A experiência não começa na porta do chalé. Ela começa na conversa,
            nos detalhes e no jeito como tudo é preparado para receber vocês.
          </p>
        </div>

        <div className="wine-feature" data-reveal="up">
          <Image
            src="/images/restaurant-wide/restaurante-wide-salao-coracao.jpg"
            alt="Salão principal amplo iluminado por luzes quentes e preparado para um jantar romântico"
            fill
            loading="eager"
            sizes="(max-width: 700px) 100vw, 86vw"
          />
          <div className="wine-feature-content">
            <div>
              <p>O cuidado aparece em cada detalhe</p>
              <h3>O cenário perfeito para uma noite inesquecível.</h3>
              <p>
                A iluminação, o clima da serra e o cuidado em cada detalhe
                transformam o jantar em uma experiência única.
              </p>
              <div className="wine-action">
                <ChatCta
                  label="Quero conhecer mais"
                  source="experiencia"
                  tone="gold"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="care-grid">
          <article data-reveal="up">
            <div className="care-photo">
              <Image
                src="/images/restaurant-wide/restaurante-wide-brinde-lareira.jpg"
                alt="Casal brindando com taças de vinho diante da lareira"
                fill
                sizes="(max-width: 700px) 82vw, 240px"
              />
            </div>
            <h3>Um brinde a vocês</h3>
            <p>
              Taças erguidas, lareira acesa e nenhuma pressa para a noite
              terminar.
            </p>
          </article>
          <article data-reveal="up">
            <div className="care-photo">
              <Image
                src="/images/restaurant-wide/restaurante-wide-carne-risoto-molho-v3.jpg"
                alt="Carne fatiada com risoto cremoso recebendo molho servido à mesa"
                fill
                sizes="(max-width: 700px) 82vw, 240px"
              />
            </div>
            <h3>Sabores com um toque de excelência</h3>
            <p>
              Cada prato é preparado com cuidado e muito amor para tornar o
              jantar ainda mais especial.
            </p>
          </article>
        </div>

      </section>

      <section className="escape-section" id="acomodacoes">
        <div className="escape-visual" data-reveal="left">
          <div className="photo photo-main">
            <Image
              src="/images/banheira-cafe-vista.jpg"
              alt="Banheira com pétalas, café da manhã e vista para a natureza"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="escape-copy">
          <h2 data-reveal="up">Um mundo feito para vocês dois.</h2>
          <p className="lead" data-reveal="up">
            Na Villa Monte Verde, o frio fica do lado de fora. Por dentro, a
            madeira, o fogo, a água quente e o silêncio tomam conta.
          </p>

          <div className="detail-list">
            {details.map(({ icon: Icon, title, text }) => (
              <article key={title} data-reveal="up">
                <Icon aria-hidden="true" size={23} strokeWidth={1.6} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="inline-action" data-reveal="up">
            <ChatCta
              label="Quero essa experiência"
              source="acomodacoes"
              tone="wood"
            />
          </div>
        </div>
      </section>

      <section className="moments-section">
        <div className="moments-heading" data-reveal="up">
          <h2>O tempo muda de ritmo por aqui.</h2>
        </div>

        <div className="moments-grid">
          <figure className="moment moment-tall" data-reveal="up">
            <Image
              src="/images/acomodacao-banheira.jpg"
              alt="Acomodação com banheira de imersão e vista panorâmica"
              fill
              sizes="(max-width: 800px) 100vw, 42vw"
            />
            <figcaption>Privacidade para desacelerar</figcaption>
          </figure>
          <figure className="moment" data-reveal="up">
            <Image
              src="/images/cafe-colonial.jpg"
              alt="Mesa de café da manhã com frutas, pães e acompanhamentos"
              fill
              sizes="(max-width: 800px) 100vw, 28vw"
            />
            <figcaption>Manhãs sem despertador</figcaption>
          </figure>
          <figure className="moment" data-reveal="up">
            <Image
              src="/images/bistro-vista.jpg"
              alt="Bistrô da pousada com vista para as montanhas"
              fill
              sizes="(max-width: 800px) 100vw, 28vw"
            />
            <figcaption>Sabores com vista para a serra</figcaption>
          </figure>
        </div>

        <div className="section-action" data-reveal="up">
          <ChatCta
            label="Quero conhecer mais"
            source="momentos"
            tone="wood"
          />
        </div>
      </section>

      <section className="proof-section">
        <div className="proof-meta" data-reveal="up">
          <div className="stars" aria-label="Cinco estrelas">
            {[0, 1, 2, 3, 4].map((star) => (
              <Star key={star} aria-hidden="true" fill="currentColor" size={18} />
            ))}
          </div>
          <p>Excelência TripAdvisor</p>
          <span>11 anos cuidando de casais em Monte Verde</span>
        </div>

        <blockquote data-reveal="up">
          “Uma paz absurda, café da manhã excelente e atendimento impecável.
          É o refúgio perfeito para esquecer o mundo a dois.”
          <cite>— Hóspede da Villa Monte Verde</cite>
        </blockquote>
      </section>

      <section className="location-section" id="localizacao">
        <div className="location-copy">
          <h2 data-reveal="up">No meio da natureza. A cinco minutos do centro.</h2>
          <p data-reveal="up">
            São apenas 200 metros até o centro de Monte Verde. Vocês podem
            aproveitar restaurantes, passeios e o vilarejo a pé — e voltar para
            o sossego quando quiserem.
          </p>

          <div className="location-facts" data-reveal="up">
            <span>
              <MapPin aria-hidden="true" size={20} />
              200 metros do centro
            </span>
            <span>
              <Clock3 aria-hidden="true" size={20} />
              Aproximadamente 5 minutos a pé
            </span>
          </div>

        </div>

        <div className="location-photo" data-reveal="right">
          <Image
            src="/images/deck-montanhas.jpg"
            alt="Deck da Villa Monte Verde cercado por árvores e vista para as montanhas"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </div>
      </section>

      <section className="final-section">
        <div>
          <h2 data-reveal="up">
            Apenas decidam vir.
            <br />
            O resto, a Villa prepara.
          </h2>
        </div>
        <div data-reveal="up">
          <WhatsAppCta />
        </div>
      </section>

      <footer>
        <Image
          src="/images/villa-monte-verde-logo-dourado.png"
          alt="Pousada Villa Monte Verde"
          width={230}
          height={100}
        />
        <p>Monte Verde · Minas Gerais</p>
        <span>Um refúgio pensado para dois.</span>
      </footer>
    </main>
  );
}
