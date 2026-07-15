import { useNavigate, useLocation } from "react-router-dom";

import {
  DocumentTextIcon,
  FolderIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

function EmployeeDashboard() {
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
              EMS Employee
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Employee Portal
            </p>
          </div>

          <ul className="p-4 space-y-2">
            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/employee"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/employee")}
            >
              🏠 Dashboard
            </li>

            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/apply-leave"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/apply-leave")}
            >
              📝 Apply Leave
            </li>

            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/my-leave-requests"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/my-leave-requests")}
            >
              📄 My Leave Requests
            </li>

            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/my-projects"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/my-projects")}
            >
              📁 My Projects
            </li>

            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/profile"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/profile")}
            >
              👤 Profile
            </li>
          </ul>
        </div>

        <div className="flex-1 p-6 bg-[#020617]">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Employee Dashboard
          </h1>

          <div className="mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-2">
              Welcome Back, Employee 👋
            </h2>

            <p className="text-blue-100">
              Apply for leave, track request status,
              view assigned projects, and manage your
              profile from one place.
            </p>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => navigate("/apply-leave")}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 shadow"
            >
              Apply Leave
            </button>

            <button
              onClick={() => navigate("/my-leave-requests")}
              className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 shadow"
            >
              My Requests
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 shadow"
            >
              My Profile
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div
              onClick={() => navigate("/my-leave-requests")}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>My Leave Requests</p>

                  <h2 className="text-3xl font-bold mt-2">
                    View
                  </h2>
                </div>

                <DocumentTextIcon className="h-12 w-12" />
              </div>
            </div>

            <div
              onClick={() => navigate("/my-projects")}
              className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>Assigned Projects</p>

                  <h2 className="text-3xl font-bold mt-2">
                    View
                  </h2>
                </div>

                <FolderIcon className="h-12 w-12" />
              </div>
            </div>

            <div
              onClick={() => navigate("/profile")}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>Profile</p>

                  <h2 className="text-3xl font-bold mt-2">
                    View
                  </h2>
                </div>

                <UserCircleIcon className="h-12 w-12" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 text-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Employee Overview
            </h2>

            <p className="text-slate-300 leading-relaxed">
              Use this portal to apply for leave requests,
              monitor leave history, view assigned projects,
              and keep your profile information up to date.
              Quick actions above provide easier access to
              your most frequently used features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;