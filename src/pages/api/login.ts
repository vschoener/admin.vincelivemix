import { NextApiResponse, NextApiRequest } from 'next';

import { login as loginUser } from '../../server/services/authentication';

export default async function login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    const token = await loginUser(req.body);

    res.json({ token });
    return;
  }

  res.status(405).json({});
}
