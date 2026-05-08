import axios from "axios";

const API_URL = "https://localhost:7004/api/profile";

export async function getMyProfile() {
  const response = await axios.get(`${API_URL}/me`, {
    withCredentials: true,
  });

  return response.data;
}

export async function updateMyProfile(data) {
  const response = await axios.put(`${API_URL}/me`, data, {
    withCredentials: true,
  });

  return response.data;
}