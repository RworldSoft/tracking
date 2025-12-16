import React, { useState } from "react";
import { X } from "lucide-react";

interface CreateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDrawer = ({ isOpen, onClose }: CreateDrawerProps) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    gstin: "",
    state: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Form Data:", formData);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER WITH ACTIONS */}
        <div className="flex items-center justify-between px-5 h-12 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold text-gray-800">
            Create Customer
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90"
            >
              Save
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 text-sm border rounded hover:bg-gray-100"
            >
              Cancel
            </button>

          </div>
        </div>

        {/* CONTENT */}
        <div className="p-3 space-y-4 overflow-y-auto h-[calc(100%-56px)]">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-3 py-1.5 border rounded focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile<span className="text-red-500">*</span>
            </label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-full px-3 py-1.5 border rounded focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-3 py-1.5 border rounded focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              placeholder="Enter address"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary outline-none resize-none"
            />
          </div>

          {/* GSTIN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GSTIN
            </label>
            <input
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
              placeholder="Enter GSTIN"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State<span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded bg-white focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">Select State</option>
              <option value="MH">Maharashtra</option>
              <option value="DL">Delhi</option>
              <option value="KA">Karnataka</option>
              <option value="GJ">Gujarat</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDrawer;
