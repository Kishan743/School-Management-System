import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-white px-8 py-4 shadow flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Welcome back, Admin
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="bg-slate-100 px-4 py-2 rounded-lg hover:bg-slate-200">
          🔔
        </button>

        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
          A
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;