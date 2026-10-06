import api from "@/lib/api";

const apiUrl = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export interface Credentials {
  email: string;
  password: string;
}

export interface RegistrationDetails extends Credentials {
  username: string;
}

export interface WebSession {
  accessToken: string;
  accessTokenExp: number;
}

export async function login(credentials: Credentials): Promise<WebSession> {
  try {
    return await api.post("auth/login", credentials);
  } catch (error) {
    throw error;
  }
}

export async function register(details: RegistrationDetails): Promise<void> {
  try {
    return api.post("auth/register", details);
  } catch (error) {
    throw error;
  }
}
