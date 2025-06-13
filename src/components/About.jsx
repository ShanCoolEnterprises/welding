import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaUsers, FaTools, FaStar, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

function About() {
  const stats = [
    { icon: <FaUsers />, value: '1000+', label: 'Happy Clients' },
    { icon: <FaTools />, value: '10+', label: 'Years of Experience' },
    { icon: <FaStar />, value: '4.9/5', label: 'Customer Rating' },
  ];

  return (
    <section className="py-8 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <Helmet>
        <title>MR Steel Fabrication</title>
        <meta name="description" content="MR Steel Fabrication in Greater Noida West specializes in SS & MS Gates, Balcony Covering, Shutters, Grills, and Aluminium Work. Trusted for quality fabrication work." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4 relative">
            About MR Steel Fabrication
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-24 h-1 bg-red-500 rounded-full"></span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto font-light mb-12">
            We specialize in SS Gates, MS Gates, Balcony Covering, SS Railings, Shutter, Grills, Game Stand, Tandoor Shade, and all types of Aluminium Work. Trusted by 1000+ clients across Greater Noida for our strength, style, and precision fabrication.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-lg text-center hover:scale-105 transition"
            >
              <div className="text-4xl text-red-400 mb-3">{stat.icon}</div>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-lg font-light">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white bg-opacity-5 rounded-xl p-8 text-center max-w-4xl mx-auto backdrop-blur-md shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
          <div className="flex flex-col gap-4 text-lg font-light">
            <div className="flex items-center justify-center gap-2">
              <FaMapMarkerAlt className="text-red-400" />
              Rose City Market, Near Gagan Public School & Xtreme Gym, Greater Noida West – 201009
            </div>
            <div className="flex items-center justify-center gap-2">
              <FaPhoneAlt className="text-green-400" />
              <a href="tel:9355626174" className="hover:underline">+91 93556 26174</a>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FaEnvelope className="text-blue-400" />
              <a href="mailto:mrsteelfabrication9355@gmail.com" className="hover:underline">
                mrsteelfabrication9355@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
