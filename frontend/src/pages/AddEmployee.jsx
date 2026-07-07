import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function AddEmployee() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [managers, setManagers] = useState([]);

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    salary: "",
    joiningDate: "",
    departmentId: "",
    roleId: "",
    projectId: "",
    managerId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [departmentRes, roleRes, projectRes, employeeRes] =
        await Promise.all([
          api.get("/departments", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          api.get("/roles", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          api.get("/projects", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          api.get("/employees", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

      setDepartments(departmentRes.data);
      setRoles(roleRes.data);
      setProjects(projectRes.data);
      setManagers(employeeRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed To Load Data");
    }
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const saveEmployee = async () => {
    if (
      !employee.firstName ||
      !employee.lastName ||
      !employee.email ||
      !employee.phone ||
      !employee.salary ||
      !employee.joiningDate
    ) {
      toast.warning("Please fill all mandatory fields");
      return;
    }

    const requestBody = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      salary: Number(employee.salary),
      joiningDate: employee.joiningDate,

      department: employee.departmentId
        ? { id: Number(employee.departmentId) }
        : null,

      role: employee.roleId
        ? { id: Number(employee.roleId) }
        : null,

      project: employee.projectId
        ? { id: Number(employee.projectId) }
        : null,

      manager: employee.managerId
        ? { id: Number(employee.managerId) }
        : null,
    };

    try {
      const token = localStorage.getItem("token");

      await api.post("/employees", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Employee Added Successfully");
      navigate("/employees");
    } catch (error) {
      console.error(error);
      toast.error("Failed To Add Employee");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Add Employee
        </h1>

        <p className="text-slate-300 mt-1">
          Create a new employee record
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={employee.firstName}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-xl"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={employee.lastName}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-xl"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={employee.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-xl"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={employee.phone}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-xl"
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={employee.salary}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-xl"
          />

          <input
            type="date"
            name="joiningDate"
            value={employee.joiningDate}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-xl"
          />

          <select
            name="departmentId"
            value={employee.departmentId}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-xl"
          >
            <option value="">Select Department</option>

            {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.departmentName}
              </option>
            ))}
          </select>

          <select
            name="roleId"
            value={employee.roleId}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-xl"
          >
            <option value="">Select Role</option>

            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.roleName}
              </option>
            ))}
          </select>

          <select
            name="projectId"
            value={employee.projectId}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-xl"
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.projectName}
              </option>
            ))}
          </select>

          <select
            name="managerId"
            value={employee.managerId}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-xl"
          >
            <option value="">Select Manager</option>

            {managers.map((manager) => (
              <option
                key={manager.id}
                value={manager.id}
              >
                {manager.firstName} {manager.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={saveEmployee}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Save Employee
          </button>

          <button
            onClick={() => navigate("/employees")}
            className="bg-gray-500 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;