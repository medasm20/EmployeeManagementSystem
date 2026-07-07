import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function EditEmployee() {
  const { id } = useParams();
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
    fetchEmployee();
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [departmentRes, roleRes, projectRes, employeeRes] =
        await Promise.all([
          api.get("/departments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/roles", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/projects", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/employees", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

      setDepartments(departmentRes.data);
      setRoles(roleRes.data);
      setProjects(projectRes.data);
      setManagers(employeeRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed To Load Dropdown Data");
    }
  };

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      setEmployee({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        salary: data.salary || "",
        joiningDate: data.joiningDate || "",
        departmentId: data.department?.id || "",
        roleId: data.role?.id || "",
        projectId: data.project?.id || "",
        managerId: data.manager?.id || "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed To Load Employee");
    }
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const updateEmployee = async () => {
    if (
      !employee.firstName ||
      !employee.lastName ||
      !employee.email ||
      !employee.phone ||
      !employee.salary ||
      !employee.joiningDate
    ) {
      toast.warning("Please fill all required fields");
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

      await api.put(`/employees/${id}`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Employee Updated Successfully");
      navigate("/employees");
    } catch (error) {
      console.error(error);
      toast.error("Failed To Update Employee");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Edit Employee
        </h1>

        <p className="text-slate-300 mt-1">
          Update employee information
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
            onClick={updateEmployee}
            className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
          >
            Update Employee
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

export default EditEmployee;