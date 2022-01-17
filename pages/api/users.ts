import prisma from '../../utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler( req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'method not allowed' });
  }

  const userExists = await prisma.userAccount.findMany({
    where: {
      NOT: {
        id: req.headers.authorization
      }
    },
    select: {
      fullName: true,
      id: true
    }
  });

  res.json(userExists);
}

export default handler;