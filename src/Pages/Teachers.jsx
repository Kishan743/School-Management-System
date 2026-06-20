import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import api from "../services/api";
function Teachers() {
    const [search, setSearch] = useState("");
const [showModal, setShowModal] = useState(false);

const [teachers, setTeachers] = useState([]);

const [newTeacher, setNewTeacher] = useState({
  name: "",
  email: "",
  employeeId: "",
  designation: "",
});

const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState(null);
useEffect(() => {

  const fetchTeachers =
    async () => {

      try {

        const response =
          await api.get(
            "/teachers"
          );

        setTeachers(
          response.data.teachers
        );

      } catch (error) {

        console.error(
          "Failed to load teachers",
          error
        );
      }
    };

  fetchTeachers();

}, []);
const handleAddTeacher = () => {
  if (
    !newTeacher.name ||
    !newTeacher.subject ||
    !newTeacher.phone
  ) {
    alert("Please fill all fields");
    return;
  }

  if (isEditing) {
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === editId
          ? {
              ...teacher,
              ...newTeacher,
            }
          : teacher
      )
    );

    setIsEditing(false);
    setEditId(null);
  } else {
    const teacher = {
      id:
        teachers.length > 0
          ? Math.max(
              ...teachers.map((t) => Number(t.id))
            ) + 1
          : 1,
      ...newTeacher,
    };

    setTeachers([...teachers, teacher]);
  }

  setNewTeacher({
    name: "",
    subject: "",
    phone: "",
    status: "Active",
  });

  setShowModal(false);
};

const handleDeleteTeacher = (id) => {
  const confirmDelete = window.confirm(
    "Delete this teacher?"
  );

  if (!confirmDelete) return;

  setTeachers(
    teachers.filter(
      (teacher) => teacher.id !== id
    )
  );
};

const handleEditTeacher = (teacher) => {
  setNewTeacher({
    name: teacher.name,
    subject: teacher.subject,
    phone: teacher.phone,
    status: teacher.status,
  });

  setEditId(teacher.id);
  setIsEditing(true);
  setShowModal(true);
};

const filteredTeachers = teachers.filter(
  (teacher) =>
    teacher.name
      .toLowerCase()
      .includes(search.toLowerCase())
);

const totalTeachers = teachers.length;

const activeTeachers =
  teachers.length;

const inactiveTeachers = 0;
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
        Teachers Management
      </h1>

      <p className="text-gray-500 mt-1">
        Manage all teachers from one place
      </p>

    </div>

    <button
      onClick={() => setShowModal(true)}
      className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
    >
      + Add Teacher
    </button>

  </div>

  {/* Statistics */}

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

    <div className="bg-white rounded-2xl shadow p-6">

      <h3 className="text-gray-500">
        Total Teachers
      </h3>

      <p className="text-3xl font-bold text-blue-600 mt-2">
        {totalTeachers}
      </p>

    </div>

    <div className="bg-white rounded-2xl shadow p-6">

      <h3 className="text-gray-500">
        Active Teachers
      </h3>

      <p className="text-3xl font-bold text-green-600 mt-2">
        {activeTeachers}
      </p>

    </div>

    <div className="bg-white rounded-2xl shadow p-6">

      <h3 className="text-gray-500">
        Inactive Teachers
      </h3>

      <p className="text-3xl font-bold text-red-600 mt-2">
        {inactiveTeachers}
      </p>

    </div>

  </div>

  {/* Search */}

  <div className="bg-white rounded-2xl shadow p-6 mb-6">

    <input
      type="text"
      placeholder="Search teacher..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

  </div>

  {/* Teachers Table */}

<div className="bg-white rounded-2xl shadow overflow-hidden">

  <table className="w-full">

    <thead className="bg-slate-800 text-white">

      <tr>

        <th className="p-4 text-left">
  Employee ID
</th>

<th className="p-4 text-left">
  Name
</th>

<th className="p-4 text-left">
  Email
</th>

<th className="p-4 text-left">
  Designation
</th>

<th className="p-4 text-left">
  Actions
</th>
      </tr>

    </thead>

    <tbody>

      {filteredTeachers.map((teacher) => (

        <tr
          key={teacher.employeeId}
          className="border-b hover:bg-slate-50"
        >

          <td className="p-4">
            {teacher.employeeId}
          </td>

          <td className="p-4 font-medium">
            {teacher.name}
          </td>

          <td className="p-4">
            {teacher.email}
          </td>

          <td className="p-4">
            {teacher.designation || "N/A"}
          </td>

         

          <td className="p-4 flex gap-2">

            <button
              onClick={() => handleEditTeacher(teacher)}
              className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDeleteTeacher(teacher.id)
              }
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>

          </td>

        </tr>

      ))}

      {filteredTeachers.length === 0 && (

        <tr>

          <td
            colSpan="5"
            className="text-center py-8 text-gray-500"
          >
            No teachers found
          </td>

        </tr>

      )}

    </tbody>

  </table>

</div>

{/* Add / Edit Teacher Modal */}

{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl p-6 w-[500px] shadow-xl">

      <h2 className="text-2xl font-bold mb-5">
        {isEditing ? "Edit Teacher" : "Add New Teacher"}
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Teacher Name"
          value={newTeacher.name}
          onChange={(e) =>
            setNewTeacher({
              ...newTeacher,
              name: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="Subject"
          value={newTeacher.subject}
          onChange={(e) =>
            setNewTeacher({
              ...newTeacher,
              subject: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="Phone"
          value={newTeacher.phone}
          onChange={(e) =>
            setNewTeacher({
              ...newTeacher,
              phone: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <select
          value={newTeacher.status}
          onChange={(e) =>
            setNewTeacher({
              ...newTeacher,
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
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleAddTeacher}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
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

export default Teachers;