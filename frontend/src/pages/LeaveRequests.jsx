import { useEffect, useState } from "react";
import api from "../services/api";

function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/leave-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeaveRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (leave, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/leave-requests/${leave.id}`,
        {
          ...leave,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Leave Request ${status}`);
      fetchLeaveRequests();
    } catch (error) {
      console.error(error);
      alert("Failed To Update Leave Request");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Leave Requests
          </h1>

          <p className="text-slate-300 mt-1">
            Review, approve, and manage employee leave requests
          </p>
        </div>
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
                <th className="p-4">Employee</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">End Date</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Status</th>
                <th className="p-4">Approve</th>
                <th className="p-4">Reject</th>
              </tr>
            </thead>

            <tbody>
              {leaveRequests
                .filter((leave) =>
                  (
                    leave.employee?.firstName +
                    " " +
                    leave.employee?.lastName
                  )
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((leave) => (
                  <tr
                    key={leave.id}
                    className="border-b text-center hover:bg-slate-50 transition"
                  >
                    <td className="p-4">
                      {leave.id}
                    </td>

                    <td className="p-4 font-medium">
                      {leave.employee
                        ? `${leave.employee.firstName} ${leave.employee.lastName}`
                        : "N/A"}
                    </td>

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

                    <td className="p-4">
                      <button
                        onClick={() =>
                          updateStatus(leave, "APPROVED")
                        }
                        disabled={leave.status === "APPROVED"}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Approve
                      </button>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          updateStatus(leave, "REJECTED")
                        }
                        disabled={leave.status === "REJECTED"}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Reject
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

export default LeaveRequests;