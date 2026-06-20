import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import api from "../services/api";

function Fees() {
  const [search, setSearch] = useState("");
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response =
          await api.get("/fees");

        setFees(response.data.fees);
      } catch (error) {
        console.error(
          "Failed to load fees",
          error
        );
      }
    };

    fetchFees();
  }, []);

  const filteredFees =
    fees.filter((fee) =>
      fee.student?.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const totalCollected =
    fees
      .filter(
        (fee) =>
          fee.status === "PAID"
      )
      .reduce(
        (sum, fee) =>
          sum + fee.amount,
        0
      );

  const totalPending =
    fees
      .filter(
        (fee) =>
          fee.status === "PENDING"
      )
      .reduce(
        (sum, fee) =>
          sum + fee.amount,
        0
      );

  const paidStudents =
    fees.filter(
      (fee) =>
        fee.status === "PAID"
    ).length;

  const pendingStudents =
    fees.filter(
      (fee) =>
        fee.status === "PENDING"
    ).length;

  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Navbar />

        <div className="p-6">

          <div className="mb-6">

            <h1 className="text-3xl font-bold text-slate-800">
              Fees Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage student fee records
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Total Collected
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-2">
                ₹{totalCollected}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Total Pending
              </h3>

              <p className="text-3xl font-bold text-red-600 mt-2">
                ₹{totalPending}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Paid Students
              </h3>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {paidStudents}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Pending Students
              </h3>

              <p className="text-3xl font-bold text-orange-600 mt-2">
                {pendingStudents}
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
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Due Date
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredFees.map(
                  (fee) => (
                    <tr
                      key={fee.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {fee.id.slice(
                          0,
                          8
                        )}
                      </td>

                      <td className="p-4 font-medium">
                        {
                          fee.student
                            ?.name
                        }
                      </td>

                      <td className="p-4">
                        ₹{fee.amount}
                      </td>

                      <td className="p-4">
                        {new Date(
                          fee.dueDate
                        ).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            fee.status ===
                            "PAID"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {
                            fee.status
                          }
                        </span>

                      </td>

                    </tr>
                  )
                )}

                {filteredFees.length ===
                  0 && (
                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-8 text-gray-500"
                    >
                      No fee records found
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

export default Fees;