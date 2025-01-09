export interface User {
  id: string;
  created_at: Date | null;
  updated_at: Date | null;
  fullname: string;
  email: string;
  phone: string;
  password: string;
  address: string;
}
