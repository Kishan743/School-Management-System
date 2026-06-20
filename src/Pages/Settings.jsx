import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

function Settings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Admin",
          email: "admin@gmail.com",
          password: "",
          schoolName: "ABC School",
          theme: "light",
          notifications: true,
        };
  });

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const toggleNotifications = () => {
    setSettings({
      ...settings,
      notifications: !settings.notifications,
    });
  };

  const toggleTheme = () => {
    setSettings({
      ...settings,
      theme: settings.theme === "light" ? "dark" : "light",
    });
  };

  const handleSave = () => {
    alert("Settings updated successfully!");
  };

  return (
    <div
      className={`min-h-screen ${
        settings.theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-100"
      }`}
    >
      <Sidebar />
      <div className="ml-64 min-h-screen">
        <Navbar />

        <div className="p-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-500 mt-2 mb-6">
            Manage system configuration
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* PROFILE */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
              <h2 className="text-xl font-bold mb-4">👤 Profile</h2>

              <input
                name="name"
                value={settings.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-3 rounded-xl mb-3 text-black"
              />

              <input
                name="email"
                value={settings.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-3 rounded-xl mb-3 text-black"
              />

              <input
                name="password"
                type="password"
                value={settings.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border p-3 rounded-xl text-black"
              />
            </div>

            {/* SCHOOL INFO */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
              <h2 className="text-xl font-bold mb-4">🏫 School Info</h2>

              <input
                name="schoolName"
                value={settings.schoolName}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl text-black"
              />
            </div>

            {/* PREFERENCES */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
              <h2 className="text-xl font-bold mb-4">⚙️ Preferences</h2>

              {/* Theme */}
              <button
                onClick={toggleTheme}
                className="bg-slate-800 text-white px-4 py-2 rounded-xl mr-3"
              >
                Toggle Theme ({settings.theme})
              </button>

              {/* Notifications */}
              <button
                onClick={toggleNotifications}
                className={`px-4 py-2 rounded-xl ${
                  settings.notifications
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                Notifications:{" "}
                {settings.notifications ? "ON 🔔" : "OFF 🔕"}
              </button>
            </div>

            {/* SAVE */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow flex items-center justify-center">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
              >
                Save All Changes 💾
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;