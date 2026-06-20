import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import api from "../services/api";
function Students() {
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [students, setStudents] =
  useState([]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    phone: "",
    status: "Active",
  });
  
  useEffect(() => {

  const fetchStudents =
    async () => {

      try {

        const response =
          await api.get(
            "/students"
          );

        setStudents(
          response.data.students
        );

      } catch (error) {

        console.error(
          "Failed to load students",
          error
        );
      }
    };

  fetchStudents();

}, []);
  const handleAddStudent = () => {
    if (
      !newStudent.name ||
      !newStudent.class ||
      !newStudent.phone
    ) {
      alert("Please fill all fields");
      return;
    }
    
if (isEditing) {
  setStudents(
    students.map((student) =>
      student.id === editId
        ? {
            ...student,
            ...newStudent,
          }
        : student
    )
  );

  setIsEditing(false);
  setEditId(null);
} else {
  const student = {
    id:
      students.length > 0
        ? Math.max(
            ...students.map((s) => Number(s.id))
          ) + 1
        : 1,
    ...newStudent,
  };

  setStudents([...students, student]);
}

    setNewStudent({
      name: "",
      class: "",
      phone: "",
      status: "Active",
    });

    setShowModal(false);
    alert(
  isEditing
    ? "Student updated successfully"
    : "Student added successfully"
);
  };

  const handleDeleteStudent = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmDelete) return;

  setStudents(
    students.filter(
      (student) => student.id !== id
    )
  );
};

const handleEditStudent = (student) => {
  setNewStudent({
    name: student.name,
    class: student.class,
    phone: student.phone,
    status: student.status,
  });

  setEditId(student.id);
  setIsEditing(true);
  setShowModal(true);
};

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents = students.length;

  const activeStudents =
  students.length;

  const inactiveStudents = 0;

  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Navbar />

        <div className="p-6">

          {/* Header */}

          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Students Management
              </h1>

              <p className="text-gray-500 mt-1">
                Manage all students from one place
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              + Add Student
            </button>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

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
                Active Students
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {activeStudents}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500">
                Inactive Students
              </h3>

              <p className="text-3xl font-bold text-red-600 mt-2">
                {inactiveStudents}
              </p>
            </div>

          </div>

          {/* Search */}

          <div className="bg-white rounded-2xl shadow p-6 mb-6">

            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Table */}

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-slate-800 text-white">

                <tr>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Class</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">
                      {student.id}
                    </td>

                    <td className="p-4 font-medium">
                      {student.name}
                    </td>

                    <td className="p-4">
                      {student.class}
                    </td>

                    <td className="p-4">
                      {student.phone}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm text-white ${
                          student.status === "Active"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {student.status}
                      </span>

                    </td>

                    <td className="p-4 flex gap-2">

                      <button
                        onClick={() => handleEditStudent(student)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                      >
                        Edit
                     </button>

                      <button
                        onClick={() =>
                          handleDeleteStudent(student.id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>


                    </td>

                  </tr>
                ))}

                {filteredStudents.length === 0 && (
  <tr>
    <td
      colSpan="6"
      className="text-center py-8 text-gray-500"
    >
      No students found
    </td>
  </tr>
)}

              </tbody>

            </table>

          </div>

          {/* Add Student Modal */}

          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

              <div className="bg-white rounded-2xl p-6 w-[500px] shadow-xl">

                <h2 className="text-2xl font-bold mb-5">
                  {isEditing
                    ? "Edit Student"
                    : "Add New Student"}
                </h2>

                <div className="space-y-4">

                  <input
                    type="text"
                    placeholder="Student Name"
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        name: e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl"
                  />

                  <input
                    type="text"
                    placeholder="Class"
                    value={newStudent.class}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        class: e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl"
                  />

                  <input
                    type="text"
                    placeholder="Phone"
                    value={newStudent.phone}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        phone: e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl"
                  />

                  <select
                    value={newStudent.status}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        status: e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-xl"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>

                </div>

                <div className="flex justify-end gap-3 mt-6">

                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleAddStudent}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    {isEditing ? "Update" : "Save"}
                  </button>

                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Students;