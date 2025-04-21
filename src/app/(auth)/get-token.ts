// import Cookies from "js-cookie";

// // This function gets the auth token from either cookies or localStorage
// export async function getAuthToken() {
//   // Try to get from cookies first (original approach)
//   const cookieToken = Cookies.get("jwt");
//   if (cookieToken) {
//     return cookieToken;
//   }

//   // Fallback to localStorage (our mock approach)
//   const localToken = localStorage.getItem("token");
//   return localToken;
// }

// // Helper function to set token in both cookies and localStorage for compatibility
// export function setAuthToken(token: string) {
//   const config = {
//     expires: 7, // 7 days
//     path: "/",
//     secure: import.meta.env.PROD === true,
//   };

//   // Set in both places for compatibility
//   Cookies.set("jwt", token, config);
//   localStorage.setItem("token", token);
// }

// // Helper function to remove token from both cookies and localStorage
// export function removeAuthToken() {
//   Cookies.remove("jwt");
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
// }
