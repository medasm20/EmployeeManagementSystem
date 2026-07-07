import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: {
      id: "",
    },
  });

  useEffect(() => {
    fetchRoles();
    fetchUser();
  }, []);

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRoles(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed To Load Roles");
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed To Load User");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "username") {
      setUser({
        ...user,
        username: value,
      });
    }

    if (name === "email") {
      setUser({
        ...user,
        email: value,
      });
    }

    if (name === "password") {
      setUser({
        ...user,
        password: value,
      });
    }

    if (name === "roleId") {
      setUser({
        ...user,
        role: {
          id: Number(value),
        },
      });
    }
  };

  const updateUser = async () => {
    if (
      !user.username ||
      !user.email ||
      !user.role?.id
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.put(`/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User Updated Successfully");

      navigate("/users");
    } catch (error) {
      console.error(error);
      toast.error("Failed To Update User");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Edit User
        </h1>

        <p className="text-gray-500 mt-1">
          Update user account information
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="roleId"
            value={user.role?.id || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              Select Role
            </option>

            {roles.map((role) => (
              <option
                key={role.id}
                value={role.id}
              >
                {role.roleName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={updateUser}
            className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
          >
            Update User
          </button>

          <button
            onClick={() => navigate("/users")}
            className="bg-gray-500 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;