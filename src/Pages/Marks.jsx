import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import api from "../services/api";
function Marks() {
    const [search, setSearch] = useState("");

const [showModal, setShowModal] = useState(false);

const [marks, setMarks] = useState([]);

const [newMark, setNewMark] = useState({
  name: "",
  subject: "",
  marks: "",
});

const [isEditing, setIsEditing] =
  useState(false);

const [editId, setEditId] =
  useState(null);

useEffect(() => {

  const fetchMarks = async () => {

    try {

      const response =
        await api.get(
          "/marks"
        );

      setMarks(
        response.data.marks
      );

    } catch (error) {

      console.error(
        "Failed to load marks",
        error
      );
    }
  };

  fetchMarks();

}, []);

const getGrade = (score) => {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "F";
};

const handleDeleteMark = (id) => {
  const confirmDelete =
    window.confirm(
      "Delete this record?"
    );

  if (!confirmDelete) return;

  setMarks(
    marks.filter(
      (student) => student.id !== id
    )
  );
};

const handleEditMark = (mark) => {

  setNewMark({
    name: student.name,
    subject: student.subject,
    marks: student.marks,
  });

  setEditId(student.id);

  setIsEditing(true);

  setShowModal(true);
};
const filteredMarks = marks.filter(
  (mark) =>
    mark.student?.name
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )
);

const totalRecords = marks.length;

const averageMarks =
  marks.length > 0
    ? (
        marks.reduce(
          (sum, item) =>
            sum + item.marks,
          0
        ) / marks.length
      ).toFixed(1)
    : 0;

const topScore =
  marks.length > 0
    ? Math.max(
        ...marks.map(
          (m) => m.marks
        )
      )
    : 0;

const passPercentage =
  marks.length > 0
    ? (
        (marks.filter(
          (m) =>
            m.marks >= 35
        ).length /
          marks.length) *
        100
      ).toFixed(1)
    : 0;

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
        Marks Management
      </h1>

      <p className="text-gray-500 mt-2">
        Manage student marks and grades
      </p>
    </div>

    <button
      onClick={() => {
        setShowModal(true);
        setIsEditing(false);

        setNewMark({
          name: "",
          subject: "",
          marks: "",
        });
      }}
      className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
    >
      + Add Marks
    </button>

  </div>

  {/* Statistics */}

  <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">

    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-gray-500">
        Total Records
      </h3>

      <p className="text-3xl font-bold text-blue-600 mt-2">
        {totalRecords}
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-gray-500">
        Average Marks
      </h3>

      <p className="text-3xl font-bold text-green-600 mt-2">
        {averageMarks}
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-gray-500">
        Top Score
      </h3>

      <p className="text-3xl font-bold text-purple-600 mt-2">
        {topScore}
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-gray-500">
        Pass %
      </h3>

      <p className="text-3xl font-bold text-orange-600 mt-2">
        {passPercentage}%
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
      className="w-full border border-gray-300 rounded-xl px-4 py-3"
    />

  </div>

  {/* Marks Table */}

<div className="bg-white rounded-2xl shadow overflow-hidden">

  <table className="w-full">

    <thead className="bg-slate-800 text-white">

      <tr>
        <th className="p-4 text-left">ID</th>
        <th className="p-4 text-left">Student</th>
        <th className="p-4 text-left">Subject</th>
        <th className="p-4 text-left">Exam</th>
        <th className="p-4 text-left">Marks</th>
        <th className="p-4 text-left">Grade</th>
      </tr>

    </thead>

    <tbody>

      {filteredMarks.map((mark) => (

        <tr
          key={mark.id}
          className="border-b hover:bg-slate-50"
        >

          <td className="p-4">
  {mark.id.slice(0, 8)}
</td>

<td className="p-4 font-medium">
  {mark.student?.name}
</td>

<td className="p-4">
  {mark.assignment?.subject?.name}
</td>

<td className="p-4">
  {mark.examName}
</td>

<td className="p-4">
  {mark.marks}/{mark.maxMarks}
</td>

<td className="p-4">
  <span className="bg-blue-500 text-white px-3 py-1 rounded-full">
    {getGrade(mark.marks)}
  </span>
</td>

        

        </tr>

      ))}

    </tbody>

  </table>

</div>

{/* Add / Edit Marks Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-[500px] shadow-xl">

      <h2 className="text-2xl font-bold mb-5">
        {isEditing ? "Edit Marks" : "Add Marks"}
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Student Name"
          value={newMark.name}
          onChange={(e) =>
            setNewMark({ ...newMark, name: e.target.value })
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="Subject"
          value={newMark.subject}
          onChange={(e) =>
            setNewMark({ ...newMark, subject: e.target.value })
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="number"
          placeholder="Marks"
          value={newMark.marks}
          onChange={(e) =>
            setNewMark({ ...newMark, marks: e.target.value })
          }
          className="w-full border p-3 rounded-xl"
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => {
            setShowModal(false);
            setIsEditing(false);
            setEditId(null);
            setNewMark({ name: "", subject: "", marks: "" });
          }}
          className="bg-gray-500 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            if (!newMark.name || !newMark.subject || !newMark.marks) {
              alert("Please fill all fields");
              return;
            }

            if (isEditing) {
              setMarks(
                marks.map((item) =>
                  item.id === editId
                    ? { ...item, ...newMark }
                    : item
                )
              );

              setIsEditing(false);
              setEditId(null);

            } else {
              const newRecord = {
                id:
                  marks.length > 0
                    ? Math.max(...marks.map((m) => m.id)) + 1
                    : 1,
                ...newMark,
              };

              setMarks([...marks, newRecord]);
            }

            setNewMark({ name: "", subject: "", marks: "" });
            setShowModal(false);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
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

export default Marks;