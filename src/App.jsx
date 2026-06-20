import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";

import AdminDashboard from "./Pages/AdminDashboard";
import TeacherDashboard from "./Pages/TeacherDashboard";
import StudentDashboard from "./Pages/StudentDashboard";
import ParentDashboard from "./Pages/ParentDashboard";

import Students from "./Pages/Students";
import Teachers from "./Pages/Teachers";
import Subjects from "./Pages/Subjects";
import Classes from "./Pages/Classes";
import Sections from "./Pages/Sections";
import TeacherAssignments from "./Pages/TeacherAssignments";

import Attendance from "./Pages/Attendance";
import Marks from "./Pages/Marks";
import Fees from "./Pages/Fees";
import Notifications from "./Pages/Notifications";
import Reports from "./Pages/Reports";
import Settings from "./Pages/Settings";

import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/parent-dashboard"
          element={
            <ProtectedRoute>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <Teachers />
            </ProtectedRoute>
          }
        />
        

        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <Subjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <Classes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sections"
          element={
            <ProtectedRoute>
              <Sections />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-assignments"
          element={
            <ProtectedRoute>
              <TeacherAssignments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/marks"
          element={
            <ProtectedRoute>
              <Marks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fees"
          element={
            <ProtectedRoute>
              <Fees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;