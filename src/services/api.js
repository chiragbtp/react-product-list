// services/api.js
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products'; // Replace with actual API

export const fetchProducts = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=10`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
