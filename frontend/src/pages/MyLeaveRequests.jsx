import { useEffect, useState } from "react";
import api from "../services/api";

function MyLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const usernameResponse = await api.get(
        `/auth/username?token=${token}`
      );

      const username = usernameResponse.data;

      const userResponse = await api.get(
        `/users/username/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const employeeId =
        userResponse.data.employee.id;

      const leaveResponse = await api.get(
        "/leave-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const myLeaves = leaveResponse.data.filter(
        (leave) =>
          leave.employee &&
          leave.employee.id === employeeId
      );

      setLeaveRequests(myLeaves);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          My Leave Requests
        </h1>

        <p className="text-slate-300 mt-1">
          View and track your leave request history
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Reason..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-80 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4">Start Date</th>
                <th className="p-4">End Date</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {leaveRequests
                .filter((leave) =>
                  leave.reason
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((leave) => (
                  <tr
                    key={leave.id}
                    className="border-b text-center hover:bg-slate-50 transition"
                  >
                    <td className="p-4">
                      {leave.startDate}
                    </td>

                    <td className="p-4">
                      {leave.endDate}
                    </td>

                    <td className="p-4">
                      {leave.reason}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                          leave.status === "APPROVED"
                            ? "bg-green-600"
                            : leave.status === "REJECTED"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {leave.status}
                      </span>
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

export default MyLeaveRequests;