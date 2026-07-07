import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-8xl font-bold text-blue-600">
        404
      </h1>

      <p className="text-2xl mt-4 text-gray-700">
        Page Not Found
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
      >
        Go To Login
      </button>
    </div>
  );
}

export default NotFound;