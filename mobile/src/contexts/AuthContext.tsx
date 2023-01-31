import { GOOGLE_CLIENT_ID } from '@env';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserProps;
  userIsLoading: boolean;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [userIsLoading, setUserIsLoading] = useState(false);
  const [_request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  async function signIn() {
    try {
      setUserIsLoading(true);
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setUserIsLoading(false);
    }
  }

  async function signInWithGoogle(accessToken: string) {
    try {
      console.log({ access_token: accessToken });
      setUserIsLoading(true);
      let response = await api.post('/users', { access_token: accessToken });
      const jwtToken = `Bearer ${response.data.token}`;
      api.defaults.headers.common['Authorization'] = jwtToken;
      response = await api.get('/me');
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setUserIsLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        userIsLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
