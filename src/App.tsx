import { useCallback, useEffect, useMemo, useState } from "react";
import { GiftSummary } from "./components/GiftSummary";
import { Hero } from "./components/Hero";
import { ParticipantsList } from "./components/ParticipantsList";
import { ParticipationForm } from "./components/ParticipationForm";
import { PaymentInstructions } from "./components/PaymentInstructions";
import { appConfig } from "./config/appConfig";
import { addParticipation, fetchParticipations } from "./lib/participations";
import type { Participation, ParticipationInsert } from "./lib/types";

function App() {
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const loadParticipations = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchParticipations();
      setParticipations(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Impossible de charger les participations."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadParticipations();
  }, [loadParticipations]);

  const totalAmount = useMemo(
    () => participations.reduce((sum, participation) => sum + participation.amount, 0),
    [participations]
  );

  const handleParticipateClick = () => {
    document.getElementById("participer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (input: ParticipationInsert) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const created = await addParticipation(input);
      setParticipations((current) => [created, ...current]);
      setHasSubmitted(true);
    } catch (submitError) {
      setSubmitError(
        submitError instanceof Error
          ? submitError.message
          : "La participation n'a pas pu être enregistrée."
      );
      throw submitError;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-porcelain text-ink">
      <Hero onParticipateClick={handleParticipateClick} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <GiftSummary totalAmount={totalAmount} />

        <section
          id="participer"
          className="grid scroll-mt-6 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]"
          aria-label="Participation au cadeau"
        >
          <ParticipationForm
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            submitError={submitError}
          />
          {hasSubmitted ? (
            <PaymentInstructions />
          ) : (
            <aside className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rosewood">
                Après validation
              </p>
              <h2 className="mt-3 font-display text-3xl text-twilight">
                Les infos de paiement apparaîtront ici.
              </h2>
              <p className="mt-4 text-base leading-7 text-ink/72">
                Le site enregistre uniquement ton intention de participation. Aucun paiement n'est
                réalisé ici : tu recevras simplement l'IBAN et le lien PayPal à utiliser.
              </p>
            </aside>
          )}
        </section>

        <ParticipantsList
          error={error}
          isLoading={isLoading}
          onRetry={loadParticipations}
          participations={participations}
          totalAmount={totalAmount}
        />
      </div>

      <footer className="px-4 pb-8 text-center text-sm text-ink/60">
        Une surprise préparée avec soin pour les {appConfig.age} ans d'
        {appConfig.birthdayPersonName}.
      </footer>
    </main>
  );
}

export default App;
