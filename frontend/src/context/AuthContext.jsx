import { createContext, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      console.log("SENDING:", email, password);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("RESPONSE:", res.data);

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      return true;

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};