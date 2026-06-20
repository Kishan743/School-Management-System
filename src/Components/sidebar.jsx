import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuClass = ({ isActive }) =>
    isActive
      ? "block bg-blue-600 p-3 rounded-lg"
      : "block p-3 rounded-lg hover:bg-slate-800";

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white shadow-lg z-50 overflow-y-auto">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold">
          EduERP
        </h1>

      </div>

      <div className="p-4 space-y-2">

        <NavLink
          to="/admin-dashboard"
          className={menuClass}
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/students"
          className={menuClass}
        >
          👨‍🎓 Students
        </NavLink>

        <NavLink
          to="/teachers"
          className={menuClass}
        >
          👩‍🏫 Teachers
        </NavLink>
        <NavLink
  to="/subjects"
  className={menuClass}
>
  📚 Subjects
</NavLink>

<NavLink
  to="/classes"
  className={menuClass}
>
  🏫 Classes
</NavLink>

<NavLink
  to="/sections"
  className={menuClass}
>
  🧩 Sections
</NavLink>

<NavLink
  to="/teacher-assignments"
  className={menuClass}
>
  📋 Teacher Assignments
</NavLink>

        <NavLink
          to="/subjects"
          className={menuClass}
        >
          📚 Subjects
        </NavLink>

        <NavLink
          to="/classes"
          className={menuClass}
        >
          🏫 Classes
        </NavLink>

        <NavLink
          to="/sections"
          className={menuClass}
        >
          🧩 Sections
        </NavLink>

        <NavLink
          to="/teacher-assignments"
          className={menuClass}
        >
          📋 Teacher Assignments
        </NavLink>

        <NavLink
          to="/attendance"
          className={menuClass}
        >
          📅 Attendance
        </NavLink>

        <NavLink
          to="/marks"
          className={menuClass}
        >
          📝 Marks
        </NavLink>

        <NavLink
          to="/fees"
          className={menuClass}
        >
          💰 Fees
        </NavLink>

        <NavLink
          to="/notifications"
          className={menuClass}
        >
          🔔 Notifications
        </NavLink>

        <NavLink
          to="/reports"
          className={menuClass}
        >
          📈 Reports
        </NavLink>

        <NavLink
          to="/settings"
          className={menuClass}
        >
          ⚙ Settings
        </NavLink>

      </div>

    </div>
  );
}

export default Sidebar;