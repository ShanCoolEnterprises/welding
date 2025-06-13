// BookingConfirmation.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { formData, designData } = state || {};

  if (!formData || !designData) {
    return <div className="text-center mt-10 text-red-500">No booking information available.</div>;
  }

  return (
    <div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-6"
    >
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-green-600 p-8 max-w-2xl w-full animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center animate-pulse">🎉 Booking Confirmed!</h1>
        <img src={designData.image} alt={designData.title} className="w-full h-64 object-cover rounded-xl mb-6 border border-green-400" />
        <div className="space-y-3 text-lg">
          <p><strong>Design:</strong> {designData.title}</p>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Mobile:</strong> {formData.mobile}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Message:</strong> {formData.message}</p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-green-700 font-semibold">📞 Need help? Call us at <strong>9355626174</strong></p>
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-green-700 hover:bg-green-800 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
      >
        OK
      </button>
    </div>
  );
};

export default BookingConfirmation;
