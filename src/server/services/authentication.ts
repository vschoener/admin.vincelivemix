import getConfig from 'next/config';
import axios from 'axios';

const {
  serverRuntimeConfig: { authentication: authenticationConfig },
} = getConfig();

const request = axios.create({
  baseURL: authenticationConfig.url,
  headers: {
    'content-type': 'application/json',
  },
});

type LoginDto = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

// TODO: Handle request errors
export async function login(loginDto: LoginDto): Promise<string> {
  const loginUrl = `${authenticationConfig.url}/login`;

  const { data } = await request.post<LoginResponse>(loginUrl, {
    username: loginDto.email,
    password: loginDto.password,
  });

  return data.token;
}
