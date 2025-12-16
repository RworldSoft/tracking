import SimpleMapPicker from "@/components/map";

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <SimpleMapPicker />
      </div>
    </div>
  );
}