import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dbConnect from '@/utils/db';
import User from '@/models/User';
import { sendOTPEmail } from '@/utils/sendEmail';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'User not found' });

  if (!user.isVerified)
    return res.status(401).json({ error: 'Email not verified. Please verify your email first.' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  // Generate OTP for login
  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendOTPEmail(email, otp);

  // Instead of returning token, tell frontend to ask for OTP verification now
  return res.status(200).json({ message: 'OTP sent to your email. Please verify to complete login.' });
}
