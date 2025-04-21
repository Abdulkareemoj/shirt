// import axios from "axios";
import { getAuthToken } from "./get-token";

// Mock user database - same as in auth-service.ts
const mockUsers = [
  {
    id: 1,
    username: "testuser",
    email: "test@example.com",
    password: "password123", // In a real app, never store passwords in plain text
  },
];

// Function to get user data
export async function getUser() {
  const authToken = await getAuthToken();

  if (!authToken) {
    return null;
  }

  // For real API (when you have a backend)
  // if (import.meta.env.VITE_STRAPI_BASE_URL) {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_STRAPI_BASE_URL}/api/users/me`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Failed to fetch user data:", error);
  //     return null;
  //   }
  // }

  // For mock data (when no backend)
  // Extract user ID from token (in a real app, you'd decode the JWT)
  // Our mock tokens are in format "mock-jwt-token-[random]"
  const userDataString = localStorage.getItem("user");

  if (userDataString) {
    try {
      return JSON.parse(userDataString);
    } catch (e) {
      console.error("Failed to parse user data from localStorage");
      return null;
    }
  }

  // If no user found in localStorage but we have a token,
  // return a default mock user
  return mockUsers[0];
}
