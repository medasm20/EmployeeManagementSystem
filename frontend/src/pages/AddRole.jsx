import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function AddRole() {
  const navigate = useNavigate();

  const [role, setRole] = useState({
    roleName: "",
  });

  const handleChange = (e) => {
    setRole({
      roleName: e.target.value,
    });
  };

  const saveRole = async () => {
    if (!role.roleName.trim()) {
      toast.warning("Please enter role name");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.post("/roles", role, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Role Added Successfully");

      navigate("/roles");
    } catch (error) {
      console.error(error);
      toast.error("Failed To Add Role");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Add Role
        </h1>

        <p className="text-gray-500 mt-1">
          Create a new application role
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Role Name"
            value={role.roleName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={saveRole}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Save Role
          </button>

          <button
            onClick={() => navigate("/roles")}
            className="bg-gray-500 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRole;