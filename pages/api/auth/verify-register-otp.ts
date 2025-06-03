import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/db';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Missing email or OTP' });

  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.isVerified)
    return res.status(400).json({ message: 'User already verified' });

  if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date())
    return res.status(400).json({ message: 'Invalid or expired OTP' });

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.status(200).json({ message: 'Email verified successfully. You can now login.' });
}
