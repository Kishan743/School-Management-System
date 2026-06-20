import { useEffect, useState } from "react";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import RecentActivities from "../Components/RecentActivities";
import Announcements from "../Components/Announcements";

import api from "../services/api";

import adminBanner from "../assets/Images/admin-banner.png";

function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    subjects: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get(
          "/dashboard/admin"
        );

        console.log(
          "Dashboard Data:",
          response.data
        );

        setStats(response.data);
      } catch (error) {
        console.error(
          "Dashboard fetch failed",
          error
        );
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 min-h-screen">

        <Navbar />

        <div className="p-6">

          {/* Welcome Banner */}

          <div className="bg-blue-600 text-white rounded-2xl p-8 shadow-lg">

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

              <div className="flex-1">

                <h1 className="text-4xl font-bold">
                  Welcome Admin 👋
                </h1>

                <p className="mt-4 text-blue-100 leading-relaxed max-w-2xl">
                  Manage your institution efficiently from one dashboard.
                </p>

              </div>

              <div>

                <img
                  src={adminBanner}
                  alt="Admin Banner"
                  className="w-60 lg:w-72"
                />

              </div>

            </div>

          </div>

          {/* Dashboard Stats */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">
                Students
              </h3>

              <p className="text-3xl font-bold">
                {stats.students}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">
                Teachers
              </h3>

              <p className="text-3xl font-bold">
                {stats.teachers}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">
                Classes
              </h3>

              <p className="text-3xl font-bold">
                {stats.classes}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">
                Subjects
              </h3>

              <p className="text-3xl font-bold">
                {stats.subjects}
              </p>
            </div>

          </div>

          {/* Activities */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

            <RecentActivities />

            <Announcements />

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;