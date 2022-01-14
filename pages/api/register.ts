import { prisma, UserAccount } from "../../utils";
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'method not allowed' })
  }
  const registerData: UserAccount = JSON.parse(req.body);

  const userExists = await prisma.userAccount.findUnique({
    where: {
      email: registerData.email
    }
  });

  if (userExists) return res.status(401).json({ message: 'Email Already exists' });
  
  const savedUser = await prisma.userAccount.create({
    data: registerData
  });

  res.json(savedUser);
}

export default handler;