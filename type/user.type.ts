export type UserType = {
  id: string;
  username: string;
  email: string;
  nickname: string;
  url?: string | null;
  provider?: string;
  created_at: string;
};
