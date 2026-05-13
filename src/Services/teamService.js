import axios from "axios";

const API_URL = import.meta.env.VITE_TEAM_API_URL;

export async function getTeamMembers() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function createTeamMember(data) {
  const response = await axios.post(API_URL, data);
  return response.data;
}

export async function updateTeamMember(authUserId, data) {
  const response = await axios.put(`${API_URL}/${authUserId}`, data);
  return response.data;
}

export async function deleteTeamMember(authUserId) {
  const response = await axios.delete(`${API_URL}/${authUserId}`);
  return response.data;
}