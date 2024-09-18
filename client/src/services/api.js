import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const register = (userData) =>
  api.post("/users/register", userData).then((res) => res.data);

export const getServices = () =>
  api.get("/services").then((res) => res.data.data);

export const createService = (serviceData) =>
  api.post("/services", serviceData).then((res) => res.data.data);

export const createBooking = (bookingData) =>
  api.post("/bookings", bookingData).then((res) => res.data.data);

export const getBookings = () =>
  api.get("/bookings").then((res) => res.data.data);

export const updateBookingStatus = (bookingId, status) =>
  api
    .put(`/bookings/${bookingId}/status`, { status })
    .then((res) => res.data.data);

export const toggleServiceAvailability = (serviceId) =>
  api.patch(`/services/${serviceId}/availability`).then((res) => res.data.data);

export default api;
