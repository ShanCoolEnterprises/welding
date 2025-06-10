// BookingModal.js
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
      className="bg-white p-6 rounded-lg max-w-lg mx-auto shadow-xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center h-60 space-y-4">
          <div className="loader border-4 border-green-500 border-t-transparent w-12 h-12 rounded-full animate-spin"></div>
          <p className="text-green-700 font-semibold text-lg animate-pulse">Submitting your booking...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Book: {designData.title}</h2>
          <img src={designData.image} alt={designData.title} className="w-full h-40 object-cover rounded mb-4" />
          <input name="name" placeholder="Name" onChange={handleChange} value={formData.name} className="w-full mb-2 p-2 border rounded" required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email} className="w-full mb-2 p-2 border rounded" required />
          <input name="mobile" placeholder="Mobile Number" onChange={handleChange} value={formData.mobile} className="w-full mb-2 p-2 border rounded" required />
          <input name="address" placeholder="Address" onChange={handleChange} value={formData.address} className="w-full mb-2 p-2 border rounded" required />
          <textarea name="message" placeholder="Message" onChange={handleChange} value={formData.message} className="w-full mb-4 p-2 border rounded" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Submit</button>
        </form>
      )}
    </Modal>
  );
};

export default BookingModal;