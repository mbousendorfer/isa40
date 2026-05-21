import { appConfig } from "../config/appConfig";
import type { Participation } from "../lib/types";

type ParticipantsListProps = {
  error: string | null;
  isLoading: boolean;
  onRetry: () => void;
  participations: Participation[];
  totalAmount: number;
};

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR"
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric"
});

export function ParticipantsList({
  error,
  isLoading,
  onRetry,
  participations,
  totalAmount
}: ParticipantsListProps) {
  return (
    <section className="rounded-[2rem] bg-white p-5 shadow-soft sm:p-7" aria-live="polite">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rosewood">
            Ils participent déjà
          </p>
          <h2 className="mt-3 font-display text-4xl text-twilight">Ils participent déjà</h2>
        </div>
        {appConfig.showAmountsPublicly ? (
          <p className="rounded-full bg-champagne px-4 py-2 text-sm font-bold text-twilight">
            Total : {currencyFormatter.format(totalAmount)}
          </p>
        ) : null}
      </div>

      {isLoading ? (
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-32 animate-pulse rounded-3xl bg-porcelain" />
          ))}
        </div>
      ) : null}

      {error && !isLoading ? (
        <div className="mt-7 rounded-3xl bg-rosewood/10 p-5">
          <p className="font-semibold text-rosewood">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-full bg-rosewood px-5 py-3 text-sm font-bold text-white transition hover:bg-twilight focus:outline-none focus:ring-4 focus:ring-rosewood/25"
          >
            Réessayer
          </button>
        </div>
      ) : null}

      {!isLoading && !error && participations.length === 0 ? (
        <p className="mt-7 rounded-3xl bg-porcelain p-5 text-ink/70">
          Aucune participation pour le moment. La première personne à participer aura une place de
          choix ici.
        </p>
      ) : null}

      {!isLoading && !error && participations.length > 0 ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {participations.map((participation) => (
            <article key={participation.id} className="rounded-3xl bg-porcelain p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-twilight">{participation.firstName}</h3>
                  <p className="mt-1 text-sm text-ink/55">
                    {dateFormatter.format(new Date(participation.createdAt))}
                  </p>
                </div>
                {appConfig.showAmountsPublicly ? (
                  <p className="rounded-full bg-white px-3 py-1 text-sm font-bold text-rosewood">
                    {currencyFormatter.format(participation.amount)}
                  </p>
                ) : null}
              </div>
              {participation.message ? (
                <p className="mt-4 leading-7 text-ink/72">{participation.message}</p>
              ) : (
                <p className="mt-4 text-sm italic text-ink/45">Participation sans message.</p>
              )}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
