import { useEffect, useState } from "react";
import api from "../services/api";

function ManagerProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Projects
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Project Name</th>
              <th className="p-3">Description</th>
            </tr>
          </thead>

          <tbody>
            {projects
              .filter((project) =>
                project.projectName
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((project) => (
                <tr
                  key={project.id}
                  className="border-b text-center hover:bg-gray-50"
                >
                  <td className="p-3">{project.id}</td>

                  <td className="p-3">
                    {project.projectName}
                  </td>

                  <td className="p-3">
                    {project.description}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagerProjects;