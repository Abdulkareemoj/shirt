// Mock user database
const mockUsers = [
  {
    id: 1,
    username: "testuser",
    email: "test@example.com",
    password: "password123", // In a real app, never store passwords in plain text
  },
];

// Simulate API delay
const simulateDelay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock register service
export async function registerUserService(userData: {
  username: string;
  email: string;
  password: string;
}) {
  await simulateDelay();

  // Check if user already exists
  const userExists = mockUsers.some(
    (user) =>
      user.email === userData.email || user.username === userData.username
  );

  if (userExists) {
    // Simulate API error response
    throw {
      response: {
        data: {
          error: {
            message: "Email or username already exists",
          },
        },
      },
    };
  }

  // Create new user
  const newUser = {
    id: mockUsers.length + 1,
    username: userData.username,
    email: userData.email,
    password: userData.password,
  };

  mockUsers.push(newUser);

  // Return mock response
  return {
    jwt: "mock-jwt-token-" + Math.random().toString(36).substring(2),
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
  };
}

// Mock login service
export async function loginUserService(userData: {
  identifier: string;
  password: string;
}) {
  await simulateDelay();

  // Find user by email or username
  const user = mockUsers.find(
    (user) =>
      user.email === userData.identifier ||
      user.username === userData.identifier
  );

  // Check if user exists and password matches
  if (!user || user.password !== userData.password) {
    // Simulate API error response
    throw {
      response: {
        data: {
          error: {
            message: "Invalid identifier or password",
          },
        },
      },
    };
  }

  // Return mock response
  return {
    jwt: "mock-jwt-token-" + Math.random().toString(36).substring(2),
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
}

// Mock forgot password service
export async function forgotPasswordService(email: string) {
  await simulateDelay();

  // Check if user exists
  const user = mockUsers.find((user) => user.email === email);

  if (!user) {
    // Simulate API error response
    throw {
      response: {
        data: {
          error: {
            message: "No user found with this email",
          },
        },
      },
    };
  }

  // In a real app, this would send an email
  console.log(`Password reset link would be sent to ${email}`);

  // Return mock response
  return {
    ok: true,
  };
}
