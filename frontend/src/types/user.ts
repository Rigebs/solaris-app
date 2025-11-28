export interface User {
  id: number;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  is_superuser?: boolean;
}

export interface UserUpdate {
  name?: string;
  address?: string;
  phone?: string;
}
