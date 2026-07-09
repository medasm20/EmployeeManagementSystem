import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

import {
  UsersIcon,
  BuildingOfficeIcon,
  FolderIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [leaveRequestCount, setLeaveRequestCount] = useState(0);

  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  const [recentLeaves, setRecentLeaves] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const employees = await api.get("/employees", config);
      const departments = await api.get("/departments", config);
      const projects = await api.get("/projects", config);
      const leaveRequests = await api.get("/leave-requests", config);

      setEmployeeCount(employees.data.length);
      setDepartmentCount(departments.data.length);
      setProjectCount(projects.data.length);
      setLeaveRequestCount(leaveRequests.data.length);

      const approved = leaveRequests.data.filter(
        (leave) => leave.status === "APPROVED"
      ).length;

      const pending = leaveRequests.data.filter(
        (leave) => leave.status === "PENDING"
      ).length;

      const rejected = leaveRequests.data.filter(
        (leave) => leave.status === "REJECTED"
      ).length;

      setApprovedCount(approved);
      setPendingCount(pending);
      setRejectedCount(rejected);

      setRecentLeaves(
        [...leaveRequests.data]
          .sort((a, b) => b.id - a.id)
          .slice(0, 5)
      );
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  const barChartData = [
    { name: "Employees", count: employeeCount },
    { name: "Departments", count: departmentCount },
    { name: "Projects", count: projectCount },
    { name: "Leaves", count: leaveRequestCount },
  ];

  const pieChartData = [
    { name: "Approved", value: approvedCount },
    { name: "Pending", value: pendingCount },
    { name: "Rejected", value: rejectedCount },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <div
      className="min-h-screen transition"
      style={{
        backgroundColor:
          document.documentElement.classList.contains("dark")
            ? "#020617"
            : "#f8fafc",
      }}
    >
      {/* Navbar */}
      <div className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Employee Management System 2
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-slate-900 text-slate-900 dark:text-white min-h-screen shadow-xl">
          <ul className="p-4 space-y-2">
            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/admin"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/admin")}
            >
              🏠 Dashboard
            </li>

            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/employees"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/employees")}
            >
              👥 Employees
            </li>

            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/departments"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/departments")}
            >
              🏢 Departments
            </li>

            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/projects"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/projects")}
            >
              📁 Projects
            </li>

            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/users"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/users")}
            >
              👤 Users
            </li>

            <li
              className={`p-3 rounded-lg cursor-pointer transition ${
                location.pathname === "/roles"
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => navigate("/roles")}
            >
              🔐 Roles
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
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-slate-50 dark:bg-slate-950">
          <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            Admin Dashboard
          </h1>

          <div className="mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-2">
              Welcome Back, Admin 👋
            </h2>
            <p className="text-blue-100">
              Manage employees, departments, projects, users and leave requests
              from one place.
            </p>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => navigate("/add-employee")}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 shadow"
            >
              + Employee
            </button>

            <button
              onClick={() => navigate("/add-department")}
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 shadow"
            >
              + Department
            </button>

            <button
              onClick={() => navigate("/add-project")}
              className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 shadow"
            >
              + Project
            </button>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div
              onClick={() => navigate("/employees")}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>Employees</p>
                  <h2 className="text-4xl font-bold">{employeeCount}</h2>
                </div>
                <UsersIcon className="h-12 w-12" />
              </div>
            </div>

            <div
              onClick={() => navigate("/departments")}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>Departments</p>
                  <h2 className="text-4xl font-bold">{departmentCount}</h2>
                </div>
                <BuildingOfficeIcon className="h-12 w-12" />
              </div>
            </div>

            <div
              onClick={() => navigate("/projects")}
              className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>Projects</p>
                  <h2 className="text-4xl font-bold">{projectCount}</h2>
                </div>
                <FolderIcon className="h-12 w-12" />
              </div>
            </div>

            <div
              onClick={() => navigate("/leave-requests")}
              className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>Leave Requests</p>
                  <h2 className="text-4xl font-bold">{leaveRequestCount}</h2>
                </div>
                <DocumentTextIcon className="h-12 w-12" />
              </div>
            </div>
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow overflow-auto">
              <h2 className="text-xl font-semibold mb-4">
                Organization Statistics
              </h2>

              <BarChart width={500} height={300} data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            </div>

            <div className="bg-white dark:bg-slate-900 dark:text-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Leave Status Distribution
              </h2>

              <PieChart width={450} height={300}>
                <Pie data={pieChartData} dataKey="value" outerRadius={100} label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white dark:bg-slate-900 dark:text-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Recent Leave Requests
            </h2>

            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-slate-700">
                  <th className="p-3 text-left">Employee</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Reason</th>
                </tr>
              </thead>

              <tbody>
                {recentLeaves.map((leave) => (
                  <tr key={leave.id} className="border-b">
                    <td className="p-3">
                      {leave.employee
                        ? `${leave.employee.firstName} ${leave.employee.lastName}`
                        : "N/A"}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-white ${
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

                    <td className="p-3">{leave.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;