import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center px-4 py-10">
      <motion.div
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-center space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Welcome
        </motion.h1>

        <motion.p
          className="text-gray-800 text-base sm:text-lg md:text-xl font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Medicine cures diseases but <br />
          only doctors can cure patients. <br />
          <span className="italic">— Carl Jung</span>
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Image
            src="/abc.png"
            alt="Welcome Illustration"
            width={250}
            height={250}
            className="mx-auto w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] h-auto"
          />
        </motion.div>

        <motion.div
          className="space-y-4 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <button
            onClick={() => router.push('/register')}
            className="w-full bg-white text-black font-semibold py-3 rounded-full shadow-md hover:scale-105 transition duration-300"
          >
            Create Account
          </button>
          <button
            onClick={() => router.push('/login')}
            className="w-full border border-white text-white font-semibold py-3 rounded-full hover:bg-white hover:text-black transition duration-300"
          >
            Log In
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
