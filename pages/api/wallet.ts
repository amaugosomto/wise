import { UserAccount } from "../../utils";
import prisma from '../../utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler( req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
  switch (req.method) {
    case "GET":
      return forGET({ req, res });
    case "POST":
      return forPOST({ req, res });
    default:
      return res.status(405).end();
  }
}

async function forGET({ req, res }: { req: NextApiRequest; res: NextApiResponse; }): Promise<void> {
  const wallets = await prisma.wallet.findMany({
    where: {
      userId: req.headers.authorization
    },
    select: {
      id: true,
      amount: true,
      currency: {
        select: {
          name: true
        }
      }
    }
  });

  res.json(wallets);
}
async function forPOST({ req, res }: { req: NextApiRequest; res: NextApiResponse; }): Promise<void> {
  
  const data = JSON.parse(req.body);

  const wallets = await prisma.wallet.create({
    data
  });

  res.json(wallets);
}

export default handler;