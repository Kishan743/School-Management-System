import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaBook,
  FaSchool,
} from "react-icons/fa";

function StatCard({ title, value }) {

  const cardData = {
    Students: {
      icon: <FaUserGraduate size={28} />,
      color: "bg-blue-500",
    },

    Teachers: {
      icon: <FaChalkboardTeacher size={28} />,
      color: "bg-green-500",
    },

    Attendance: {
      icon: <FaClipboardCheck size={28} />,
      color: "bg-purple-500",
    },

    "Fees Paid": {
      icon: <FaMoneyBillWave size={28} />,
      color: "bg-orange-500",
    },

    Classes: {
      icon: <FaSchool size={28} />,
      color: "bg-indigo-500",
    },

    Subjects: {
      icon: <FaBook size={28} />,
      color: "bg-pink-500",
    },
  };

  const data = cardData[title] || {
    icon: <FaBook size={28} />,
    color: "bg-gray-500",
  };

  console.log("TITLE =", title);
  console.log("DATA =", data);

  return (
    <div
      className={`${data.color} text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition`}
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm opacity-90">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="bg-white/20 p-4 rounded-full">
          {data.icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;