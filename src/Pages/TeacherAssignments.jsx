import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import api from "../services/api";

function TeacherAssignments() {
  const [search, setSearch] = useState("");
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response =
          await api.get(
            "/teacher-assignments"
          );

        setAssignments(
          response.data.assignments
        );
      } catch (error) {
        console.error(
          "Failed to load teacher assignments",
          error
        );
      }
    };

    fetchAssignments();
  }, []);

  const filteredAssignments =
    assignments.filter(
      (assignment) =>
        assignment.teacher?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        assignment.subject?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalAssignments =
    assignments.length;

  const totalTeachers =
    new Set(
      assignments.map(
        (a) => a.teacher?.id
      )
    ).size;

  const totalSubjects =
    new Set(
      assignments.map(
        (a) => a.subject?.id
      )
    ).size;

  const totalClasses =
    new Set(
      assignments.map(
        (a) => a.class?.id
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
              Teacher Assignments
            </h1>

            <p className="text-gray-500 mt-2">
              Manage teacher subject and class assignments
            </p>
          </div>

          {/* Statistics */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Assignments
              </h3>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {totalAssignments}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Teachers
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {totalTeachers}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Subjects
              </h3>

              <p className="text-3xl font-bold text-purple-600 mt-2">
                {totalSubjects}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Classes
              </h3>

              <p className="text-3xl font-bold text-orange-600 mt-2">
                {totalClasses}
              </p>
            </div>

          </div>

          {/* Search */}

          <div className="bg-white rounded-2xl shadow p-6 mb-6">

            <input
              type="text"
              placeholder="Search teacher or subject..."
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
                    Teacher
                  </th>

                  <th className="p-4 text-left">
                    Subject
                  </th>

                  <th className="p-4 text-left">
                    Class
                  </th>

                  <th className="p-4 text-left">
                    Section
                  </th>

                  <th className="p-4 text-left">
                    Created
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredAssignments.map(
                  (assignment) => (
                    <tr
                      key={assignment.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {assignment.id.slice(
                          0,
                          8
                        )}
                      </td>

                      <td className="p-4 font-medium">
                        {
                          assignment.teacher
                            ?.name
                        }
                      </td>

                      <td className="p-4">
                        {
                          assignment.subject
                            ?.name
                        }
                      </td>

                      <td className="p-4">
                        {
                          assignment.class
                            ?.name
                        }
                      </td>

                      <td className="p-4">
                        {
                          assignment.section
                            ?.name
                        }
                      </td>

                      <td className="p-4">
                        {new Date(
                          assignment.createdAt
                        ).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>

                    </tr>
                  )
                )}

                {filteredAssignments.length ===
                  0 && (
                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-8 text-gray-500"
                    >
                      No assignments found
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

export default TeacherAssignments; 