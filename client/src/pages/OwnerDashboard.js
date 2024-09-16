import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BookingList from '../components/BookingList';
import { getBookings, updateBookingStatus } from '../services/api';

const OwnerDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>
      <BookingList bookings={bookings} isOwner={true} onStatusUpdate={handleStatusUpdate} />
    </Layout>
  );
};

export default OwnerDashboard;