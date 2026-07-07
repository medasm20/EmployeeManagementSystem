import { useEffect, useState } from "react";
import api from "../services/api";

function MyProjects() {
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("token");

      const usernameResponse = await api.get(
        `/auth/username?token=${token}`
      );

      const username = usernameResponse.data;

      const userResponse = await api.get(
        `/users/username/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProject(userResponse.data.employee?.project);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          My Projects
        </h1>

        <p className="text-slate-300 mt-1">
          View projects assigned to you
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Assigned Projects
        </h2>

        {!project ? (
          <p className="text-gray-600">
            No project assigned.
          </p>
        ) : (
          <div className="border rounded-xl p-6 bg-slate-50">
            <h3 className="text-xl font-bold text-slate-800">
              {project.projectName}
            </h3>

            <p className="text-gray-600 mt-2">
              {project.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProjects;