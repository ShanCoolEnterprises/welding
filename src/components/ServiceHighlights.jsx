import { FaTools, FaClock, FaCheckCircle } from 'react-icons/fa';

const ServiceHighlights = () => {
  const highlights = [
    {
      icon: <FaTools className="text-4xl text-white" />,
      title: "No Visiting Charge",
      description: "Free inspection & measurement at your doorstep.",
    },
    {
      icon: <FaClock className="text-4xl text-white" />,
      title: "24/7 Service",
      description: "Round-the-clock availability for all your needs.",
    },
    {
      icon: <FaCheckCircle className="text-4xl text-white" />,
      title: "High Quality Work",
      description: "Unmatched precision with premium-grade materials.",
    },
  ];

  return (
    <section className="relative py-8 px-4 bg-[#0f172a] text-white overflow-hidden">
      {/* Background Blur Circles */}
      <div className="absolute w-72 h-72 bg-indigo-600/30 rounded-full top-0 -left-10 blur-3xl opacity-40"></div>
      <div className="absolute w-72 h-72 bg-blue-400/20 rounded-full bottom-0 -right-10 blur-2xl opacity-30"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Our Service Promise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md border border-gray-700 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-full border border-white/10 backdrop-blur-lg">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center text-white mb-2 tracking-wide">
                {item.title}
              </h3>
              <p className="text-center text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
