'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, Role } from '@/types/auth';
import { getToken, setToken, getUser, setUser, clearAuth } from '@/lib/auth';
import { API_BASE_URL } from '@/lib/constants';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();
    setTokenState(storedToken);
    setUserState(storedUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const query = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user { id email name role }
        }
      }
    `;

    const response = await fetch(`${API_BASE_URL}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { email, password } }),
    });

    const json = await response.json();

    if (json.errors?.length) {
      throw new Error(json.errors[0].message || 'Invalid credentials. Please try again.');
    }

    const { token: newToken, user: newUser } = json.data.login;

    setToken(newToken);
    setUser(newUser);
    setTokenState(newToken);
    setUserState(newUser);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setTokenState(null);
    setUserState(null);
  }, []);

  const hasRole = useCallback(
    (role: Role) => {
      return user?.role === role;
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

