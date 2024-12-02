import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { useOkto } from 'okto-sdk-react';
import { GoogleLogin } from '@react-oauth/google';
import logo from '../assets/finallogo (1).png';
import { ChevronDown, Wallet, LogOut } from 'lucide-react';

const CHAINS = [
  { key: 'BASE', name: 'Base Sepolia' },
  { key: 'UNICHAIN', name: 'Unichain Sepolia' },
];

export default function Navbar({ setAuthToken, authToken, handleLogout }) {
  const { connectWallet, account, switchChain, currentChain } = useWeb3();
  const { authenticate, isLoggedIn, createWallet, getWallets } = useOkto();
  const [isOpen, setIsOpen] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [showWallets, setShowWallets] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      fetchWallets();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        controls.start({ y: '-100%' });
      } else {
        controls.start({ y: 0 });
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, controls]);

  const handleOktoLogin = async (googleResponse) => {
    const idToken = googleResponse.credential;
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        setAuthToken(authResponse.auth_token);
        fetchWallets();
      }
      if (error) {
        console.error('Authentication error:', error);
      }
    });
  };

  const handleCreateWallet = async () => {
    try {
      await createWallet();
      await fetchWallets();
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  };

  const fetchWallets = async () => {
    try {
      const response = await getWallets();
      if (response?.wallets && Array.isArray(response.wallets)) {
        setWallets(response.wallets);
      }
    } catch (error) {
      console.error('Error fetching wallets:', error);
    }
  };

  const toggleWallets = () => setShowWallets(!showWallets);

  const handleChainSwitch = async (chainKey) => {
    try {
      await switchChain(chainKey);
      setDropdownOpen(false);
    } catch (error) {
      console.error(`Error switching to ${chainKey}:`, error);
    }
  };

  return (
    <motion.nav
      className="fixed w-full z-50 bg-gradient-to-r from-[#2e0d41] to-[#430e44] shadow-lg"
      initial={{ y: 0 }}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
        .typewriter-font {
          font-family: 'Special Elite', cursive;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <motion.img
                src={logo}
                alt="Logo"
                className="h-12 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/markets">Markets</NavLink>
            <NavLink to="/create">Create Prediction</NavLink>
            <NavLink to="/my-markets">My Predictions</NavLink>

            {/* Chain Selection Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center px-4 py-2 bg-[#1a0b2e] rounded-full text-white font-medium border border-[#f51454] hover:bg-[#2e0d41] transition-colors duration-200 typewriter-font"
                whileHover={{ scale: 1.05 }}
              >
                {CHAINS.find((chain) => chain.key === currentChain)?.name || 'Select Network'}
                <ChevronDown size={16} className="ml-2" />
              </motion.button>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-[#1a0b2e] rounded-lg shadow-lg border border-[#f51454] overflow-hidden z-10"
                >
                  {CHAINS.map((chain) => (
                    <button
                      key={chain.key}
                      onClick={() => handleChainSwitch(chain.key)}
                      className={`block w-full px-4 py-2 text-left text-sm text-white hover:bg-[#2e0d41] ${
                        currentChain === chain.key ? 'bg-[#2e0d41]' : ''
                      }`}
                    >
                      {chain.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {account ? (
              <motion.div
                className="text-sm bg-[#1a0b2e] px-4 py-2 rounded-full text-white font-medium border border-[#f51454] typewriter-font"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Connected: {account.slice(0, 6)}...{account.slice(-4)}
              </motion.div>
            ) : (
              <motion.button
                onClick={connectWallet}
                className="px-4 py-2 bg-[#f51454] rounded-full text-white typewriter-font"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(245, 20, 84, 0.3)' }}
              >
                Connect Wallet
              </motion.button>
            )}

            {isLoggedIn ? (
              <div className="relative">
                <motion.button
                  onClick={toggleWallets}
                  className="flex items-center px-4 py-2 bg-[#1a0b2e] rounded-full text-white font-medium border border-[#f51454] hover:bg-[#2e0d41] transition-colors duration-200 typewriter-font"
                  whileHover={{ scale: 1.05 }}
                >
                  <Wallet size={16} className="mr-2" />
                  Okto Wallets
                  <ChevronDown size={16} className="ml-2" />
                </motion.button>
                <AnimatePresence>
                  {showWallets && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-72 bg-[#1a0b2e] rounded-lg shadow-lg border border-[#f51454] overflow-hidden"
                    >
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-4 typewriter-font">Your Wallets</h3>
                        {wallets.length > 0 ? (
                          wallets.map((wallet, index) => (
                            <div key={index} className="mb-4 p-3 bg-[#2e0d41] rounded-lg">
                              <p className="text-sm text-gray-300 typewriter-font">Network: {wallet.network_name}</p>
                              <p className="text-sm text-white break-all typewriter-font">{wallet.address}</p>
                              <p
                                className={`text-sm ${
                                  wallet.success ? 'text-green-400' : 'text-red-400'
                                } typewriter-font`}
                              >
                                Status: {wallet.success ? 'Active' : 'Inactive'}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400 typewriter-font">No wallets found.</p>
                        )}
                        <motion.button
                          onClick={handleCreateWallet}
                          className="w-full mt-4 px-4 py-2 bg-[#f51454] text-white rounded-md hover:bg-[#d10d45] transition-colors duration-200 typewriter-font"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Create New Wallet
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleOktoLogin}
                onError={() => console.error('Google Login Failed')}
                useOneTap
              />
            )}

            {/* {isLoggedIn && (
              <motion.button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-[#1a0b2e] rounded-full text-white font-medium border border-[#f51454] hover:bg-[#2e0d41] transition-colors duration-200 typewriter-font"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </motion.button>
            )} */}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-gray-200 hover:text-[#f51454] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 typewriter-font"
    >
      <motion.span whileHover={{ scale: 1.05 }}>{children}</motion.span>
    </Link>
  );
}


// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence, useAnimation } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useWeb3 } from '../context/Web3Context';
// import { useOkto } from 'okto-sdk-react';
// import { GoogleLogin } from '@react-oauth/google';
// import logo from '../assets/finallogo.png';
// import { ChevronDown, Wallet, LogOut } from 'lucide-react';

// export default function Navbar({ setAuthToken, authToken, handleLogout }) {
//   const { connectWallet, account } = useWeb3();
//   const { authenticate, isLoggedIn, createWallet, getWallets } = useOkto();
//   const [isOpen, setIsOpen] = useState(false);
//   const [wallets, setWallets] = useState([]);
//   const [showWallets, setShowWallets] = useState(false);
//   const controls = useAnimation();
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchWallets();
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       if (currentScrollY > lastScrollY) {
//         controls.start({ y: '-100%' });
//       } else {
//         controls.start({ y: 0 });
//       }
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY, controls]);

//   const handleOktoLogin = async (googleResponse) => {
//     const idToken = googleResponse.credential;
//     authenticate(idToken, async (authResponse, error) => {
//       if (authResponse) {
//         setAuthToken(authResponse.auth_token);
//         fetchWallets();
//       }
//       if (error) {
//         console.error("Authentication error:", error);
//       }
//     });
//   };

//   const handleCreateWallet = async () => {
//     try {
//       await createWallet();
//       await fetchWallets();
//     } catch (error) {
//       console.error('Error creating wallet:', error);
//     }
//   };

//   const fetchWallets = async () => {
//     try {
//       const response = await getWallets();
//       if (response?.wallets && Array.isArray(response.wallets)) {
//         setWallets(response.wallets);
//       }
//     } catch (error) {
//       console.error('Error fetching wallets:', error);
//     }
//   };

//   const toggleWallets = () => setShowWallets(!showWallets);

//   return (
//     <motion.nav
//       className="fixed w-full z-50 bg-gradient-to-r from-[#2e0d41] to-[#430e44] shadow-lg"
//       initial={{ y: 0 }}
//       animate={controls}
//       transition={{ duration: 0.3 }}
//     >
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
        
//         .typewriter-font {
//           font-family: 'Special Elite', cursive;
//         }
//       `}</style>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20">
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0">
//               <motion.img
//                 src={logo}
//                 alt="Logo"
//                 className="h-12 w-auto"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               />
//             </Link>
//           </div>
          
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             <NavLink to="/markets">Sports Markets</NavLink>
//             <NavLink to="/create">Create Prediction</NavLink>
//             <NavLink to="/my-markets">My Predictions</NavLink>

//             {account ? (
//               <motion.div
//                 className="text-sm bg-[#1a0b2e] px-4 py-2 rounded-full text-white font-medium border border-[#f51454] typewriter-font"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: 'spring', stiffness: 400 }}
//               >
//                 Connected: {account.slice(0, 6)}...{account.slice(-4)}
//               </motion.div>
//             ) : (
//               <motion.button
//                 onClick={connectWallet}
//                 className="px-4 py-2 bg-[#f51454] rounded-full text-white typewriter-font"
//                 whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(245, 20, 84, 0.3)' }}
//               >
//                 Connect Wallet
//               </motion.button>
//             )}

//             {isLoggedIn ? (
//               <div className="relative">
//                 <motion.button
//                   onClick={toggleWallets}
//                   className="flex items-center px-4 py-2 bg-[#1a0b2e] rounded-full text-white font-medium border border-[#f51454] hover:bg-[#2e0d41] transition-colors duration-200 typewriter-font"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <Wallet size={16} className="mr-2" />
//                   Okto Wallets
//                   <ChevronDown size={16} className="ml-2" />
//                 </motion.button>
//                 <AnimatePresence>
//                   {showWallets && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute right-0 mt-2 w-72 bg-[#1a0b2e] rounded-lg shadow-lg border border-[#f51454] overflow-hidden"
//                     >
//                       <div className="p-4">
//                         <h3 className="text-lg font-semibold text-white mb-4 typewriter-font">Your Wallets</h3>
//                         {wallets.length > 0 ? (
//                           wallets.map((wallet, index) => (
//                             <div key={index} className="mb-4 p-3 bg-[#2e0d41] rounded-lg">
//                               <p className="text-sm text-gray-300 typewriter-font">Network: {wallet.network_name}</p>
//                               <p className="text-sm text-white break-all typewriter-font">{wallet.address}</p>
//                               <p className={`text-sm ${wallet.success ? 'text-green-400' : 'text-red-400'} typewriter-font`}>
//                                 Status: {wallet.success ? 'Active' : 'Inactive'}
//                               </p>
//                             </div>
//                           ))
//                         ) : (
//                           <p className="text-gray-400 typewriter-font">No wallets found.</p>
//                         )}
//                         <motion.button
//                           onClick={handleCreateWallet}
//                           className="w-full mt-4 px-4 py-2 bg-[#f51454] text-white rounded-md hover:bg-[#d10d45] transition-colors duration-200 typewriter-font"
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                         >
//                           Create New Wallet
//                         </motion.button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <GoogleLogin
//                 onSuccess={handleOktoLogin}
//                 onError={() => console.error('Google Login Failed')}
//                 useOneTap
//               />
//             )}

//             {isLoggedIn && (
//               <motion.button
//                 onClick={handleLogout}
//                 className="flex items-center px-4 py-2 bg-[#1a0b2e] rounded-full text-white font-medium border border-[#f51454] hover:bg-[#2e0d41] transition-colors duration-200 typewriter-font"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <LogOut size={16} className="mr-2" />
//                 Logout
//               </motion.button>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#f51454] focus:outline-none"
//             >
//               <svg
//                 className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//               <svg
//                 className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-[#1a0b2e]"
//           >
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <MobileNavLink to="/markets" onClick={() => setIsOpen(false)}>Sports Markets</MobileNavLink>
//               <MobileNavLink to="/create" onClick={() => setIsOpen(false)}>Create Prediction</MobileNavLink>
//               <MobileNavLink to="/my-markets" onClick={() => setIsOpen(false)}>My Predictions</MobileNavLink>
              
//               {account ? (
//                 <div className="px-4 py-2 text-sm text-white bg-[#2e0d41] rounded-md typewriter-font">
//                   Connected: {account.slice(0, 6)}...{account.slice(-4)}
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => {
//                     connectWallet();
//                     setIsOpen(false);
//                   }}
//                   className="w-full text-left px-4 py-2 text-white bg-[#f51454] rounded-md hover:bg-[#d10d45] transition-colors typewriter-font"
//                 >
//                   Connect Wallet
//                 </button>
//               )}

//               {isLoggedIn && (
//                 <div className="mt-4">
//                   <h3 className="px-4 text-lg font-semibold text-white mb-2 typewriter-font">Okto Wallets</h3>
//                   {wallets.length > 0 ? (
//                     wallets.map((wallet, index) => (
//                       <div key={index} className="mb-2 p-3 bg-[#2e0d41] rounded-lg mx-2">
//                         <p className="text-sm text-gray-300 typewriter-font">Network: {wallet.network_name}</p>
//                         <p className="text-sm text-white break-all typewriter-font">{wallet.address}</p>
//                         <p className={`text-sm ${wallet.success ? 'text-green-400' : 'text-red-400'} typewriter-font`}>
//                           Status: {wallet.success ? 'Active' : 'Inactive'}
//                         </p>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="px-4 text-gray-400 typewriter-font">No wallets found.</p>
//                   )}
//                   <button
//                     onClick={() => {
//                       handleCreateWallet();
//                       setIsOpen(false);
//                     }}
//                     className="w-full mt-2 px-4 py-2 bg-[#f51454] text-white rounded-md hover:bg-[#d10d45] transition-colors typewriter-font"
//                   >
//                     Create New Wallet
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setIsOpen(false);
//                     }}
//                     className="w-full mt-2 px-4 py-2 bg-[#1a0b2e] text-white rounded-md border border-[#f51454] hover:bg-[#2e0d41] transition-colors typewriter-font"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }

// function NavLink({ to, children }) {
//   return (
//     <Link
//       to={to}
//       className="text-gray-200 hover:text-[#f51454] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 typewriter-font"
//     >
//       <motion.span whileHover={{ scale: 1.05 }}>{children}</motion.span>
//     </Link>
//   );
// }

// function MobileNavLink({ to, children, onClick }) {
//   return (
//     <Link
//       to={to}
//       onClick={onClick}
//       className="block px-4 py-2 text-base font-medium text-white hover:bg-[#2e0d41] rounded-md transition-colors typewriter-font"
//     >
//       {children}
//     </Link>
//   );
// }

