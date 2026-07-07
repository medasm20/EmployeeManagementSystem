import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

import ManagerEmployees from "./pages/ManagerEmployees";
import ManagerProjects from "./pages/ManagerProjects";

import Departments from "./pages/Departments";
import AddDepartment from "./pages/AddDepartment";
import EditDepartment from "./pages/EditDepartment";

import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";

import LeaveRequests from "./pages/LeaveRequests";
import ApplyLeave from "./pages/ApplyLeave";
import MyLeaveRequests from "./pages/MyLeaveRequests";
import MyProjects from "./pages/MyProjects";

import Profile from "./pages/Profile";

import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

import Roles from "./pages/Roles";
import AddRole from "./pages/AddRole";
import EditRole from "./pages/EditRole";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Dashboards */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager"
          element={
            <ProtectedRoute>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* Employees */}

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager-employees"
          element={
            <ProtectedRoute>
              <ManagerEmployees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-employee/:id"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />

        {/* Departments */}

        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <Departments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-department"
          element={
            <ProtectedRoute>
              <AddDepartment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-department/:id"
          element={
            <ProtectedRoute>
              <EditDepartment />
            </ProtectedRoute>
          }
        />

        {/* Projects */}

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager-projects"
          element={
            <ProtectedRoute>
              <ManagerProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-project"
          element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-project/:id"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />

        {/* Leave Requests */}

        <Route
          path="/leave-requests"
          element={
            <ProtectedRoute>
              <LeaveRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply-leave"
          element={
            <ProtectedRoute>
              <ApplyLeave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-leave-requests"
          element={
            <ProtectedRoute>
              <MyLeaveRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-projects"
          element={
            <ProtectedRoute>
              <MyProjects />
            </ProtectedRoute>
          }
        />

        {/* Profile */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Users - ADMIN ONLY */}

        <Route
          path="/users"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <Users />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/add-user"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <AddUser />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/edit-user/:id"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <EditUser />
            </RoleProtectedRoute>
          }
        />

        {/* Roles - ADMIN ONLY */}

        <Route
          path="/roles"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <Roles />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/add-role"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <AddRole />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/edit-role/:id"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <EditRole />
            </RoleProtectedRoute>
          }
        />

        {/* 404 */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;