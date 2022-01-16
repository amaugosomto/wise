import { UserAccount } from "../../utils";
import { prisma } from '../../utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Transaction } from ".prisma/client";

async function handler( req: NextApiRequest, res: NextApiResponse) {
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
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: req.headers.authorization
    }
  });

  res.json(transactions);
}

async function forPOST({ req, res }: { req: NextApiRequest; res: NextApiResponse; }): Promise<void> {
  const data: Transaction = JSON.parse(req.body);

  const transaction = await prisma.transaction.create({
    data
  });

  res.json(transaction);
}

export default handler;