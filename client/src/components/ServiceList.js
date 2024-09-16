import React, { useState, useEffect } from 'react';
import { getServices } from '../services/api';

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <div key={service._id} className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">{service.name}</h3>
          <p className="text-gray-600 mb-2">{service.description}</p>
          <p className="text-blue-600 font-bold">${service.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;