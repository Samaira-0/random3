import dbConnect from '@/utils/db';
import Emotion from '@/models/emotion';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, emotion } = req.body;

  if (!email || !emotion) {
    return res.status(400).json({ message: 'Missing email or emotion' });
  }

  try {
    await dbConnect();
    const saved = await Emotion.create({ email, emotion });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save emotion', error: err });
  }
}
