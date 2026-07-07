import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function ApplyLeave() {
  const navigate = useNavigate();

  const [leaveRequest, setLeaveRequest] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setLeaveRequest({
      ...leaveRequest,
      [e.target.name]: e.target.value,
    });
  };

  const submitLeave = async () => {
    if (
      !leaveRequest.startDate ||
      !leaveRequest.endDate ||
      !leaveRequest.reason
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    if (leaveRequest.startDate > leaveRequest.endDate) {
      toast.warning("End date must be after start date");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Get logged in username
      const usernameResponse = await api.get(
        `/auth/username?token=${token}`
      );

      const username = usernameResponse.data;

      // Get user details including employee mapping
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

      const leaveData = {
        startDate: leaveRequest.startDate,
        endDate: leaveRequest.endDate,
        reason: leaveRequest.reason,
        employee: {
          id: employeeId,
        },
      };

      await api.post(
        "/leave-requests",
        leaveData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Leave Request Submitted Successfully"
      );

      navigate("/employee");
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed To Submit Leave Request"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Apply Leave
        </h1>

        <p className="text-slate-300 mt-1">
          Submit a leave request for approval
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={leaveRequest.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={leaveRequest.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Reason
            </label>

            <textarea
              name="reason"
              placeholder="Enter Leave Reason"
              value={leaveRequest.reason}
              onChange={handleChange}
              rows="5"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={submitLeave}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Submit Leave Request
          </button>

          <button
            onClick={() => navigate("/employee")}
            className="bg-gray-500 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyLeave;