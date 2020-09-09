import { NextApiResponse, NextApiRequest } from 'next';
import httpStatusCode from 'http-status-codes';

import { fetchUserFromCookie } from '../../server/services/authentication';

/**
 * fetchUser is a controller route to fetch user
 */
export default async function fetchUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'GET') {
    res.status(httpStatusCode.METHOD_NOT_ALLOWED).end();
    return;
  }

  if (!req.headers?.cookie) {
    res.status(httpStatusCode.UNAUTHORIZED).end();
    return;
  }

  try {
    const user = await fetchUserFromCookie(req.headers.cookie);
    res.status(httpStatusCode.OK).json({ user });
  } catch (err) {
    // TODO: Log error properly handling server case and be notified if it's not authentication problem.
    // For now we assume the token is wrong/expired and 401 is raised

    res.status(httpStatusCode.UNAUTHORIZED).end();
  }
}
