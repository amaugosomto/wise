import { Status } from "../../utils";
import prisma from '../../utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Decimal } from "@prisma/client/runtime";

async function handler( req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'method not allowed' });
  }
  const acceptTransactionData: {
    amountToSave: Decimal
    walletId: string
    transactionId: string
  } = JSON.parse(req.body);

  const wallet = await prisma.wallet.update({
    where: {
      id: acceptTransactionData.walletId
    },
    data: {
      amount: {
        increment: Number.parseFloat(acceptTransactionData.amountToSave.toFixed(2))
      }
    }
  });

  if (!wallet) return res.status(401).json({message: 'Could not save wallet'});

  await prisma.transaction.update({
    where: {
      id: acceptTransactionData.transactionId
    },
    data: {
      statusId: Status.Rejected
    }
  });

  res.json({});
}

export default handler;