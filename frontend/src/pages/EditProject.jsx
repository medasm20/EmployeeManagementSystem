import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({
    projectName: "",
    description: "",
  });

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProject(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed To Load Project");
    }
  };

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!project.projectName || !project.description) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.put(`/projects/${id}`, project, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Project Updated Successfully");

      navigate("/projects");
    } catch (error) {
      console.error(error);
      toast.error("Failed To Update Project");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Edit Project
        </h1>

        <p className="text-gray-500 mt-1">
          Update project information
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl"
      >
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-slate-700">
            Project Name
          </label>

          <input
            type="text"
            name="projectName"
            value={project.projectName}
            onChange={handleChange}
            placeholder="Enter Project Name"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold text-slate-700">
            Description
          </label>

          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Enter Project Description"
            rows="5"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
          >
            Update Project
          </button>

          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="bg-gray-500 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProject;