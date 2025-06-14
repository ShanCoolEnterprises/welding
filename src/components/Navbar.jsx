import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'OurServices', path: '/ourservices' },
    { name: 'Metal/Steel Furniture', path: '/furniture' },
    { name: 'Metal Services', path: '/metal' },
    { name: 'About Us', path: '/about' },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 w-full z-50 bg-[#1e293b] shadow-xl text-white"
      >
        <div className="container  px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            MR Steel Fabrication
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`transition-all font-medium hover:text-yellow-300 ${
                  isActive(item.path) ? 'text-yellow-300 underline underline-offset-4' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}

            <a
              href="tel:+919355626174"
              className="flex items-center gap-2 bg-green-600 hover:bg-blue-300 text-white font-bold px-4 py-2 rounded-full transition shadow"
            >
              <FaPhoneAlt className="text-sm" /> Call Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="md:hidden bg-[#1e293b] overflow-hidden"
            >
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-6 py-4 font-medium text-white border-b border-blue-700 transition-all ${
                    isActive(item.path) ? 'bg-yellow-300 text-black' : 'hover:bg-blue-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:+919355626174"
                className="flex items-center justify-center gap-2 py-4 bg-green-600 text-white font-bold"
              >
                <FaPhoneAlt className="text-sm" /> Call Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      {/* <div className="h-[80px] md:h-[96px] lg:h-[104px] xl:h-[110px] 2xl:h-[110px] bg-transparent"></div> */}
    </>
  );
};

export default Navbar;
