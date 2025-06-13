import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import ServiceHighlights from './components/ServiceHighlights';
import OurServices from './components/OurServices';
import TrustedWelding from './components/TrustedWelding';
import MetalWeldingServices from './components/MetalWeldingServices';
import FurnitureProducts from './components/FurnitureProducts';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import AllDesignLink from './components/AllDesignLink';
import BookingConfirmation from './components/BookingConfirmation';
import About from './components/About';
import TermsAndConditions from './components/TermsAndConditions';
import BookingModal from './components/BookingModal';
import weldingData from './data/Gallery.json';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';


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

  const designsPerPage = 8;

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
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
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
        console.error('Error downloading image:', error);
        alert('Failed to download the image. Please try again.');
      }
    }
  };

  const getTouchDistance = (e) => {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-8 px-2 bg-gray-100 relative">
      <div className="max-w-8xl mx-auto">
        <Link
          to="/"
          className="absolute top-4 left-4 flex items-center text-blue-600 hover:text-blue-800 font-semibold"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Home
        </Link>
        <h2 className="text-3xl font-bold text-center mb-8">Welding Design Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentDesigns.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.title}
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
            className="absolute top-4 right-4 z-50 text-white text-4xl font-bold bg-transparent hover:text-gray-300 focus:outline-none"
          >
            ×
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

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/all-gallery', '/booking-confirmation'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Helmet>
                <title>MR Steel Fabrication | Premium Welding & Metal Furniture in Noida</title>
                <meta
                  name="description"
                  content="MR Steel Fabrication offers top-class welding services, custom metal furniture, and steel fabrication in Noida. Contact us for durable and stylish metal solutions."
                />
                <meta
                  name="keywords"
                  content="MR Steel Fabrication, welding services Noida, metal furniture, custom steel fabrication, Noida metal work, industrial welding, Noida iron furniture"
                />
                <meta property="og:title" content="MR Steel Fabrication | Welding & Metal Furniture Experts" />
                <meta
                  property="og:description"
                  content="Expert welding and premium metal furniture for homes and businesses in Noida. Trusted, durable, and elegant."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://acrepairing.in" />
                <meta property="og:image" content="https://acrepairing.in/assets/logo.png" />
              </Helmet>
              <Gallery />
              <AllDesignLink />
              <OurServices />
              <TrustedWelding />
              <MetalWeldingServices />
              <ServiceHighlights />
              <FurnitureProducts />
              <About />
              <Footer />
            </>
          }
        />
        <Route path="/ourservices" element={<OurServices />} />
        <Route path="/furniture" element={<FurnitureProducts />} />
        <Route path="/metal" element={<MetalWeldingServices />} />
        <Route path="/contact" element={<Footer />} />
        <Route path="/all-gallery" element={<AllGallery />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/term" element={<TermsAndConditions />} />
      </Routes>
      <motion.a
            href="https://wa.me/919355626174"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-2 right-3 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ scale: 1.1, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.9 }}
          >
            <FaWhatsapp className="text-3xl" />
          </motion.a>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;