// src/services/fooddonation.js
import api from './api.jsx'; // Assuming api.jsx exports an axios instance or similar

// Create a new food donation
export const createFoodDonation = async (donationData) => {
  try {
    const response = await api.post('/api/food', donationData);
    return response.data;
  } catch (error) {
    console.error('Error creating food donation:', error);
    throw error;
  }
};

// Get all food donations
export const getFoodDonations = async () => {
  try {
    const response = await api.get('/api/food');
    return response.data;
  } catch (error) {
    console.error('Error fetching food donations:', error);
    throw error;
  }
};

// Get food donation by ID
export const getFoodDonationById = async (id) => {
  try {
    const response = await api.get(`/api/food/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching food donation:', error);
    throw error;
  }
};

// Update food donation
export const updateFoodDonation = async (id, donationData) => {
  try {
    const response = await api.put(`/api/food/${id}`, donationData);
    return response.data;
  } catch (error) {
    console.error('Error updating food donation:', error);
    throw error;
  }
};

// Delete food donation
export const deleteFoodDonation = async (id) => {
  try {
    const response = await api.delete(`/api/food/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting food donation:', error);
    throw error;
  }
};

// Get food donations by status (e.g., 'available', 'claimed', 'expired')
export const getFoodDonationsByStatus = async (status) => {
  try {
    const response = await api.get(`/api/food?status=${status}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching food donations by status:', error);
    throw error;
  }
};

// Get food donations by user/donor ID
export const getFoodDonationsByUser = async (userId) => {
  try {
    const response = await api.get(`/api/food/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user food donations:', error);
    throw error;
  }
};
