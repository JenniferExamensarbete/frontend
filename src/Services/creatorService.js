import axios from "axios";

const API_URL = "https://localhost:7003/api/creators";

export async function getAllCreators() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function createCreator(data) {
  const response = await axios.post(API_URL, data);
  return response.data;
}

export async function updateCreator(id, data) {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
}

export async function deleteCreator(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}