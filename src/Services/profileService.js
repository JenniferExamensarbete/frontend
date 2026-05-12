import axios from "axios";

const API_URL = import.meta.env.VITE_PROFILE_API_URL;

export async function getProfile(authUserId) {
  const response = await axios.get(`${API_URL}/${authUserId}`);
  return response.data;
}

export async function createProfile(data) {
  const response = await axios.post(API_URL, data);
  return response.data;
}

export async function updateProfile(authUserId, data) {
  const response = await axios.put(`${API_URL}/${authUserId}`, data);
  return response.data;
}