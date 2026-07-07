import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

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

  const deleteEmployee = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Employee Deleted Successfully");
      fetchEmployees();
    } catch (error) {
      console.error(error);
      alert("Failed To Delete Employee");
    }
  };

  const exportToExcel = () => {
    const data = employees.map((employee) => ({
      ID: employee.id,
      Employee: `${employee.firstName} ${employee.lastName}`,
      Email: employee.email,
      Department:
        employee.department?.departmentName || "N/A",
      Role: employee.role?.roleName || "N/A",
      Project:
        employee.project?.projectName || "N/A",
      Salary: employee.salary,
      Manager: employee.manager
        ? `${employee.manager.firstName} ${employee.manager.lastName}`
        : "N/A",
      JoiningDate: employee.joiningDate || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Employees"
    );

    XLSX.writeFile(workbook, "employees.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Employee Report", 14, 20);

    const tableData = employees.map((employee) => [
      employee.id,
      `${employee.firstName} ${employee.lastName}`,
      employee.email,
      employee.department?.departmentName || "N/A",
      employee.role?.roleName || "N/A",
      employee.project?.projectName || "N/A",
      employee.salary,
    ]);

    autoTable(doc, {
      head: [
        [
          "ID",
          "Employee",
          "Email",
          "Department",
          "Role",
          "Project",
          "Salary",
        ],
      ],
      body: tableData,
      startY: 30,
    });

    doc.save("employees.pdf");
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Employees
          </h1>

          <p className="text-slate-300 mt-1">
            Manage employee records and assignments
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Export Excel
          </button>

          <button
            onClick={exportToPDF}
            className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            Export PDF
          </button>

          <button
            onClick={() => navigate("/add-employee")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Add Employee
          </button>
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

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Employee</th>
                <th className="p-4">Email</th>
                <th className="p-4">Department</th>
                <th className="p-4">Role</th>
                <th className="p-4">Project</th>
                <th className="p-4">Salary</th>
                <th className="p-4">Manager</th>
                <th className="p-4">Joining Date</th>
                <th className="p-4">Edit</th>
                <th className="p-4">Delete</th>
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

                    <td className="p-4 font-medium">
                      {employee.firstName} {employee.lastName}
                    </td>

                    <td className="p-4">
                      {employee.email}
                    </td>

                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {employee.department?.departmentName ||
                          "N/A"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                        {employee.role?.roleName || "N/A"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {employee.project?.projectName || "N/A"}
                      </span>
                    </td>

                    <td className="p-4">
                      ₹{employee.salary}
                    </td>

                    <td className="p-4">
                      {employee.manager
                        ? `${employee.manager.firstName} ${employee.manager.lastName}`
                        : "N/A"}
                    </td>

                    <td className="p-4">
                      {employee.joiningDate || "N/A"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          navigate(
                            `/edit-employee/${employee.id}`
                          )
                        }
                        className="bg-amber-500 text-white px-4 py-2 rounded-lg shadow hover:bg-amber-600 transition"
                      >
                        Edit
                      </button>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          deleteEmployee(employee.id)
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                      >
                        Delete
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

export default Employees;