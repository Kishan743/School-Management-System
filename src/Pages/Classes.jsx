import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import api from "../services/api";

function Classes() {
  const [search, setSearch] =
    useState("");

  const [classes, setClasses] =
    useState([]);

  useEffect(() => {
    const fetchClasses =
      async () => {
        try {
          const response =
            await api.get(
              "/classes"
            );

          setClasses(
            response.data.classes
          );
        } catch (error) {
          console.error(
            "Failed to load classes",
            error
          );
        }
      };

    fetchClasses();
  }, []);

  const filteredClasses =
    classes.filter((item) =>
      item.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const totalClasses =
    classes.length;

  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Navbar />

        <div className="p-6">

          <div className="mb-6">

            <h1 className="text-3xl font-bold text-slate-800">
              Classes Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage academic classes
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-5 mb-6">

            <div className="bg-white rounded-2xl shadow p-6">

              <h3 className="text-gray-500">
                Total Classes
              </h3>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {totalClasses}
              </p>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 mb-6">

            <input
              type="text"
              placeholder="Search class..."
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
                    Class Name
                  </th>

                  <th className="p-4 text-left">
                    Created Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredClasses.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {item.id.slice(
                          0,
                          8
                        )}
                      </td>

                      <td className="p-4 font-medium">
                        {item.name}
                      </td>

                      <td className="p-4">
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>

                    </tr>
                  )
                )}

                {filteredClasses.length ===
                  0 && (
                  <tr>

                    <td
                      colSpan="3"
                      className="text-center py-8 text-gray-500"
                    >
                      No classes found
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

export default Classes;