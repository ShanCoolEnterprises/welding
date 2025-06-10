import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTools, FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-600 text-white py-12 px-4 overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MR Steel Fabrication",
            "url": "https://www.mrsteelfabrication.com",
            "logo": "/logo.png",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+917037918018",
                "contactType": "Customer Service",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"]
              }
            ]
          })}
        </script>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm"
      >
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-yellow-300">
            <FaTools className="text-yellow-400 animate-pulse" />
            MR Steel Fabrication
          </h3>
          <p className="text-gray-200 text-sm">
            Reliable welding & fabrication solutions since 2015. Precision and durability in every project.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="space-y-3 text-gray-200">
            <li><Link to="/" className="hover:text-yellow-300 duration-300">Home</Link></li>
            <li><Link to="/all-gallery" className="hover:text-yellow-300 duration-300">Gallery</Link></li>
            <li><Link to="/ourservices" className="hover:text-yellow-300 duration-300">Services</Link></li>
            <li><Link to="/metal" className="hover:text-yellow-300 duration-300">Metal</Link></li>
            <li><Link to="/about" className="hover:text-yellow-300 duration-300">Contact</Link></li>
            <li><Link to="/term" className="hover:text-yellow-300 duration-300">Terms</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Contact Info</h4>
          <p className="flex items-center text-gray-200 gap-2">
            <FaPhone className="text-yellow-400" />
            <a href="tel:+919355626174" className="hover:text-yellow-300">+91 93556 26174</a>
          </p>
          <p className="flex items-center text-gray-200 gap-2">
            <FaEnvelope className="text-yellow-400" />
            <a href="mailto:mrsteelfabrication9355@gmail.com" className="hover:text-yellow-300">mrsteelfabrication9355@gmail.com</a>
          </p>
          <p className="flex items-center text-gray-200 gap-2">
            <FaWhatsapp className="text-green-400 animate-bounce" />
            <a href="https://wa.me/919355626174" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
              WhatsApp Us
            </a>
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Workshop Address</h4>
          <p className="flex gap-2 text-gray-200 items-start text-sm">
            <FaMapMarkerAlt className="text-red-400 mt-1" />
            Rose City Market, Near Gagan Public School & Xtreme Gym, Greater Noida West – 201009
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 text-center text-xs text-gray-300"
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          <span>© {currentYear} MR Steel Fabrication. All rights reserved.</span>
          <span className="flex items-center gap-1">
            <FaUserTie className="text-yellow-400" />
            Developed by
            <span className="text-white font-semibold ml-1">Sheikh Akhlaque</span> —
            <a href="tel:+917352460579" className="text-yellow-400 hover:underline ml-1">+91 73524 60579</a>
          </span>
        </div>
        <p className="text-xs mt-1 italic text-gray-400">
          (For development inquiries only. Please call, no messages.)
        </p>
      </motion.div>
    </footer>
  );
}

export default Footer;
