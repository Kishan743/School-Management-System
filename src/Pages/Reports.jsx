import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import api from "../services/api";

function Reports() {
  const [search, setSearch] = useState("");

  const [reportData, setReportData] =
    useState({
      students: 0,
      teachers: 0,
      attendance: 0,
      marks: 0,
      fees: 0,
    });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [
          studentsRes,
          teachersRes,
          attendanceRes,
          marksRes,
          feesRes,
        ] = await Promise.all([
          api.get("/students"),
          api.get("/teachers"),
          api.get("/attendance"),
          api.get("/marks"),
          api.get("/fees"),
        ]);

        setReportData({
          students:
            studentsRes.data.count || 0,
          teachers:
            teachersRes.data.count || 0,
          attendance:
            attendanceRes.data.count || 0,
          marks:
            marksRes.data.count || 0,
          fees:
            feesRes.data.count || 0,
        });
      } catch (error) {
        console.error(
          "Failed to load reports",
          error
        );
      }
    };

    fetchReports();
  }, []);

  const reports = [
    {
      id: 1,
      title: "Students Report",
      type: "Academic",
      value: reportData.students,
    },
    {
      id: 2,
      title: "Teachers Report",
      type: "Staff",
      value: reportData.teachers,
    },
    {
      id: 3,
      title: "Attendance Report",
      type: "Attendance",
      value: reportData.attendance,
    },
    {
      id: 4,
      title: "Marks Report",
      type: "Exams",
      value: reportData.marks,
    },
    {
      id: 5,
      title: "Fees Report",
      type: "Finance",
      value: reportData.fees,
    },
  ];

  const filteredReports =
    reports.filter((report) =>
      report.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Navbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold text-slate-800">
            Reports
          </h1>

          <p className="text-gray-500 mt-2 mb-6">
            View ERP system reports
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-6">

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Students
              </h3>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {reportData.students}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Teachers
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {reportData.teachers}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Attendance
              </h3>

              <p className="text-3xl font-bold text-purple-600 mt-2">
                {reportData.attendance}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Marks
              </h3>

              <p className="text-3xl font-bold text-orange-600 mt-2">
                {reportData.marks}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Fees
              </h3>

              <p className="text-3xl font-bold text-red-600 mt-2">
                {reportData.fees}
              </p>
            </div>

          </div>

          <div className="bg-white p-5 rounded-2xl shadow mb-6">

            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-slate-800 text-white">

                <tr>
                  <th className="p-4 text-left">
                    ID
                  </th>

                  <th className="p-4 text-left">
                    Report
                  </th>

                  <th className="p-4 text-left">
                    Type
                  </th>

                  <th className="p-4 text-left">
                    Records
                  </th>
                </tr>

              </thead>

              <tbody>

                {filteredReports.map(
                  (report) => (
                    <tr
                      key={report.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-4">
                        {report.id}
                      </td>

                      <td className="p-4 font-medium">
                        {report.title}
                      </td>

                      <td className="p-4">
                        {report.type}
                      </td>

                      <td className="p-4">
                        {report.value}
                      </td>
                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Reports;