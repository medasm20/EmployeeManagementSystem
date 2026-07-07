import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDepartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDepartment = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/departments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Department Deleted Successfully");
      fetchDepartments();
    } catch (error) {
      console.error(error);
      alert("Failed To Delete Department");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Departments
          </h1>

          <p className="text-slate-300 mt-1">
            Manage department information and records
          </p>
        </div>

        <button
          onClick={() => navigate("/add-department")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Department
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Department Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">Edit</th>
                <th className="p-4">Delete</th>
              </tr>
            </thead>

            <tbody>
              {departments
                .filter((department) =>
                  department.departmentName
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((department) => (
                  <tr
                    key={department.id}
                    className="border-b text-center hover:bg-slate-50 transition"
                  >
                    <td className="p-4">
                      {department.id}
                    </td>

                    <td className="p-4 font-medium">
                      {department.departmentName}
                    </td>

                    <td className="p-4">
                      {department.description}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          navigate(
                            `/edit-department/${department.id}`
                          )
                        }
                        className="bg-amber-500 text-white px-4 py-2 rounded-lg shadow hover:bg-amber-600 transition"
                      >
                        Edit
                      </button>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          deleteDepartment(department.id)
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Departments;