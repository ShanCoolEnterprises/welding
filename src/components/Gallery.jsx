// Gallery.jsx 
import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import weldingData from '../data/Gallery.json';
import BookingModal from './BookingModal';
import './Gallery.css'; // Custom CSS for flip effect

function Gallery() {
  const [designs, setDesigns] = useState([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  useEffect(() => {
    setDesigns(weldingData);
  }, []);

  const openBookingModal = (design) => {
    setSelectedDesign(design);
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setSelectedDesign(null);
  };

  return (
    <section className={`py-7 px-2 bg-gray-100 transition-opacity duration-300 ${bookingModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <Helmet>
        <title>Welding Design Gallery | Mr Steel Fabrication</title>
        <meta
          name="description"
          content="Discover premium metal and steel welding designs by Mr Steel Fabrication."
        />
        <link rel="canonical" href="https://acrepairing.in/gallery" />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10"></h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {designs.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="flip-card">
                <div className="flip-inner">
                  <div className="flip-front">
                    <img
                      src={item.image}
                      alt={`Welding Design - ${item.title}`}
                      className="w-full h-52 object-cover rounded-xl shadow-md"
                    />
                  </div>
                  <div className="flip-back bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col items-center justify-center p-4 rounded-xl">
                    <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                    <button
                      onClick={() => openBookingModal(item)}
                      className="px-4 py-2 bg-white text-blue-700 rounded hover:bg-gray-100"
                    >
                      Book This Design
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {bookingModalOpen && selectedDesign && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center">
          <BookingModal
            isOpen={bookingModalOpen}
            onClose={closeBookingModal}
            designData={selectedDesign}
          />
        </div>
      )}
    </section>
  );
}

export default Gallery;