
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const demoAdmin = {
  id: 1,
  name: "ShopHub Admin",
  email: "admin@shophub.com",
  password: "Admin123!",
  role: "admin",
};

function getUsers() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const adminExists = users.some(
    (item) => item.email.toLowerCase() === demoAdmin.email
  );

  if (!adminExists) {
    users.push(demoAdmin);
    localStorage.setItem("users", JSON.stringify(users));
  }

  return users;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    getUsers();

    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function register(name, email, password) {
    const users = getUsers();

    const existingUser = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "user",
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    const loggedInUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);

    return loggedInUser;
  }

  function login(email, password) {
    const users = getUsers();

    const foundUser = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password.");
    }

    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);

    return loggedInUser;
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}
