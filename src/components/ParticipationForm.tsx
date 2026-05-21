import { FormEvent, useState } from "react";
import { appConfig } from "../config/appConfig";
import type { ParticipationInsert } from "../lib/types";

type ParticipationFormProps = {
  isSubmitting: boolean;
  onSubmit: (input: ParticipationInsert) => Promise<void>;
  submitError: string | null;
};

type FormErrors = {
  firstName?: string;
  amount?: string;
  message?: string;
};

export function ParticipationForm({ isSubmitting, onSubmit, submitError }: ParticipationFormProps) {
  const [firstName, setFirstName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validate = (): { isValid: boolean; parsedAmount: number } => {
    const nextErrors: FormErrors = {};
    const trimmedFirstName = firstName.trim();
    const trimmedMessage = message.trim();
    const parsedAmount = Number(amount.replace(",", "."));

    if (!trimmedFirstName) {
      nextErrors.firstName = "Le prénom est obligatoire.";
    } else if (trimmedFirstName.length > 50) {
      nextErrors.firstName = "Le prénom doit faire 50 caractères maximum.";
    }

    if (!amount.trim()) {
      nextErrors.amount = "Le montant est obligatoire.";
    } else if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      nextErrors.amount = "Le montant doit être positif.";
    } else if (parsedAmount > appConfig.maxAmount) {
      nextErrors.amount = `Le montant maximum est de ${appConfig.maxAmount} €.`;
    }

    if (trimmedMessage.length > 300) {
      nextErrors.message = "Le message doit faire 300 caractères maximum.";
    }

    setErrors(nextErrors);
    return { isValid: Object.keys(nextErrors).length === 0, parsedAmount };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);

    const { isValid, parsedAmount } = validate();
    if (!isValid) return;

    await onSubmit({
      firstName: firstName.trim(),
      amount: parsedAmount,
      message: message.trim() || undefined
    });

    setFirstName("");
    setAmount("");
    setMessage("");
    setSuccessMessage("Participation enregistrée. Les infos de paiement sont affichées à droite.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] bg-white p-5 shadow-soft sm:p-7"
      noValidate
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rosewood">
        Participer
      </p>
      <h2 className="mt-3 font-display text-4xl text-twilight">Je participe au cadeau</h2>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="firstName" className="text-sm font-bold text-ink">
            Prénom
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            maxLength={50}
            onChange={(event) => setFirstName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-ink/12 bg-porcelain px-4 py-3 text-base outline-none transition focus:border-rosewood focus:ring-4 focus:ring-rosewood/15"
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            autoComplete="given-name"
          />
          {errors.firstName ? (
            <p id="firstName-error" className="mt-2 text-sm font-semibold text-rosewood">
              {errors.firstName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="amount" className="text-sm font-bold text-ink">
            Montant de participation
          </label>
          <div className="mt-2 flex rounded-2xl border border-ink/12 bg-porcelain focus-within:border-rosewood focus-within:ring-4 focus-within:ring-rosewood/15">
            <input
              id="amount"
              name="amount"
              type="number"
              inputMode="decimal"
              min="1"
              max={appConfig.maxAmount}
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="w-full rounded-2xl bg-transparent px-4 py-3 text-base outline-none"
              aria-invalid={Boolean(errors.amount)}
              aria-describedby={errors.amount ? "amount-error" : undefined}
            />
            <span className="flex items-center px-4 font-bold text-ink/60">€</span>
          </div>
          {errors.amount ? (
            <p id="amount-error" className="mt-2 text-sm font-semibold text-rosewood">
              {errors.amount}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-bold text-ink">
            Petit message optionnel
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            maxLength={300}
            rows={4}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-2 w-full resize-none rounded-2xl border border-ink/12 bg-porcelain px-4 py-3 text-base outline-none transition focus:border-rosewood focus:ring-4 focus:ring-rosewood/15"
            aria-invalid={Boolean(errors.message)}
            aria-describedby="message-help"
          />
          <div id="message-help" className="mt-2 flex justify-between gap-3 text-sm text-ink/58">
            <span>{errors.message ?? "Tu peux laisser un mot doux pour Isabelle."}</span>
            <span>{message.length}/300</span>
          </div>
        </div>
      </div>

      {submitError ? (
        <p className="mt-5 rounded-2xl bg-rosewood/10 p-4 text-sm font-semibold text-rosewood">
          {submitError}
        </p>
      ) : null}
      {successMessage ? (
        <p className="mt-5 rounded-2xl bg-spruce/10 p-4 text-sm font-semibold text-spruce">
          {successMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-full bg-rosewood px-6 py-4 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-twilight focus:outline-none focus:ring-4 focus:ring-rosewood/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Enregistrement..." : "Valider ma participation"}
      </button>
    </form>
  );
}
