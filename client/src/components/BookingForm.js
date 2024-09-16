import React, { useState } from 'react';
import { createBooking } from '../services/api';

const BookingForm = ({ services, onBookingCreated }) => {
  const [formData, setFormData] = useState({
    service: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking(formData);
      onBookingCreated();
      setFormData({ service: '', date: '' });
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book a Service</h2>
      <div className="mb-4">
        <label htmlFor="service" className="block mb-2">Service</label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>{service.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block mb-2">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Book Service
      </button>
    </form>
  );
};

export default BookingForm;