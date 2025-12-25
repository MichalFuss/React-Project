export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'customer';
  created_at: string;
  is_active: boolean;
}
export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'agent' | 'customer';
  }
}
export interface LoginProps{
  email: string;
  password: string;
}
export interface RegisterProps{
  name: string;
  email: string;
  password: string;
}
