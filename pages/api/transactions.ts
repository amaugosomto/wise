import prisma from '../../utils/prisma';
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
    orderBy: {
      updated_at: 'desc'
    },
    where: {
      OR: [
        {sentById: req.headers.authorization},
        {receivedById: req.headers.authorization},
      ]
    },
    include: {
      sentUser: {
        select: {fullName: true}
      },
      receivedUser: {
        select: {fullName: true}
      },
      status: {
        select: {name: true}
      },
      sentCurrency: {
        select: {name: true}
      },
      receivedCurrency: {
        select: {name: true}
      }
    }
  });

  res.json(transactions);
}

async function forPOST({ req, res }: { req: NextApiRequest; res: NextApiResponse; }): Promise<void> {
  const data: Transaction = JSON.parse(req.body);
  
  if (data.sentWalletId) {
    // deduct from wallet
    await prisma.wallet.update({
      where: {
        id: data.sentWalletId
      },
      data: {
        amount: {
          decrement: Number.parseFloat(data.amount.toFixed(2))
        },
        updated_at: new Date()
      }
    });

  }

  const transaction = await prisma.transaction.create({
    data
  });

  res.json(transaction);
}

export default handler;