import { useNavigate, useLocation } from "react-router-dom";

import {
  DocumentTextIcon,
  UsersIcon,
  FolderIcon,
} from "@heroicons/react/24/solid";

function ManagerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#020617]">
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">
          Employee Management System
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="flex">
        <div className="w-64 bg-slate-900 text-white min-h-screen shadow-xl">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-bold">
              EMS Manager
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Manager Portal
            </p>
          </div>

          <ul className="p-4 space-y-2">
            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/manager"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/manager")}
            >
              🏠 Dashboard
            </li>

            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/leave-requests"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/leave-requests")}
            >
              📝 Leave Requests
            </li>

            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/manager-employees"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/manager-employees")}
            >
              👥 Employees
            </li>

            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/manager-projects"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/manager-projects")}
            >
              📁 Projects
            </li>
          </ul>
        </div>

        <div className="flex-1 p-6 bg-[#020617]">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Manager Dashboard
          </h1>

          <div className="mb-8 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 text-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-2">
              Welcome Back, Manager 👋
            </h2>

            <p className="text-green-100">
              Review leave requests, monitor employees,
              and oversee project activities from one place.
            </p>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => navigate("/leave-requests")}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 shadow"
            >
              Review Leaves
            </button>

            <button
              onClick={() => navigate("/manager-employees")}
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 shadow"
            >
              View Employees
            </button>

            <button
              onClick={() => navigate("/manager-projects")}
              className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 shadow"
            >
              View Projects
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div
              onClick={() => navigate("/leave-requests")}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>Leave Requests</p>

                  <h2 className="text-3xl font-bold mt-2">
                    Manage
                  </h2>
                </div>

                <DocumentTextIcon className="h-12 w-12" />
              </div>
            </div>

            <div
              onClick={() => navigate("/manager-employees")}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>Employees</p>

                  <h2 className="text-3xl font-bold mt-2">
                    View
                  </h2>
                </div>

                <UsersIcon className="h-12 w-12" />
              </div>
            </div>

            <div
              onClick={() => navigate("/manager-projects")}
              className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>Projects</p>

                  <h2 className="text-3xl font-bold mt-2">
                    View
                  </h2>
                </div>

                <FolderIcon className="h-12 w-12" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 text-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Manager Overview
            </h2>

            <p className="text-slate-300 leading-relaxed">
              Use this dashboard to review leave requests,
              monitor employee information, and keep track of
              project activities. Quick actions are available
              above for faster navigation throughout the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;