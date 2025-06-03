import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/register', form);
      setShowOtpInput(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/verify-register-otp', {
        email: form.email,
        otp,
      });
      alert('Registration successful!');
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center px-4">
      <div
        className="bg-white rounded-t-3xl pt-8 pb-10 px-6 sm:px-10 w-full max-w-md space-y-6 shadow-xl
                   animate-fadeIn transition-transform duration-500 ease-in-out scale-100 sm:scale-105"
      >
        <button onClick={() => router.back()} className="text-gray-500 text-sm">
          &larr; Back
        </button>

        <h2 className="text-2xl font-bold text-center text-black">Create Your Account</h2>
        <p className="text-sm text-center text-gray-600">
          We’re with you—every heartbeat, every step
        </p>

        {!showOtpInput ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
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
              placeholder="Enter password"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              {loading ? 'Submitting...' : 'Get Started'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        )}

        <div className="text-center text-sm text-gray-500">Sign up with</div>
        <div className="flex justify-center space-x-4">
          <FaFacebookF className="text-xl text-blue-600 cursor-pointer hover:scale-110 transition-transform duration-300" />
          <FaGoogle className="text-xl text-red-500 cursor-pointer hover:scale-110 transition-transform duration-300" />
          <FaApple className="text-xl text-black cursor-pointer hover:scale-110 transition-transform duration-300" />
        </div>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-purple-700 font-semibold cursor-pointer hover:underline"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
