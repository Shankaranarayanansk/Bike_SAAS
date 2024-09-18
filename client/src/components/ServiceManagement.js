import React, { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService, toggleServiceAvailability } from '../services/api';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: 0 });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      await createService(newService);
      setNewService({ name: '', description: '', price: 0 });
      fetchServices();
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const handleToggleAvailability = async (serviceId) => {
    try {
      await toggleServiceAvailability(serviceId);
      fetchServices();
    } catch (error) {
      console.error('Error toggling service availability:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Services</h2>
      
      <form onSubmit={handleCreateService} className="mb-8">
        <input
          type="text"
          placeholder="Service Name"
          value={newService.name}
          onChange={(e) => setNewService({...newService, name: e.target.value})}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService({...newService, description: e.target.value})}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newService.price}
          onChange={(e) => setNewService({...newService, price: parseFloat(e.target.value)})}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Service</button>
      </form>

      <ul>
        {services.map((service) => (
          <li key={service._id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-semibold">{service.name}</h3>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <p>Status: {service.isAvailable ? 'Available' : 'Unavailable'}</p>
            <button
              onClick={() => handleToggleAvailability(service._id)}
              className={`mt-2 p-2 rounded ${service.isAvailable ? 'bg-red-500' : 'bg-green-500'} text-white`}
            >
              {service.isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceManagement;