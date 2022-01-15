import { prisma, LoginDetails } from "../../utils";
import type { NextApiRequest, NextApiResponse } from 'next'
var bcrypt = require('bcryptjs');

async function handler({ req, res }: { req: NextApiRequest; res: NextApiResponse; }): Promise<void | NextApiResponse<any>> {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'method not allowed' });
  }
  const loginData: LoginDetails = JSON.parse(req.body);

  const userExists = await prisma.userAccount.findUnique({
    where: {
      email: loginData.email
    }
  });
  if (!userExists)
    return res.status(404);

  const isCorrectPassword: boolean = bcrypt.compareSync(loginData.password, userExists.password);
  if (!isCorrectPassword)
    return res.status(401);

  userExists.password = "";

  res.json(userExists);
}

export default handler;