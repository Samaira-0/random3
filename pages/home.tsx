import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

type User = {
  name: string;
  email: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(userData);
    }
  }, [router]);

  const goToEmotionPage = () => {
    router.push('/emotion');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white rounded-t-3xl pt-8 pb-10 px-6 sm:px-10 w-full max-w-md space-y-6 shadow-xl animate-fadeIn scale-100 sm:scale-105 transition-transform duration-500 ease-in-out backdrop-blur-lg"
      >
        {user ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-black text-center">Welcome, {user.name}!</h1>
            <p className="text-gray-700 text-sm md:text-base text-center">Your email: {user.email}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToEmotionPage}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold py-3 md:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300"
            >
              Go to Emotional Classification
            </motion.button>
          </>
        ) : (
          <p className="text-gray-700 text-lg md:text-xl text-center">Loading...</p>
        )}
      </motion.div>
    </div>
  );
}
