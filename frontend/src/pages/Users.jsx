import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User Deleted Successfully");
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Failed To Delete User");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Users
          </h1>

          <p className="text-slate-300 mt-1">
            Manage system users and access control
          </p>
        </div>

        <button
          onClick={() => navigate("/add-user")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search User..."
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
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Edit</th>
                <th className="p-4">Delete</th>
              </tr>
            </thead>

            <tbody>
              {users
                .filter((user) =>
                  (
                    user.username +
                    " " +
                    user.email +
                    " " +
                    (user.role?.roleName || "")
                  )
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((user) => (
                  <tr
                    key={user.id}
                    className="border-b text-center hover:bg-slate-50 transition"
                  >
                    <td className="p-4">
                      {user.id}
                    </td>

                    <td className="p-4 font-medium">
                      {user.username}
                    </td>

                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {user.role?.roleName}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          navigate(`/edit-user/${user.id}`)
                        }
                        className="bg-amber-500 text-white px-4 py-2 rounded-lg shadow hover:bg-amber-600 transition"
                      >
                        Edit
                      </button>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          deleteUser(user.id)
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

export default Users;