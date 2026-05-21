import { useState } from "react";
import { appConfig } from "../config/appConfig";

export function PaymentInstructions() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const handleCopyIban = async () => {
    try {
      await navigator.clipboard.writeText(appConfig.iban);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2200);
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <aside className="rounded-[2rem] border border-champagne bg-twilight p-6 text-white shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-champagne">
        Merci pour ta participation
      </p>
      <h2 className="mt-3 font-display text-4xl">Merci pour ta participation ❤️</h2>
      <p className="mt-4 leading-7 text-white/76">
        Pour envoyer ta contribution, tu peux utiliser l'un des moyens suivants :
      </p>

      <div className="mt-6 rounded-3xl bg-white/10 p-4">
        <p className="text-sm font-bold text-champagne">IBAN</p>
        <p className="mt-2 break-all font-mono text-lg">{appConfig.iban}</p>
        <button
          type="button"
          onClick={handleCopyIban}
          className="mt-4 rounded-full bg-white px-5 py-3 text-sm font-bold text-twilight transition hover:bg-champagne focus:outline-none focus:ring-4 focus:ring-white/30"
        >
          Copier l'IBAN
        </button>
        <p className="mt-3 min-h-5 text-sm font-semibold text-champagne" aria-live="polite">
          {copyStatus === "copied"
            ? "IBAN copié."
            : copyStatus === "error"
              ? "Impossible de copier automatiquement."
              : ""}
        </p>
      </div>

      <div className="mt-4 rounded-3xl bg-white/10 p-4">
        <p className="text-sm font-bold text-champagne">PayPal</p>
        <a
          href={appConfig.paypalUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex rounded-full bg-champagne px-5 py-3 text-sm font-bold text-twilight transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-white/30"
        >
          Ouvrir PayPal
        </a>
      </div>
    </aside>
  );
}
