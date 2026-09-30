const apiUrl = (process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export interface Credentials {
  email: string;
  password: string;
}

export interface RegistrationDetails extends Credentials {
  username: string;
}

export interface MobileSession {
  accessToken: string;
  accessTokenExp: number;
  refreshToken: string;
  refreshTokenExp: number;
}

export async function login(credentials: Credentials): Promise<MobileSession> {
  const response = await fetch(`${apiUrl}/auth/mobile/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) await throwApiError(response);
  return response.json() as Promise<MobileSession>;
}

export async function register(details: RegistrationDetails): Promise<void> {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  });

  if (!response.ok) await throwApiError(response);
}

async function throwApiError(response: Response): Promise<never> {
  const payload: { message?: string | string[] } | null = await response.json().catch(() => null);
  const message = payload?.message;
  throw new Error(Array.isArray(message) ? message.join(', ') : message || 'Something went wrong. Please try again.');
}
