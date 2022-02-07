import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name } = req.body as { name: string };
    const avatar = `https://avatars.dicebear.com/api/initials/${name}.svg`;
    res.status(200).json({ avatar });
  } else {
    res.status(403).json({ message: 'Method not allowed' });
  }
};
