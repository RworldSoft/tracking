export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: "Total Users", value: "2,543", change: "+12%" },
          { label: "Revenue", value: "$45,231", change: "+8%" },
          { label: "Orders", value: "1,423", change: "+23%" },
          { label: "Active Sessions", value: "892", change: "+5%" },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-green-600 text-sm mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-white h-100 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-gray-600">Your dashboard content goes here...</p>
      </div>
    </div>
  );
}
