import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import servicesData from '../data/metalWeldingServices.json';
import BookingModal from './BookingModal';

const MetalWeldingServices = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleBookClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Metal Welding Services in Noida, Greater Noida & Delhi NCR | Mr Steel Fabrication</title>
        <meta
          name="description"
          content="Mr Steel Fabrication offers professional metal welding services in Noida, Greater Noida, and Delhi NCR. Get expert steel, iron, and aluminium welding today."
        />
        <meta
          name="keywords"
          content="Metal Welding in Noida, Welding Services Greater Noida, Steel Welding Delhi NCR, Mr Steel Fabrication, Aluminium Welding Expert, Iron Welding, Fabrication Services"
        />
        <link rel="canonical" href="https://acrepairing.in/metal-welding-services" />
      </Helmet>

      <section className="py-6 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white"
          >
            Metal Welding Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <img
                  src={service.image}
                  alt={`Welding Service - ${service.title}`}
                  className="w-full h-40 object-cover rounded-t-lg mb-4"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center mt-1">
                  {service.description}
                </p>
                <button
                  onClick={() => handleBookClick(service)}
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  aria-label={`Book welding service: ${service.title}`}
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

export default MetalWeldingServices;
