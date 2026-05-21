import { appConfig } from "../config/appConfig";

type HeroProps = {
  onParticipateClick: () => void;
};

export function Hero({ onParticipateClick }: HeroProps) {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(248,221,227,0.95),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(248,232,199,0.95),transparent_30%),linear-gradient(135deg,#fff9f2_0%,#fde9df_45%,#f6d2d8_100%)]" />
      <div className="sparkle-field" aria-hidden="true" />

      <div className="mx-auto grid min-h-[calc(92svh-3rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="pt-10 sm:pt-14 lg:pt-0">
          <p className="inline-flex rounded-full border border-white/80 bg-white/60 px-4 py-2 text-sm font-semibold text-rosewood shadow-sm backdrop-blur">
            Cagnotte anniversaire - {appConfig.age} ans
          </p>
          <h1 className="mt-7 max-w-3xl font-display text-5xl leading-[0.96] text-twilight sm:text-6xl lg:text-7xl">
            Un séjour magique pour les 40 ans d'Isabelle
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/78 sm:text-xl">
            On lui prépare une belle surprise : 2 jours et 1 nuit à Disneyland Paris.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onParticipateClick}
              className="rounded-full bg-twilight px-7 py-4 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-ink focus:outline-none focus:ring-4 focus:ring-rosewood/30"
            >
              Participer au cadeau
            </button>
            <span className="text-sm font-medium text-ink/65">
              Montant libre, paiement envoyé séparément.
            </span>
          </div>
        </div>

        <div className="relative mx-auto flex aspect-[4/5] w-full max-w-[420px] items-center justify-center sm:aspect-square lg:max-w-[520px]">
          <div className="absolute inset-5 rounded-[3rem] border border-white/65 bg-white/35 shadow-soft backdrop-blur-sm" />
          <div className="ticket-card animate-float">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-rosewood">
                  Invitation
                </p>
                <h2 className="mt-2 font-display text-3xl text-twilight">Voyage surprise</h2>
              </div>
              <div className="rounded-full bg-champagne px-3 py-2 text-sm font-bold text-twilight">
                2J/1N
              </div>
            </div>
            <div className="castle-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-porcelain/80 p-4">
                <p className="font-semibold text-ink/55">Destination</p>
                <p className="mt-1 font-bold text-twilight">Disneyland Paris</p>
              </div>
              <div className="rounded-2xl bg-porcelain/80 p-4">
                <p className="font-semibold text-ink/55">Pour</p>
                <p className="mt-1 font-bold text-twilight">Isabelle</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 right-2 hidden rounded-[1.5rem] bg-spruce px-5 py-4 text-sm font-bold text-white shadow-soft sm:block">
            Valise prête
          </div>
        </div>
      </div>
    </section>
  );
}
