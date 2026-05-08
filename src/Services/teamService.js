import axios from "axios";

const API_URL = "https://localhost:7005/api/team";

export async function getTeamMembers() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function updateTeamMember(id, data) {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
}

export async function deleteTeamMember(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}