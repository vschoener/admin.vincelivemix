import { NextApiResponse, NextApiRequest } from 'next';
import getConfig from 'next/config';
import { serialize } from 'cookie';
import httpStatusCode from 'http-status-codes';

import * as authentication from '../../server/services/authentication';
import { ForbiddenException } from '../../server/exceptions/forbidden.exception';

const {
  publicRuntimeConfig: { env },
} = getConfig();

export default async function login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(httpStatusCode.METHOD_NOT_ALLOWED).end();
    return;
  }

  try {
    const token = await authentication.login(req.body);

    res.setHeader(
      'Set-Cookie',
      serialize('auth', token, {
        httpOnly: true,
        secure: env !== 'development',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      }),
    );

    res.status(httpStatusCode.OK).end();
  } catch (err) {
    if (err.constructor === ForbiddenException) {
      res.status(httpStatusCode.FORBIDDEN).json({
        msg: 'Invalid credential',
      });
      return;
    }

    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).end();
  }
}
