import axios from "axios";

const API_URL = "https://localhost:7002/api/information";

export async function getAllInformation() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function createInformation(data) {
  const response = await axios.post(API_URL, data);
  return response.data;
}

export async function updateInformation(id, data) {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
}

export async function deleteInformation(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}