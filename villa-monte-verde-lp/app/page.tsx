import Image from "next/image";
import Script from "next/script";
import {
  ArrowDown,
  House,
  Trees,
  MapPin,
  Mountain,
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
    icon: Trees,
    title: "Jardim com deck",
    text: "Um espaço ao ar livre para a cerimônia, com vista para as montanhas.",
  },
  {
    icon: House,
    title: "Restaurante La Bella Vista",
    text: "Com teto de vidro, recebe a festa ou a cerimônia em caso de chuva.",
  },
  {
    icon: Utensils,
    title: "Salão do café da manhã",
    text: "Um ambiente para o jantar, a mesa de bolo e a recepção dos convidados.",
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
          <a href="#acomodacoes">Os espaços</a>
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
            Para quem sonha celebrar
            <span> o amor em cada detalhe.</span>
          </h1>
          <p className="hero-copy">
            Celebrem seu casamento cercados pelas montanhas de Monte Verde e
            por quem faz parte da história de vocês.
          </p>
          <div className="hero-actions">
            <ChatCta label="Planejar meu casamento" source="hero" />
            <a className="text-link light hero-link" href="#acomodacoes">
              Conhecer os espaços
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
          <p className="kicker" data-reveal="up">Uma celebração para viver por inteiro</p>
          <h2 data-reveal="up">Mais que um dia. Uma história para celebrar.</h2>
          <p data-reveal="up">
            Um lugar para reunir família e amigos, compartilhar a expectativa dos preparativos e aproveitar juntos os momentos que vêm depois do “sim”.
          </p>
        </div>

        <div className="wine-feature" data-reveal="up">
          <Image
            src="/images/casamentos/cerimonia-dourada-montanhas.webp"
            alt="Casal celebrando o casamento sob um arco de flores com vista para as montanhas"
            fill
            loading="eager"
            sizes="(max-width: 700px) 100vw, 86vw"
          />
          <div className="wine-feature-content">
            <div>
              <p>Celebre na Pousada Villa Monte Verde</p>
              <h3>O cenário perfeito<br />para um dia<br />inesquecível.</h3>
              <p>
                Da cerimônia à festa, descubram espaços que dão vida ao casamento que vocês sempre sonharam.
              </p>
              <div className="wine-action">
                <ChatCta
                  label="Falar sobre meu casamento"
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
                src="/images/casamentos/casamento-beijo.webp"
                alt="Casal se beijando diante das montanhas"
                fill
                sizes="(max-width: 700px) 82vw, 240px"
              />
            </div>
            <h3>Uma história para comemorar</h3>
            <p>
              O começo de uma nova etapa, celebrado com alegria e cercado de momentos que merecem ser eternizados.
            </p>
          </article>
          <article data-reveal="up">
            <div className="care-photo">
              <Image
                src="/images/casamentos/cerimonia-romantica-montanhas.webp"
                alt="Decoração de cerimônia ao pôr do sol com vista para as montanhas"
                fill
                sizes="(max-width: 700px) 82vw, 240px"
              />
            </div>
            <h3>Uma celebração com a cara de vocês</h3>
            <p>
              Dos espaços aos detalhes, cada escolha ajuda a contar a história que trouxe vocês até aqui.
            </p>
          </article>
        </div>

      </section>

      <section className="escape-section" id="acomodacoes">
        <div className="escape-visual" data-reveal="left">
          <div className="photo photo-main">
            <Image
              src="/images/casamentos/casamento-votos-amplo.webp"
              alt="Noivos celebrando juntos durante a cerimônia"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="escape-copy">
          <h2 data-reveal="up">O momento de vocês, em um lugar especial.</h2>
          <p className="lead" data-reveal="up">
            Para os votos, o jantar e a festa, três espaços acolhem a celebração que vocês imaginaram.
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

          <p className="package-note">Buffet, jantar, bebidas, decoração e demais serviços são contratados à parte.</p>

          <div className="inline-action" data-reveal="up">
            <ChatCta
              label="Planejar meu casamento"
              source="acomodacoes"
              tone="wood"
            />
          </div>
        </div>
      </section>

      <section className="moments-section">
        <div className="moments-heading" data-reveal="up">
          <h2>Cada momento merece ser lembrado.</h2>
        </div>

        <div className="moments-grid two-wedding-videos">
          <figure className="moment moment-tall" data-reveal="up">
            <Image
              src="/images/acomodacao-banheira.jpg"
              alt=""
              fill
              sizes="(max-width: 800px) 100vw, 42vw"
            />
            <video className="wedding-video" controls muted playsInline preload="metadata" aria-label="Vídeo de casamento na Pousada Villa Monte Verde"><source src="/videos/top-video.mp4" type="video/mp4" /></video>
            <figcaption>A emoção do grande dia</figcaption>
          </figure>
          <figure className="moment moment-tall moment-celebration" data-reveal="up">
            <Image src="/images/casamentos/06116-poster.webp" alt="Noivos celebrando com convidados após a cerimônia" fill sizes="(max-width: 700px) 100vw, 30vw" />
            <video className="wedding-video" controls muted playsInline preload="metadata" poster="/images/casamentos/06116-poster.webp" aria-label="Vídeo da celebração de casamento"><source src="/videos/06116.mp4" type="video/mp4" /></video>
          </figure>
          <figure className="moment" data-reveal="up">
            <Image
              src="/images/casamentos/casamento-convidados.webp"
              alt="Cerimônia de casamento cercada por convidados"
              fill
              sizes="(max-width: 800px) 100vw, 28vw"
            />
            <figcaption>Uma celebração entre as montanhas</figcaption>
          </figure>
          <figure className="moment" data-reveal="up">
            <Image
              src="/images/casamentos/recepcao-luzes-douradas.webp"
              alt="Recepção de casamento com convidados sob luzes douradas"
              fill
              sizes="(max-width: 800px) 100vw, 28vw"
            />
            <figcaption>A alegria de celebrar juntos</figcaption>
          </figure>
        </div>

        <div className="section-action" data-reveal="up">
          <ChatCta
            label="Falar sobre meu casamento"
            source="momentos"
            tone="wood"
          />
        </div>
      </section>

      <section className="proof-section">
        <div className="proof-meta" data-reveal="up">
          <p>CASAMENTOS NA VILLA</p>
          <span>Até <strong>100 pessoas</strong> na celebração</span>
          <span>Hospedagem para até <strong>34 hóspedes</strong></span>
        </div>

        <blockquote data-reveal="up">
          “Alguns dias merecem ser vividos com calma, cercados de amor e das pessoas que tornam a nossa história especial.”
          <cite>— Pousada Villa Monte Verde</cite>
        </blockquote>
      </section>

      <section className="location-section" id="localizacao">
        <div className="location-copy">
          <h2 data-reveal="up">Um momento de vocês. Uma alegria de todos.</h2>
          <p data-reveal="up">
            A Pousada Villa Monte Verde fica a apenas 200 metros do centro de Monte Verde, perto de restaurantes, lojas e passeios para aproveitar antes ou depois da celebração.
          </p>

          <div className="location-facts" data-reveal="up">
            <span>
              <MapPin aria-hidden="true" size={20} />
              200 metros do centro
            </span>
            <span>
              <Mountain aria-hidden="true" size={20} />
              Serra da Mantiqueira · Minas Gerais
            </span>
          </div>

        </div>

        <div className="location-photo" data-reveal="right">
          <Image
            src="/images/casamentos/saida-casamento-visao-ampla.webp"
            alt="Recém-casados comemoram com convidados na saída da cerimônia"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </div>
      </section>

      <section className="final-section">
        <div>
          <h2 data-reveal="up">
            Mal podemos esperar
            <br />
            para fazer parte dessa linda história.
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
        <span>Casamentos na serra de Monte Verde.</span>
      </footer>
      <Script src="/scripts/wedding-video-scroll.js" strategy="afterInteractive" />
    </main>
  );
}
