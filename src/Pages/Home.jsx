
// import Hero from '../components/Hero';

// function Home() {
//   return (
//     <div>
//       <Hero />
//       <div className="bg-[#430e44] text-white py-20">
//         <div className="max-w-5xl mx-auto text-center space-y-8">
//           <h2 className="text-4xl font-bold">Why Choose Prediction World?</h2>
//           <p className="text-lg">
//             Our platform offers fair, transparent, and exciting prediction markets powered by blockchain.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="p-6 bg-[#2e0d41] rounded-lg shadow-lg">
//               <h3 className="text-2xl font-bold">Decentralized</h3>
//               <p>All markets are secured by smart contracts.</p>
//             </div>
//             <div className="p-6 bg-[#2e0d41] rounded-lg shadow-lg">
//               <h3 className="text-2xl font-bold">Profitable</h3>
//               <p>Earn big with accurate predictions.</p>
//             </div>
//             <div className="p-6 bg-[#2e0d41] rounded-lg shadow-lg">
//               <h3 className="text-2xl font-bold">Fair</h3>
//               <p>No hidden fees, no middlemen.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CircleDot, Hexagon, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'
import first from '../assets/first.png';
import second from '../assets/second.png';
import third from '../assets/third.png';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a0b2e] overflow-hidden relative">
      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 right-20 text-[#f51454]/20"
        animate={{
          y: [0, 20, 0],
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Hexagon size={64} />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-[#f51454]/20"
        animate={{
          y: [0, -20, 0],
          rotate: -360,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Circle size={48} />
      </motion.div>
      <motion.div
        className="absolute top-40 left-1/4 text-[#f51454]/20"
        animate={{
          x: [0, 20, 0],
          rotate: 180,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <CircleDot size={32} />
      </motion.div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight typewriter-font">
            Empower Your Vision
              <br />
              Create, Predict, and Trade Freely
              <br />
              on a Multichain Marketplace.
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto typewriter-font">
              Join the ultimate sports prediction platform. Make your predictions, compete with others, and win exciting rewards.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/markets">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#f51454] text-white rounded-full font-semibold text-lg hover:bg-[#d10d45] transition-colors duration-200 flex items-center gap-2 typewriter-font"
                >
                  Get Started
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link to="/markets">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent text-white rounded-full font-semibold text-lg border-2 border-[#f51454] hover:bg-[#f51454]/10 transition-colors duration-200 typewriter-font"
                >
                  Explore Markets
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Markets Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 typewriter-font">TOP MARKETS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Market Card 1 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-[#2e0d41] to-[#430e44] p-6 rounded-xl border border-[#f51454]/20"
            >
              <div className="h-48 bg-[#1a0b2e] rounded-lg mb-4 overflow-hidden">
                <img
                  src={first}
                  alt="Market preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 typewriter-font">Future of Electric Cars in 2030</h3>
              <p className="text-gray-400 mb-4 typewriter-font">
              Predict the adoption rate of electric cars by 2030 in a futuristic, sustainable city.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[#f51454] font-semibold typewriter-font">Prize Pool: 1000 USDC</span>
                <span className="text-gray-400 typewriter-font">24h left</span>
              </div>
            </motion.div>

            {/* Market Card 2 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-[#2e0d41] to-[#430e44] p-6 rounded-xl border border-[#f51454]/20"
            >
              <div className="h-48 bg-[#1a0b2e] rounded-lg mb-4 overflow-hidden">
              <img
                  src={second}
                  alt="Market preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 typewriter-font">Will AI Write the Next Bestseller by 2025?</h3>
              <p className="text-gray-400 mb-4 typewriter-font">
              Place your bets on whether AI will create a globally acclaimed book by 2025.
              </p>
              <div className="flex justify-between items-center typewriter-font">
                <span className="text-[#f51454] font-semibold typewriter-font">Prize Pool: 750 USDC</span>
                <span className="text-gray-400">48h left</span>
              </div>
            </motion.div>

            {/* Market Card 3 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-[#2e0d41] to-[#430e44] p-6 rounded-xl border border-[#f51454]/20"
            >
              <div className="h-48 bg-[#1a0b2e] rounded-lg mb-4 overflow-hidden">
              <img
                  src={third}
                  alt="Market preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 typewriter-font">First Lunar Hotel Opening Date</h3>
              <p className="text-gray-400 mb-4 typewriter-font">
              Predict when the first luxury hotel on the Moon will open for human vacationers.
              </p>
              <div className="flex justify-between items-center typewriter-font">
                <span className="text-[#f51454] font-semibold">Prize Pool: 500 USDC</span>
                <span className="text-gray-400 typewriter-font">12h left</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Glowing Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[#f51454]/5 mix-blend-overlay pointer-events-none" />
    </div>
  )
}

