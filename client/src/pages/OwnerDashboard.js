import React from 'react';
import Layout from '../components/Layout';
import BookingList from '../components/BookingList';
import ServiceManagement from '../components/ServiceManagement';
import { getBookings, updateBookingStatus } from '../services/api';
import { useEffect,useState } from 'react';

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
      <ServiceManagement />
      <BookingList bookings={bookings} isOwner={true} onStatusUpdate={handleStatusUpdate} />
    </Layout>
  );
};

export default OwnerDashboard;