import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOtp(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      alert(res.data.message);
      setIsOtpSent(true);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Login failed.');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/verify-otp', {
        email: form.email,
        otp,
      });
      alert('Login successful!');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      router.push('/home');
    } catch (err: any) {
      alert(err.response?.data?.message || 'OTP verification failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center px-4">
      <div className="bg-white rounded-t-3xl pt-8 pb-10 px-6 w-full max-w-md space-y-6 shadow-xl animate-fadeIn">
        <button onClick={() => router.back()} className="text-gray-500 text-sm">&larr; Back</button>
        <h2 className="text-2xl font-bold text-center text-black">Welcome Back</h2>
        <p className="text-sm text-center text-gray-600">Ready to continue your journey? Your path is right here.</p>

        <form onSubmit={isOtpSent ? handleOtpSubmit : handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter email"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {isOtpSent && (
            <input
              name="otp"
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          )}
          <div className="flex justify-between text-sm text-gray-600">
            <label>
              <input type="checkbox" className="mr-1" /> Remember me
            </label>
            <span className="cursor-pointer">Forgot password?</span>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            {isOtpSent ? 'Verify OTP' : 'Log In'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">Sign in with</div>
        <div className="flex justify-center space-x-4">
          <FaFacebookF className="text-xl text-blue-600" />
          <FaGoogle className="text-xl text-red-500" />
          <FaApple className="text-xl text-black" />
        </div>
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <span onClick={() => router.push('/register')} className="text-purple-700 font-semibold cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
}
