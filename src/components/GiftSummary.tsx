import { appConfig } from "../config/appConfig";

type GiftSummaryProps = {
  totalAmount: number;
};

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

export function GiftSummary({ totalAmount }: GiftSummaryProps) {
  const progress =
    appConfig.targetAmount && appConfig.targetAmount > 0
      ? Math.min((totalAmount / appConfig.targetAmount) * 100, 100)
      : null;

  return (
    <section className="grid gap-4 md:grid-cols-3" aria-label="Résumé du cadeau">
      <article className="rounded-[2rem] bg-white p-6 shadow-soft md:col-span-2">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rosewood">
          Le cadeau
        </p>
        <h2 className="mt-3 font-display text-4xl text-twilight">{appConfig.giftTitle}</h2>
        <p className="mt-4 text-lg leading-8 text-ink/72">
          Destination : <strong>Disneyland Paris</strong>. Durée :{" "}
          <strong>{appConfig.giftDescription}</strong>. L'objectif est d'offrir à Isabelle un
          moment de détente, de surprise et de magie, avec une parenthèse qui marque ses 40 ans.
        </p>
        <p className="mt-4 rounded-2xl bg-blush/55 p-4 text-base font-semibold text-rosewood">
          Chacun participe librement au montant qu'il souhaite.
        </p>
      </article>

      <article className="rounded-[2rem] bg-twilight p-6 text-white shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">
          Déjà annoncé
        </p>
        <p className="mt-4 font-display text-5xl">{currencyFormatter.format(totalAmount)}</p>
        <p className="mt-3 text-sm leading-6 text-white/72">Total des intentions de participation.</p>
        {progress !== null && appConfig.targetAmount !== null ? (
          <div className="mt-6">
            <div className="flex justify-between text-sm font-semibold">
              <span>Progression</span>
              <span>{currencyFormatter.format(appConfig.targetAmount)}</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/18">
              <div
                className="h-full rounded-full bg-champagne transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : null}
      </article>
    </section>
  );
}
