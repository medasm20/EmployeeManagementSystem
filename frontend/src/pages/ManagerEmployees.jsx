import { useEffect, useState } from "react";
import api from "../services/api";

function ManagerEmployees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

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
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Employees
        </h1>

        <p className="text-slate-300 mt-1">
          View employee information and records
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Employee..."
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
                <th className="p-4">First Name</th>
                <th className="p-4">Last Name</th>
                <th className="p-4">Email</th>
              </tr>
            </thead>

            <tbody>
              {employees
                .filter((employee) =>
                  `${employee.firstName} ${employee.lastName}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b text-center hover:bg-slate-50 transition"
                  >
                    <td className="p-4">{employee.id}</td>

                    <td className="p-4">
                      {employee.firstName}
                    </td>

                    <td className="p-4">
                      {employee.lastName}
                    </td>

                    <td className="p-4">
                      {employee.email}
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

export default ManagerEmployees;