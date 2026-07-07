import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function EditRole() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState({
    roleName: "",
  });

  useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRole(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed To Load Role");
    }
  };

  const handleChange = (e) => {
    setRole({
      ...role,
      roleName: e.target.value,
    });
  };

  const updateRole = async () => {
    if (!role.roleName.trim()) {
      toast.warning("Please enter role name");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.put(`/roles/${id}`, role, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Role Updated Successfully");

      navigate("/roles");
    } catch (error) {
      console.error(error);
      toast.error("Failed To Update Role");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Edit Role
        </h1>

        <p className="text-gray-500 mt-1">
          Update role information and permissions
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <input
          type="text"
          placeholder="Role Name"
          value={role.roleName}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={updateRole}
            className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
          >
            Update Role
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

export default EditRole;