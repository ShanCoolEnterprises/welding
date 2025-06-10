import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import weldingData from '../data/Gallery.json';
import BookingModal from './BookingModal';

function Gallery() {
  const [designs, setDesigns] = useState([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const imgRef = useRef(null);
  const touchStartDistanceRef = useRef(null);
  const touchStartZoomRef = useRef(null);

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

  const openImageModal = (design) => {
    setSelectedDesign(design);
    setImageModalOpen(true);
    setZoomLevel(1);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedDesign(null);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleDownload = async () => {
    if (selectedDesign) {
      try {
        const response = await fetch(selectedDesign.image);
        if (!response.ok) throw new Error('Failed to fetch image');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedDesign.title}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download error:', error);
        alert('Download failed. Try again.');
      }
    }
  };

  const getTouchDistance = (e) => {
    const [touch1, touch2] = e.touches;
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      touchStartDistanceRef.current = getTouchDistance(e);
      touchStartZoomRef.current = zoomLevel;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e);
      const scaleFactor = currentDistance / touchStartDistanceRef.current;
      const newZoomLevel = touchStartZoomRef.current * scaleFactor;
      setZoomLevel(Math.max(0.5, Math.min(newZoomLevel, 3)));
    }
  };

  const handleTouchEnd = () => {
    touchStartDistanceRef.current = null;
    touchStartZoomRef.current = null;
  };

  return (
    <section className="py-7 px-2 bg-gray-100">
      <Helmet>
        <title>Welding Design Gallery | Mr Steel Fabrication - Noida, Greater Noida, Delhi NCR</title>
        <meta
          name="description"
          content="Discover premium metal and steel welding designs by Mr Steel Fabrication. Serving Noida, Greater Noida & Delhi NCR. Book your custom welding now."
        />
        <meta
          name="keywords"
          content="Welding Design Gallery, Steel Fabrication Noida, Mr Steel Fabrication, Welding Greater Noida, Delhi NCR Metal Works, Custom Metal Design"
        />
        <link rel="canonical" href="https://acrepairing.in/gallery" />
      </Helmet>

      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-5">Welding Design Gallery</h2>
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
          {designs.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                  src={item.image}
                  alt={`Welding Design - ${item.title}`}
                  className="w-full h-52 object-cover cursor-pointer"
                  onClick={() => openImageModal(item)}
                />
                <div className="p-3 text-center">
                  <h3 className="text-md font-semibold text-gray-700">{item.title}</h3>
                  <button
                    onClick={() => openBookingModal(item)}
                    className="mt-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Book This Design
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {bookingModalOpen && selectedDesign && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={closeBookingModal}
          designData={selectedDesign}
        />
      )}

      {imageModalOpen && selectedDesign && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center">
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 z-50 text-white text-4xl font-bold hover:text-gray-300"
          >
            &times;
          </button>
          <div
            className="relative flex-1 w-full h-full flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              ref={imgRef}
              src={selectedDesign.image}
              alt={`Zoomed view of ${selectedDesign.title}`}
              className="max-w-full max-h-[80vh] object-contain select-none"
              style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s' }}
            />
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
            <button
              onClick={handleZoomIn}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
            >
              Zoom In
            </button>
            <button
              onClick={handleZoomOut}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
            >
              Zoom Out
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
