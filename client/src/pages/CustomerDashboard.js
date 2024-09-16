import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';
import { getServices, getBookings, createBooking } from '../services/api';

const CustomerDashboard = () => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchServices();
    fetchBookings();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleBookingCreated = () => {
    fetchBookings();
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BookingForm services={services} onBookingCreated={handleBookingCreated} />
        <BookingList bookings={bookings} isOwner={false} />
      </div>
    </Layout>
  );
};

export default CustomerDashboard;