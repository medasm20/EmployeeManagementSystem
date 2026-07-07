import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
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
    }
  };

  const deleteRole = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this role?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Role Deleted Successfully");
      fetchRoles();
    } catch (error) {
      console.error(error);
      alert("Failed To Delete Role");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Roles
          </h1>

          <p className="text-slate-300 mt-1">
            Manage application roles and permissions
          </p>
        </div>

        <button
          onClick={() => navigate("/add-role")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Role
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Role..."
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
                <th className="p-4">Role Name</th>
                <th className="p-4">Edit</th>
                <th className="p-4">Delete</th>
              </tr>
            </thead>

            <tbody>
              {roles
                .filter((role) =>
                  role.roleName
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((role) => (
                  <tr
                    key={role.id}
                    className="border-b text-center hover:bg-slate-50 transition"
                  >
                    <td className="p-4">
                      {role.id}
                    </td>

                    <td className="p-4">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                        {role.roleName}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          navigate(`/edit-role/${role.id}`)
                        }
                        className="bg-amber-500 text-white px-4 py-2 rounded-lg shadow hover:bg-amber-600 transition"
                      >
                        Edit
                      </button>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          deleteRole(role.id)
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

export default Roles;