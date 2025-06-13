import React, { useState } from 'react';
import Modal from 'react-modal';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const BookingModal = ({ isOpen, onClose, designData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      design_title: designData.title,
      design_image: designData.image,
      to_email: formData.email,
    };

    emailjs.send('service_xsguv4x', 'template_b3ntrnx', payload, 'cUIzSPzUd67AxzQFK')
      .then(() => {
        emailjs.send('service_xsguv4x', 'template_clgm49n', payload, 'cUIzSPzUd67AxzQFK')
          .then(() => {
            setLoading(false);
            navigate('/booking-confirmation', { state: { formData, designData } });
          })
          .catch(() => {
            setLoading(false);
            alert('User email failed!');
          });
      })
      .catch(() => {
        setLoading(false);
        alert('Admin email failed!');
      });
  };

  const reset = () => {
    setFormData({ name: '', email: '', mobile: '', address: '', message: '' });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={reset}
      className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-2xl border mx-auto animate-fade-in"
      overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center h-60 space-y-4">
          <div className="border-4 border-green-500 border-t-transparent w-12 h-12 rounded-full animate-spin"></div>
          <p className="text-green-700 font-semibold text-lg animate-pulse">Submitting your booking...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Book: {designData.title}</h2>
          <img
            src={designData.image}
            alt={designData.title}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            value={formData.name}
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            value={formData.mobile}
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="address"
            placeholder="Full Address"
            onChange={handleChange}
            value={formData.address}
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="message"
            placeholder="Message (Optional)"
            onChange={handleChange}
            value={formData.message}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90"
          >
            Book Now
          </button>
        </form>
      )}
    </Modal>
  );
};

export default BookingModal;
