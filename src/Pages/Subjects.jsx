import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import api from "../services/api";

function Subjects() {
  const [search, setSearch] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response =
          await api.get(
            "/subjects"
          );

        setSubjects(
          response.data.subjects
        );
      } catch (error) {
        console.error(
          "Failed to load subjects",
          error
        );
      }
    };

    fetchSubjects();
  }, []);

  const filteredSubjects =
    subjects.filter(
      (subject) =>
        subject.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        subject.code
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalSubjects =
    subjects.length;

  const uniqueCodes =
    new Set(
      subjects.map(
        (subject) =>
          subject.code
      )
    ).size;

  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Navbar />

        <div className="p-6">

          {/* Header */}

          <div className="mb-6">

            <h1 className="text-3xl font-bold text-slate-800">
              Subjects Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all subjects
            </p>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

            <div className="bg-white rounded-2xl shadow p-6">

              <h3 className="text-gray-500">
                Total Subjects
              </h3>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {totalSubjects}
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <h3 className="text-gray-500">
                Subject Codes
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {uniqueCodes}
              </p>

            </div>

          </div>

          {/* Search */}

          <div className="bg-white rounded-2xl shadow p-6 mb-6">

            <input
              type="text"
              placeholder="Search subject..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Table */}

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-slate-800 text-white">

                <tr>

                  <th className="p-4 text-left">
                    ID
                  </th>

                  <th className="p-4 text-left">
                    Subject Name
                  </th>

                  <th className="p-4 text-left">
                    Code
                  </th>

                  <th className="p-4 text-left">
                    Created Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredSubjects.map(
                  (subject) => (
                    <tr
                      key={subject.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {subject.id.slice(
                          0,
                          8
                        )}
                      </td>

                      <td className="p-4 font-medium">
                        {subject.name}
                      </td>

                      <td className="p-4">
                        {subject.code}
                      </td>

                      <td className="p-4">
                        {new Date(
                          subject.createdAt
                        ).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>

                    </tr>
                  )
                )}

                {filteredSubjects.length ===
                  0 && (
                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-8 text-gray-500"
                    >
                      No subjects found
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

export default Subjects;