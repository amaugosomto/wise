import { Status, UserAccount } from "../../utils";
import prisma from '../../utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Decimal } from "@prisma/client/runtime";

async function handler( req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'method not allowed' });
  }
  const acceptTransactionData: {
    amountToSave: Decimal
    wallet: string
    currency: number
    rate: number
    transactionId: string
    user: string
  } = JSON.parse(req.body);

  const wallet = await prisma.wallet.update({
    where: {
      id: acceptTransactionData.wallet
    },
    data: {
      amount: {
        increment: Number.parseFloat(acceptTransactionData.amountToSave.toFixed(2))
      },
      updated_at: new Date()
    }
  });

  if (!wallet) return res.status(401).json({message: 'Could not save wallet'});

  await prisma.transaction.update({
    where: {
      id: acceptTransactionData.transactionId
    },
    data: {
      rate: acceptTransactionData.rate,
      receivedCurrencyId: acceptTransactionData.currency,
      statusId: Status.Received,
      receivedWalletId: acceptTransactionData.wallet,
      updated_at: new Date()
    }
  });

  res.json({});
}

export default handler;