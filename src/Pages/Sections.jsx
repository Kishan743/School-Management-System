import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import api from "../services/api";

function Sections() {
  const [search, setSearch] =
    useState("");

  const [sections, setSections] =
    useState([]);

  useEffect(() => {
    const fetchSections =
      async () => {
        try {
          const response =
            await api.get(
              "/sections"
            );

          setSections(
            response.data.sections
          );
        } catch (error) {
          console.error(
            "Failed to load sections",
            error
          );
        }
      };

    fetchSections();
  }, []);

  const filteredSections =
    sections.filter((section) =>
      section.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const totalSections =
    sections.length;

  const totalClasses =
    new Set(
      sections.map(
        (section) =>
          section.classId
      )
    ).size;

  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Navbar />

        <div className="p-6">

          <div className="mb-6">

            <h1 className="text-3xl font-bold text-slate-800">
              Sections Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage class sections
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

            <div className="bg-white rounded-2xl shadow p-6">

              <h3 className="text-gray-500">
                Total Sections
              </h3>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {totalSections}
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <h3 className="text-gray-500">
                Classes Covered
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {totalClasses}
              </p>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 mb-6">

            <input
              type="text"
              placeholder="Search section..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    Section
                  </th>

                  <th className="p-4 text-left">
                    Class ID
                  </th>

                  <th className="p-4 text-left">
                    Created
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredSections.map(
                  (section) => (
                    <tr
                      key={section.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {section.id.slice(
                          0,
                          8
                        )}
                      </td>

                      <td className="p-4 font-medium">
                        {section.name}
                      </td>

                      <td className="p-4">
                        {section.classId?.slice(
                          0,
                          8
                        )}
                      </td>

                      <td className="p-4">
                        {new Date(
                          section.createdAt
                        ).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>

                    </tr>
                  )
                )}

                {filteredSections.length ===
                  0 && (
                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-8 text-gray-500"
                    >
                      No sections found
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

export default Sections;