export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  fullName: string;
  token: string;
}
