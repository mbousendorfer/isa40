# Cagnotte anniversaire Isabelle

Web app one-page pour récolter les intentions de participation au cadeau des 40 ans d'Isabelle : un séjour de 2 jours et 1 nuit à Disneyland Paris.

## Installation

```bash
npm install
npm run dev
```

Build de production :

```bash
npm run build
```

## Configuration Supabase

Créez une table `participations` dans Supabase :

```sql
create table participations (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  amount numeric not null check (amount > 0),
  message text,
  created_at timestamptz not null default now()
);

alter table participations enable row level security;

create policy "Anyone can read participations"
on participations
for select
to anon
using (true);

create policy "Anyone can insert participations"
on participations
for insert
to anon
with check (
  first_name is not null
  and amount > 0
);
```

Copiez `.env.example` en `.env.local`, puis renseignez uniquement la clé anon publique :

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxx
```

Ne mettez jamais la `service_role_key` dans cette application.

## Modifier l'IBAN et PayPal

Les valeurs éditables se trouvent dans `src/config/appConfig.ts` :

```ts
export const appConfig = {
  paymentRecipientName: "M. BOUSENDORFER MATTHIEU",
  bankName: "BoursoBank",
  iban: "FR76 XXXX XXXX XXXX XXXX XXXX XXX",
  bic: "BOUS FRPP XXX",
  paypalUrl: "https://paypal.me/REMPLACER"
};
```

Le même fichier permet aussi de modifier le montant maximum, l'affichage public des montants et un éventuel objectif financier.

## Déploiement GitHub Pages

Le projet contient un workflow GitHub Actions dans `.github/workflows/deploy.yml`.

À configurer dans le dépôt GitHub :

1. Dans `Settings > Secrets and variables > Actions`, ajoutez les secrets `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
2. Dans `Settings > Pages`, choisissez `GitHub Actions` comme source de déploiement.
3. Poussez sur la branche `main`.

Le workflow injecte automatiquement le bon chemin de base Vite pour une URL GitHub Pages de type `https://OWNER.github.io/NOM_DU_REPO/`.

## Autres hébergeurs

L'application peut être déployée sur Vercel, Netlify, Cloudflare Pages ou tout hébergeur statique compatible Vite.

1. Ajoutez `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans les variables d'environnement de l'hébergeur.
2. Utilisez `npm run build` comme commande de build.
3. Publiez le dossier `dist`.

## Notes de sécurité

Le site n'intègre aucun paiement en ligne. Il stocke uniquement les intentions de participation dans Supabase et affiche ensuite les instructions de paiement séparées.
