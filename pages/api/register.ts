import { prisma } from "../../utils";
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'method not allowed' })
  }
  const registerData = JSON.parse(req.body);

  const savedUser = await prisma.userAccount.create({
    data: registerData
  });

  res.json(savedUser);
}

export default handler;