import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import api from "../services/api";

function Attendance() {
  const [search, setSearch] = useState("");
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
  const fetchAttendance =
    async () => {
      try {

        const response =
          await api.get(
            "/attendance"
          );

        setAttendance(
          response.data.attendances
        );

      } catch (error) {

        console.error(
          "Failed to load attendance",
          error
        );

      } finally {

        setLoading(false);

      }
    };

  fetchAttendance();

}, []);

  const [loading, setLoading] =
  useState(true);

  const filteredAttendance =
    attendance.filter(
      (record) =>
        record.student?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalStudents =
    attendance.length;

  const presentStudents =
    attendance.filter(
      (record) =>
        record.status === "PRESENT"
    ).length;

  const absentStudents =
    attendance.filter(
      (record) =>
        record.status === "ABSENT"
    ).length;

  const attendancePercentage =
    totalStudents > 0
      ? (
          (presentStudents /
            totalStudents) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Navbar />

        <div className="p-6">

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">
              Attendance Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage daily student attendance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Total Students
              </h3>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {totalStudents}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Present Today
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {presentStudents}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Absent Today
              </h3>

              <p className="text-3xl font-bold text-red-600 mt-2">
                {absentStudents}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Attendance %
              </h3>

              <p className="text-3xl font-bold text-purple-600 mt-2">
                {attendancePercentage}%
              </p>
            </div>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 mb-6">

            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>
          {loading && (
  <div className="bg-white rounded-2xl shadow p-8 text-center">
    Loading attendance...
  </div>
)}

{!loading &&
  attendance.length === 0 && (
    <div className="bg-white rounded-2xl shadow p-8 text-center">
      No attendance records found
    </div>
)}

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-slate-800 text-white">

                <tr>

                  <th className="p-4 text-left">
                    ID
                  </th>

                  <th className="p-4 text-left">
                    Student
                  </th>

                  <th className="p-4 text-left">
                    Class
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredAttendance.map(
                  (record) => (
                    <tr
                      key={record.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {record.id.slice(
                          0,
                          6
                        )}
                      </td>

                      <td className="p-4 font-medium">
                        {
                          record.student
                            ?.name
                        }
                      </td>

                      <td className="p-4">
                        {
                          record.assignment
                            ?.class
                            ?.name
                        }
                        {" - "}
                        {
                          record.assignment
                            ?.section
                            ?.name
                        }
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm text-white ${
                            record.status ===
                            "PRESENT"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {
                            record.status
                          }
                        </span>

                      </td>

                      <td className="p-4">
                        {new Date(record.date).toLocaleDateString(
                           "en-GB"
                            )}
                      </td>

                    </tr>
                  )
                )}

                {filteredAttendance.length ===
                  0 && (
                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-8 text-gray-500"
                    >
                      No attendance records found
                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Attendance;