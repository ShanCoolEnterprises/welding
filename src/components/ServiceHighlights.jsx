import { motion } from 'framer-motion';

const ServiceHighlights = () => {
  const highlights = [
    { title: "No Visiting Charge", description: "Free Visit in Inspection and Measurement"},
    { title: "24/7 Service", description: "We Are 24/7 Service to Serve You"},
    { title: "High Quality Work", description: "High Level Quality and Products"},
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{highlight.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;