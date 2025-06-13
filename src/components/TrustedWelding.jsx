import { motion } from 'framer-motion';
import { Button } from '@mui/material';

const TrustedWelding = () => {
  return (
    <section className="py-8 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-yellow-100 dark:bg-yellow-900 p-8 rounded-lg flex flex-col md:flex-row items-center"
        >
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Trusted Welding Services <span className="text-primary">Doorstep</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-4">
                <img src="https://weldingwale.com/assets/img/slide/home-contract.jpg" alt="Home Building" className="w-12 h-12" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Home Building</h3>
                  <p className="text-gray-600 dark:text-gray-300">Fabrication & Maintenance</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <img src="https://weldingwale.com/assets/img/slide/corporate_contract.jpg" alt="Corporate" className="w-12 h-12" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Corporate</h3>
                  <p className="text-gray-600 dark:text-gray-300">Contracts</p>
                </div>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mt-6 md:mt-0"
          >
            <img src="https://weldingwale.com/assets/img/slide/poster.jpg" alt="Welder" className="w-full h-auto rounded-lg" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedWelding;