import { createContext, useContext, useState, type PropsWithChildren } from 'react';

interface AuthSession {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
}

const AuthSessionContext = createContext<AuthSession | null>(null);

export function AuthSessionProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthSessionContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const session = useContext(AuthSessionContext);
  if (!session) throw new Error('useAuthSession must be used inside AuthSessionProvider');
  return session;
}
