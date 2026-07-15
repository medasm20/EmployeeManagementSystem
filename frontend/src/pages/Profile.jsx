import { useEffect, useState } from "react";
import {
  UserCircleIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import api from "../services/api";

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
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

      setUserData(userResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#020617] flex justify-center items-center text-white">
        Loading Profile...
      </div>
    );
  }

  const employee = userData.employee;

  return (
    <div className="min-h-screen bg-[#020617] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          My Profile
        </h1>

        <p className="text-slate-300 mt-1">
          View your personal information and account details
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 h-40"></div>

        <div className="px-8 pb-8">
          <div className="-mt-16 mb-6">
            <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
              <UserCircleIcon className="h-24 w-24 text-slate-500" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              {employee.firstName} {employee.lastName}
            </h2>

            <p className="text-gray-500 mt-1">
              Employee Management System  User
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-xl border">
              <div className="flex items-center gap-3 mb-2">
                <EnvelopeIcon className="h-6 w-6 text-blue-600" />

                <h3 className="font-semibold text-slate-700">
                  Email Address
                </h3>
              </div>

              <p className="text-lg">
                {employee.email}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border">
              <div className="flex items-center gap-3 mb-2">
                <BuildingOfficeIcon className="h-6 w-6 text-purple-600" />

                <h3 className="font-semibold text-slate-700">
                  Department
                </h3>
              </div>

              <p className="text-lg">
                {employee.department?.departmentName || "N/A"}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border">
              <div className="flex items-center gap-3 mb-2">
                <CheckBadgeIcon className="h-6 w-6 text-green-600" />

                <h3 className="font-semibold text-slate-700">
                  Status
                </h3>
              </div>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                Active
              </span>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border">
              <div className="flex items-center gap-3 mb-2">
                <UserCircleIcon className="h-6 w-6 text-indigo-600" />

                <h3 className="font-semibold text-slate-700">
                  User Type
                </h3>
              </div>

              <p className="text-lg">
                {employee.role?.roleName || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;