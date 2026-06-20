function RecentActivities() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        Recent Activities
      </h2>

      <div className="space-y-4">

        <div className="border-b pb-3">
          New student registered
        </div>

        <div className="border-b pb-3">
          Attendance updated
        </div>

        <div className="border-b pb-3">
          Fees payment received
        </div>

        <div>
          Exam results published
        </div>

      </div>

    </div>
  );
}

export default RecentActivities;