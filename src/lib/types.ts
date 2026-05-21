export type Participation = {
  id: string;
  firstName: string;
  amount: number;
  message?: string;
  createdAt: string;
};

export type ParticipationInsert = {
  firstName: string;
  amount: number;
  message?: string;
};

export type ParticipationRow = {
  id: string;
  first_name: string;
  amount: number | string;
  message: string | null;
  created_at: string;
};
