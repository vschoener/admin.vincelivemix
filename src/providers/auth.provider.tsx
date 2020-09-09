import React, { createContext, FunctionComponent, useContext } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { fetchUser } from '../client/services/auth';

export interface User {
  userId: string;
  roles: string[];
}

export type AuthProps = {
  user: {
    userId: string;
    roles: string[];
  };
};

export interface AuthData {
  user: User | null;
  loading: boolean;
  requireAuthentication: () => void;
}

const AuthContext = createContext<AuthData | null>(null);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const router = useRouter();
  const { data, error } = useSWR('/api/fetch-user', fetchUser, {
    shouldRetryOnError: false,
  });

  const loading = !data && !error;
  const user = !data
    ? null
    : {
        userId: data.user_id,
        roles: data.roles,
      };

  const requireAuthentication = () => {
    if (!loading && !user) {
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, requireAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthData => {
  const data = useContext(AuthContext);

  if (!data) {
    throw Error('Context is not initialized');
  }

  return data;
};
