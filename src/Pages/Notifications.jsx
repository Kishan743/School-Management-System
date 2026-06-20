import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

function Notifications() {
  const [showModal, setShowModal] = useState(false);

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Fee Reminder",
            message: "Pay pending fee before due date",
            type: "warning",
            read: false,
            date: new Date().toLocaleDateString(),
          },
          {
            id: 2,
            title: "Exam Update",
            message: "Mid exams start from next Monday",
            type: "info",
            read: true,
            date: new Date().toLocaleDateString(),
          },
        ];
  });

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info",
  });

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Navbar />

        <div className="p-6">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Notifications
              </h1>
              <p className="text-gray-500 mt-2">
                You have {unreadCount} unread notifications
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
            >
              + Add Notification
            </button>
          </div>

          {/* NOTIFICATIONS LIST */}
          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`bg-white p-5 rounded-2xl shadow flex justify-between items-start border-l-8 ${
                  n.read ? "border-gray-300" : "border-blue-500"
                }`}
              >
                <div>
                  <h2 className="text-lg font-bold">{n.title}</h2>
                  <p className="text-gray-600">{n.message}</p>
                  <p className="text-sm text-gray-400 mt-1">{n.date}</p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                      n.type === "warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {n.type}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setNotifications(
                        notifications.map((item) =>
                          item.id === n.id
                            ? { ...item, read: !item.read }
                            : item
                        )
                      );
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                  >
                    {n.read ? "Mark Unread" : "Mark Read"}
                  </button>

                  <button
                    onClick={() => {
                      setNotifications(
                        notifications.filter((item) => item.id !== n.id)
                      );
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[500px]">
            <h2 className="text-2xl font-bold mb-4">
              Add Notification
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newNotification.title}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    title: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

              <textarea
                placeholder="Message"
                value={newNotification.message}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    message: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl"
              />

              <select
                value={newNotification.type}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    type: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-xl"
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (
                    !newNotification.title ||
                    !newNotification.message
                  ) {
                    alert("Fill all fields");
                    return;
                  }

                  const newItem = {
                    id:
                      notifications.length > 0
                        ? Math.max(...notifications.map((n) => n.id)) + 1
                        : 1,
                    ...newNotification,
                    read: false,
                    date: new Date().toLocaleDateString(),
                  };

                  setNotifications([...notifications, newItem]);

                  setNewNotification({
                    title: "",
                    message: "",
                    type: "info",
                  });

                  setShowModal(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;