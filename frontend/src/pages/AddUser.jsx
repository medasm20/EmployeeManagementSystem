import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function AddUser() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: {
      id: "",
    },
    employee: {
      id: "",
    },
  });

  useEffect(() => {
    fetchRoles();
    fetchEmployees();
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

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed To Load Employees");
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

    if (name === "employeeId") {
      setUser({
        ...user,
        employee: {
          id: Number(value),
        },
      });
    }
  };

  const saveUser = async () => {
    if (
      !user.username ||
      !user.email ||
      !user.password ||
      !user.role.id ||
      !user.employee.id
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.post("/users", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User Added Successfully");

      navigate("/users");
    } catch (error) {
      console.error(error);
      toast.error("Failed To Add User");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Add User
        </h1>

        <p className="text-gray-500 mt-1">
          Create a new system user account
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="roleId"
            value={user.role.id}
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

          <select
            name="employeeId"
            value={user.employee.id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              Select Employee
            </option>

            {employees.map((employee) => (
              <option
                key={employee.id}
                value={employee.id}
              >
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={saveUser}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Save User
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

export default AddUser;