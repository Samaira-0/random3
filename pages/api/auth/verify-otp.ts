import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/db';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Missing email or OTP' });

  try {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check OTP match and expiry
    if (user.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(401).json({ message: 'OTP expired' });
    }

    // OTP is valid - clear OTP from user and possibly set user as authenticated in future
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({ message: 'OTP verified successfully', user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

