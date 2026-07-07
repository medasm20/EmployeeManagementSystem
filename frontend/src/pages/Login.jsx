import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      toast.warning("Please enter username and password");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      localStorage.setItem("role", role);

      toast.success("Login Successful");

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "MANAGER") {
        navigate("/manager");
      } else {
        navigate("/employee");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 items-center justify-center">
        <div>
          <h1 className="text-white text-7xl font-bold leading-tight">
            Employee
            <br />
            Management
            <br />
            System
          </h1>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center bg-slate-100 p-8">
        <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🏢</div>

            <h2 className="text-4xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to continue
            </p>
          </div>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 border border-slate-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border border-slate-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition"
          >
            Sign In
          </button>

          <p className="text-center text-slate-400 text-sm mt-6">
            Employee Management System © 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;