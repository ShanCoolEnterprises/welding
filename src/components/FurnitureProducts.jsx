import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import furnitureData from '../data/furnitureProducts.json';
import BookingModal from './BookingModal';

const FurnitureProducts = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleBookClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Metal & Steel Furniture in Noida, Greater Noida & Delhi NCR | Mr Steel Fabrication</title>
        <meta
          name="description"
          content="Explore modern metal & steel furniture from Mr Steel Fabrication. We offer stylish, durable, and custom furniture in Noida, Greater Noida & Delhi NCR."
        />
        <meta
          name="keywords"
          content="Steel Furniture in Noida, Metal Furniture Greater Noida, Custom Furniture Delhi NCR, Mr Steel Fabrication, Designer Furniture, Office & Home Furniture"
        />
        <link rel="canonical" href="https://acrepairing.in/furniture-products" />
      </Helmet>

      <section className="py-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white"
          >
            Metal & Steel Furniture Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {furnitureData.map((product, index) => (
              <div
                key={product.id}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300"

              >
                <img
                  src={product.image}
                  alt={`Furniture Design - ${product.title}`}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
                  {product.title}
                </h3>
                <button
                  onClick={() => handleBookClick(product)}
                  className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                  aria-label={`Book furniture design: ${product.title}`}
                >
                  Book This Design
                </button>
              </div>
            ))}
          </div>
        </div>

        {modalOpen && selectedItem && (
          <BookingModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            designData={selectedItem}
          />
        )}
      </section>
    </>
  );
};

export default FurnitureProducts;
