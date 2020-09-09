import getConfig from 'next/config';
import axios from 'axios';
import httpStatusCode from 'http-status-codes';
import { parse } from 'cookie';

import { ForbiddenException } from '../exceptions/forbidden.exception';
import { AuthCookieNotFound } from '../exceptions/auth-cookie-not-found';

const {
  serverRuntimeConfig: { authentication: authenticationConfig },
} = getConfig();

const request = axios.create({
  baseURL: authenticationConfig.url,
  headers: {
    'content-type': 'application/json',
  },
});

export interface LoginDto {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export interface UserFetchResponse {
  // eslint-disable-next-line camelcase
  user_id: string;
  roles: string[];
}

// TODO: Handle request errors
export async function login(loginDto: LoginDto): Promise<string> {
  const loginUrl = `${authenticationConfig.url}/login`;

  try {
    const { data } = await request.post<LoginResponse>(loginUrl, {
      username: loginDto.email,
      password: loginDto.password,
    });

    return data.token;
  } catch (err) {
    if (err.response.status === httpStatusCode.FORBIDDEN) {
      throw new ForbiddenException();
    }

    throw err;
  }
}

export async function fetchUserFromJWT(jwt: string): Promise<UserFetchResponse> {
  const userFetchUrl = `${authenticationConfig.url}/user`;

  const { data } = await request.get<UserFetchResponse>(userFetchUrl, {
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });

  return data;
}

export async function fetchUserFromCookie(cookie: string): Promise<UserFetchResponse> {
  const token = parse(cookie)?.auth;

  if (!token) {
    throw new AuthCookieNotFound('Auth cookie is not set');
  }

  const user = await fetchUserFromJWT(token);

  return user;
}
