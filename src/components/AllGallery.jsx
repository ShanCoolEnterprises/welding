import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import weldingData from '../data/Gallery.json';
import BookingModal from './BookingModal';
function AllGallery() {
  const [designs, setDesigns] = useState([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const imgRef = useRef(null);
  const touchStartDistanceRef = useRef(null);
  const touchStartZoomRef = useRef(null);

  const designsPerPage = 16;

  useEffect(() => {
    setDesigns(weldingData);
  }, []);

  const totalPages = Math.ceil(designs.length / designsPerPage);

  const currentDesigns = designs.slice(
    (currentPage - 1) * designsPerPage,
    currentPage * designsPerPage
  );

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

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));

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
      } catch (err) {
        alert('Image download failed. Please try again.');
        console.error(err);
      }
    }
  };

  const getTouchDistance = (e) => {
    const [t1, t2] = e.touches;
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx ** 2 + dy ** 2);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      touchStartDistanceRef.current = getTouchDistance(e);
      touchStartZoomRef.current = zoomLevel;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e);
      const scaleFactor = distance / touchStartDistanceRef.current;
      const newZoom = touchStartZoomRef.current * scaleFactor;
      setZoomLevel(Math.max(0.5, Math.min(newZoom, 3)));
    }
  };

  const handleTouchEnd = () => {
    touchStartDistanceRef.current = null;
    touchStartZoomRef.current = null;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Welding Design Gallery | Mr Steel Fabrication</title>
        <meta
          name="description"
          content="Explore the latest metal welding designs from Mr Steel Fabrication — expert in gate, railing, grill, SS, and aluminium fabrication services in Noida."
        />
        <meta
          name="keywords"
          content="Mr Steel Fabrication, Welding Design, Metal Fabrication, SS Railing, Grill Design, Aluminium Welding, Noida Fabricator"
        />
        <link rel="canonical" href="https://acrepairing.in/all-gallery" />
      </Helmet>

      <section className="py-8 px-2 bg-gray-100 relative">
        <div className="max-w-8xl mx-auto">
          <Link
            to="/"
            className="absolute top-4 left-4 flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>

          <h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welding Design Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentDesigns.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
      
              >
                <img
                  src={item.image}
                  alt={`Welding Design - ${item.title}`}
                  className="w-full h-52 object-cover cursor-pointer"
                  onClick={() => openImageModal(item)}
                  loading="lazy"
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
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Booking Modal */}
        {bookingModalOpen && selectedDesign && (
          <BookingModal isOpen={bookingModalOpen} onClose={closeBookingModal} designData={selectedDesign} />
        )}

        {/* Image Modal */}
        {imageModalOpen && selectedDesign && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300"
              aria-label="Close Image Viewer"
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
                alt={selectedDesign.title}
                className="max-w-full max-h-[80vh] object-contain select-none"
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease-in-out' }}
              />
            </div>
            <div className="absolute bottom-4 flex justify-center gap-3">
              <button onClick={handleZoomIn} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black">
                Zoom In
              </button>
              <button onClick={handleZoomOut} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black">
                Zoom Out
              </button>
              <button onClick={handleDownload} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Download
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default AllGallery;
