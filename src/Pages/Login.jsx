import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/Images/login.png";
import api from "../services/api";
function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleLogin = async () => {
  try {

    const response = await api.post(
      "/auth/login",
      {
        email,
        password
      }
    );

    const { token, user } =
      response.data;

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "role",
      user.role
    );

    if (user.role === "ADMIN") {
      navigate("/admin-dashboard");
    }

    else if (
      user.role === "TEACHER"
    ) {
      navigate("/teacher-dashboard");
    }

    else if (
      user.role === "STUDENT"
    ) {
      navigate("/student-dashboard");
    }

    else if (
      user.role === "PARENT"
    ) {
      navigate("/parent-dashboard");
    }

  } catch (error) {

    alert(
      "Invalid email or password"
    );

    console.error(error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="w-[1100px] h-[650px] bg-white rounded-2xl shadow-xl overflow-hidden flex">

        {/* Left Side */}
        <div className="w-1/2 bg-blue-50 p-10 flex flex-col justify-between">

          <div>
            <h1 className="text-6xl font-bold text-blue-600 mb-5">
              EduERP
            </h1>

            <p className="text-gray-700 text-lg mb-4">
              Educational Management System
            </p>

            <p className="text-gray-500 leading-8">
              Empowering Education,
              <br />
              Simplifying Management.
            </p>
          </div>

          <img
            src={loginImage}
            alt="Login"
            className="w-[450px] mx-auto"
          />

        </div>

        {/* Right Side */}
        <div className="w-1/2 flex items-center justify-center">

          <div className="w-[400px]">

            <h2 className="text-4xl font-bold mb-3">
              Welcome Back!
            </h2>

            <p className="text-gray-500 mb-8">
              Login to continue to your account
            </p>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 mb-4"
            >
              <option>Admin</option>
              <option>Teacher</option>
              <option>Student</option>
              <option>Parent</option>
            </select>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 mb-4"
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 mb-4"
            />

            <div className="flex justify-between items-center mb-6 text-sm">

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <span className="text-blue-600 cursor-pointer">
                Forgot Password?
              </span>

            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>

            <p className="text-center text-gray-400 mt-6 text-sm">
              © 2025 EduERP. All rights reserved.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;