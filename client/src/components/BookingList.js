import React from 'react';

const BookingList = ({ bookings, isOwner, onStatusUpdate }) => {
  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await onStatusUpdate(bookingId, newStatus);
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking._id} className="mb-4 p-4 border rounded">
          <p>
            <strong>Service:</strong> 
            {booking.service && booking.service.name ? booking.service.name : 'Service not available'}
          </p>
          <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          {isOwner && (
            <div className="mt-2">
              <button
                onClick={() => handleStatusUpdate(booking._id, 'ready for delivery')}
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
              >
                Mark Ready for Delivery
              </button>
              <button
                onClick={() => handleStatusUpdate(booking._id, 'completed')}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Mark Completed
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingList;
