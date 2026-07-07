import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function AddDepartment() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    departmentName: "",
    description: "",
  });

  const handleChange = (e) => {
    setDepartment({
      ...department,
      [e.target.name]: e.target.value,
    });
  };

  const saveDepartment = async () => {
    if (!department.departmentName || !department.description) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.post("/departments", department, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Department Added Successfully");

      navigate("/departments");
    } catch (error) {
      console.error(error);
      toast.error("Failed To Add Department");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Add Department
        </h1>

        <p className="text-gray-500 mt-1">
          Create a new department
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <div className="space-y-4">
          <input
            type="text"
            name="departmentName"
            placeholder="Department Name"
            value={department.departmentName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Department Description"
            value={department.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={saveDepartment}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Save Department
          </button>

          <button
            onClick={() => navigate("/departments")}
            className="bg-gray-500 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDepartment;