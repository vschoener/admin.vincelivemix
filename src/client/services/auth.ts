import { request } from '../http';

import { LoginDto, UserFetchResponse } from '../../server/services/authentication';

export async function login(loginDto: LoginDto): Promise<void> {
  await request.post('/api/login', loginDto);
}

export async function fetchUser(): Promise<UserFetchResponse> {
  const { data } = await request.get<UserFetchResponse>('/api/fetch-user');

  return data;
}
