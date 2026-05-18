import axios from "axios";

const API_URL = import.meta.env.VITE_AUTH_API_URL;

export async function loginUser(data) {
  const response = await axios.post(`${API_URL}/login`, data, {
    withCredentials: true,
  });

  return response.data;
}

export async function signupUser(data) {
  const response = await axios.post(`${API_URL}/signup`, data, {
    withCredentials: true,
  });

  return response.data;
}

export async function getCurrentUser() {
  const response = await axios.get(`${API_URL}/me`, {
    withCredentials: true,
  });

  return response.data;
}

export async function logoutUser() {
  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;

}

export async function deleteAuthUser(authUserId) {
  const response = await axios.delete(`${API_URL}/${authUserId}`, {
    withCredentials: true,
  });

  return response.data;
}