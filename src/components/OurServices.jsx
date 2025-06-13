import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import servicesData from '../data/services.json';
import BookingModal from './BookingModal';

const OurServices = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleBookClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Our Services | Mr Steel Fabrication</title>
        <meta
          name="description"
          content="Explore top-notch welding, steel fabrication, metal furniture, and repair services by Mr Steel Fabrication. Quality craftsmanship in Noida and Delhi NCR."
        />
        <meta
          name="keywords"
          content="Steel Fabrication Noida, Welding Services, Metal Furniture Design, Custom Steel Work, Mr Steel Fabrication, Fabricator in Noida, Fabrication Expert"
        />
        <link rel="canonical" href="https://acrepairing.in/services" />
      </Helmet>

      <section className="py-6 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white"
          >
            Our Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
                  {service.title}
                </h3>
                <button
                  onClick={() => handleBookClick(service)}
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  Book This Design
                </button>
              </div>
            ))}
          </div>

          {modalOpen && selectedItem && (
            <BookingModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              designData={selectedItem}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default OurServices;
