import { NextApiResponse, NextApiRequest } from 'next';
import getConfig from 'next/config';
import { serialize } from 'cookie';
import httpStatusCode from 'http-status-codes';

const {
  publicRuntimeConfig: { env },
} = getConfig();

export default async function logout(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'GET') {
    res.status(httpStatusCode.METHOD_NOT_ALLOWED).end();
    return;
  }

  res.setHeader(
    'Set-Cookie',
    serialize('auth', '', {
      httpOnly: true,
      secure: env !== 'development',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    }),
  );

  res.writeHead(302, { Location: '/' });
  res.end();
}
