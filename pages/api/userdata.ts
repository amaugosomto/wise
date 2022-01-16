import { UserAccount } from "../../utils";
import prisma from '../../utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler( req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
  switch (req.method) {
    case "GET":
      return forGET({ req, res });
    default:
      return res.status(405).end();
  }
}

async function forGET({ req, res }: { req: NextApiRequest; res: NextApiResponse; }): Promise<void> {
  const wallets = await prisma.userAccount.findUnique({
    where: {
      id: req.headers.authorization
    },
    include: {
      sentUser: {
        include: {
          status: {
            select: {name: true}
          },
          sentCurrency: {
            select: {name: true}
          }
        }
      },
      receivedUser: {
        include: {
          status: {
            select: {name: true}
          },
          sentCurrency: {
            select: {name: true}
          },
          receivedUser: {
            select: {fullName: true}
          }
        }
      },
      wallets: {
        select: {
          amount: true,
          currency: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  res.json(wallets);
}

export default handler;