import { isSupabaseConfigured, supabase } from "./supabase";
import type { Participation, ParticipationInsert, ParticipationRow } from "./types";

const mapParticipation = (row: ParticipationRow): Participation => ({
  id: row.id,
  firstName: row.first_name,
  amount: Number(row.amount),
  message: row.message ?? undefined,
  createdAt: row.created_at
});

export async function fetchParticipations(): Promise<Participation[]> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase n'est pas encore configuré.");
  }

  const { data, error } = await supabase
    .from("participations")
    .select("id, first_name, amount, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapParticipation(row as ParticipationRow));
}

export async function addParticipation(input: ParticipationInsert): Promise<Participation> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase n'est pas encore configuré.");
  }

  const { data, error } = await supabase
    .from("participations")
    .insert({
      first_name: input.firstName.trim(),
      amount: input.amount,
      message: input.message?.trim() || null
    })
    .select("id, first_name, amount, message, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapParticipation(data as ParticipationRow);
}
