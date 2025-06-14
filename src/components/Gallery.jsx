import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import BookingModal from './BookingModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Gallery() {
  const [designs, setDesigns] = useState([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  useEffect(() => {
    const topDesigns = [
      {
        image: 'https://thumbs.dreamstime.com/b/magnificent-wrought-iron-gates-ornamental-forging-forged-elements-close-up-magnificent-wrought-iron-gates-ornamental-forging-145098503.jpg?w=768',
        title: 'Modern Steel Gate',
        description: 'Sleek and stylish modern steel gate design for urban homes.',
      },
      {
        image: 'https://thumbs.dreamstime.com/b/interior-warehouse-closed-gates-modern-realistic-illustration-empty-storage-room-factory-shop-commercial-garage-315156600.jpg?w=992',
        title: 'Fancy Balcony Grill',
        description: 'Decorative balcony grill with intricate design and strong build.',
      },
      {
        image: 'https://cdn.pixabay.com/photo/2019/05/10/20/08/fence-4194398_1280.jpg',
        title: 'Premium Main Gate',
        description: 'Robust and elegant main gate design made for durability and charm.',
      },
      {
        image: 'https://thumbs.dreamstime.com/b/modern-light-forged-gates-19378935.jpg?w=768',
        title: 'SS Stair Railing',
        description: 'Stylish stainless steel railing for stairs and balconies.',
      },
      {
        image: 'https://thumbs.dreamstime.com/b/empty-hallway-modern-building-closed-doors-steel-lift-gates-realistic-illustration-315498522.jpg?w=992',
        title: 'Designer Entry Gate',
        description: 'Eye-catching designer gate perfect for bungalows and villas.',
      },
    ];

    setDesigns(
      topDesigns.map((item) => ({
        ...item,
        onClick: () => openBookingModal(item),
      }))
    );
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
    <section className={`relative w-full overflow-hidden z-0 transition-opacity duration-300 ${bookingModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <Helmet>
        <title>Top 5 Welding Designs | Mr Steel Fabrication</title>
        <meta name="description" content="Explore the top 5 trending steel welding designs with detailed descriptions by Mr Steel Fabrication." />
        <link rel="canonical" href="https://acrepairing.in/gallery" />
      </Helmet>

      <Swiper
        modules={[Autoplay, Navigation, EffectFade]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        effect="fade"
        loop
        autoplay={{ delay: 4000 }}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
      >
        {designs.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 flex items-center justify-center px-4">
                <div className="text-center max-w-lg text-white z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold drop-shadow-xl mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base font-light drop-shadow-md mb-4">
                    {item.description}
                  </p>
                  <button
                    onClick={item.onClick}
                    className="mt-2 inline-block bg-white text-blue-700 px-6 py-2 rounded-full shadow-lg text-sm transition transform hover:scale-105"
                  >
                    Book This Design
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 p-2 rounded-full transition-all duration-300 ease-in-out">
          <ChevronLeft className="w-5 h-5 text-white" />
        </div>
        <div className="swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 p-2 rounded-full transition-all duration-300 ease-in-out">
          <ChevronRight className="w-5 h-5 text-white" />
        </div>
      </Swiper>

      {bookingModalOpen && selectedDesign && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center transition-transform">
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
