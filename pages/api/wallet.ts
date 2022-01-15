import { prisma, UserAccount } from "../../utils";
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler({ req, res }: { req: NextApiRequest; res: NextApiResponse; }): Promise<void | NextApiResponse<any>> {
  switch (req.method) {
    case "GET":
      return forGET({ req, res });
    default:
      return res.status(405).end();
  }
}

async function forGET({ req, res }: { req: NextApiRequest; res: NextApiResponse; }): Promise<void> {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: req.headers.authorization
    }
  });

  res.json(transactions);
}

export default handler;