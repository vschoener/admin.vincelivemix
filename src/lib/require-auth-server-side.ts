import { GetServerSideProps } from 'next';
import httpStatusCode from 'http-status-codes';
import { ServerResponse } from 'http';

import { fetchUserFromCookie } from '../server/services/authentication';

export interface AuthProps {
  user: {
    // eslint-disable-next-line camelcase
    user_id: string;
    roles: string[];
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyProps {}

export const redirectResToLogin = (res: ServerResponse): void =>
  res
    .writeHead(httpStatusCode.PERMANENT_REDIRECT, {
      Location: `/login`,
    })
    .end();

export const requireAuth: GetServerSideProps<AuthProps | EmptyProps> = async ({ req, res }) => {
  const cookie = req.headers?.cookie;

  if (!cookie) {
    return { props: {} };
  }

  try {
    const user = await fetchUserFromCookie(cookie);

    return {
      props: {
        user: {
          user_id: user.user_id,
          roles: user.roles,
        },
      },
    };
  } catch (err) {
    // TODO: Log error. For now we assume the token is wrong/expired and 401 is raised
    redirectResToLogin(res);
    return { props: {} };
  }
};
