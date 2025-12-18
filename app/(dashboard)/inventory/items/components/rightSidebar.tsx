import React, { useState } from "react";
import { CompressedImageResult } from "@/utils/ImageUploadUtils";
import LocalImageUpload from "@/components/imageUpload";

interface CreateItemsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateItemsDrawer = ({ isOpen, onClose }: CreateItemsDrawerProps) => {
  const [formData, setFormData] = useState({
    itemName: "",
    unit: "",
    sellPrice: "",
    itemCode: "",
    itemDescription: "",
    category: "",
    brand: "",
    mrp: "",
    purchasePrice: "",
    hsnCode: "",
    gstPercent: "",
    cessPercent: "",
    discount: "",
    discountType: "Amount",
    offerText: "",
    stock: "",
    isActive: false,
  });

  const [images, setImages] = useState<CompressedImageResult[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = () => {
    // Extract only the paths from images
    const imagePaths = images.map((img) => img.path);

    const dataToSave = {
      ...formData,
      images: imagePaths, // Only paths are saved
    };

    console.log("📦 Form data to save:", dataToSave);
    console.log(
      "🖼️ Image details:",
      images.map((img) => ({
        path: img.path,
        size: img.size,
        originalName: img.originalName,
      }))
    );

    // In future, you'll send this to your backend API:
    // await fetch('/api/items', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(dataToSave)
    // });

    alert("Item saved! Check console for data structure.");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[90vw] md:w-[600px] lg:w-[700px] xl:w-[800px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center h-12 justify-between px-4 sm:px-6 py-3 border-b bg-white sticky top-0 z-10">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Create Items
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100%-57px)] overflow-y-auto overflow-x-hidden">
          <div className="p-2 sm:p-3 space-y-4">
            {/* General Details */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h3 className="text-base font-medium text-gray-700 mb-3">
                General Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Item Name */}
                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Item Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    placeholder="Name of item"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Unit */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Unit<span className="text-red-500">*</span>
                    </label>
                    <button className="px-3 text-blue-600 hover:text-blue-700 font-medium text-xs whitespace-nowrap">
                      + New
                    </button>
                  </div>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                  >
                    <option value="">Select Unit</option>
                    <option value="pcs">Pieces</option>
                    <option value="kg">Kilogram</option>
                    <option value="ltr">Liter</option>
                  </select>
                </div>

                {/* Sell Price */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Sell price<span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l text-sm">
                      ₹
                    </span>
                    <input
                      type="text"
                      name="sellPrice"
                      value={formData.sellPrice}
                      onChange={handleInputChange}
                      placeholder="Sale-price"
                      className="flex-1 min-w-0 px-2 py-1.5 text-sm border border-x-0 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <select className="px-2 py-1.5 border border-l-0 border-gray-300 rounded-r bg-white text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>Excl. Tax</option>
                      <option>Incl. Tax</option>
                    </select>
                  </div>
                </div>

                {/* Item Code */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Item Code
                  </label>
                  <input
                    type="text"
                    name="itemCode"
                    value={formData.itemCode}
                    onChange={handleInputChange}
                    placeholder="Item code"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Category
                    </label>
                    <button className="px-3  text-blue-600 hover:text-blue-700 font-medium text-xs whitespace-nowrap">
                      + New
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="flex-1 min-w-0 px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                    >
                      <option value="">Select Category</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                    </select>
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Brand
                    </label>
                    <button className="px-3 text-blue-600 hover:text-blue-700 font-medium text-xs whitespace-nowrap">
                      + New
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="flex-1 min-w-0 px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                    >
                      <option value="">Select Brand</option>
                      <option value="brand1">Brand 1</option>
                      <option value="brand2">Brand 2</option>
                    </select>
                  </div>
                </div>
                {/* Item Description */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Item Description
                  </label>
                  <textarea
                    name="itemDescription"
                    value={formData.itemDescription}
                    onChange={handleInputChange}
                    placeholder="Item description"
                    rows={2}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>
              </div>

              {/* Upload Images - LOCAL VERSION */}
              <div className="mt-4">
                <LocalImageUpload
                  maxImages={5}
                  images={images}
                  onImagesChange={setImages}
                  maxWidth={1024}
                  maxHeight={1024}
                  quality={0.8}
                />
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h3 className="text-base font-medium text-gray-700 mb-3">
                Price Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* MRP */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    MRP
                  </label>
                  <input
                    type="text"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleInputChange}
                    placeholder="MRP"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Purchase Price */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Purchase price
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l text-sm">
                      ₹
                    </span>
                    <input
                      type="text"
                      name="purchasePrice"
                      value={formData.purchasePrice}
                      onChange={handleInputChange}
                      placeholder="Purchase"
                      className="flex-1 min-w-0 px-2 py-1.5 text-sm border border-x-0 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <select className="px-2 py-1.5 border border-l-0 border-gray-300 rounded-r bg-white text-xs focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>Excl. Tax</option>
                      <option>Incl. Tax</option>
                    </select>
                  </div>
                </div>

                {/* HSN Code */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    name="hsnCode"
                    value={formData.hsnCode}
                    onChange={handleInputChange}
                    placeholder="HSN code"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* GST % */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    GST %
                  </label>
                  <select
                    name="gstPercent"
                    value={formData.gstPercent}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                  >
                    <option value="">Select Tax</option>
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </div>

                {/* Cess % */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Cess %
                  </label>
                  <select
                    name="cessPercent"
                    value={formData.cessPercent}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                  >
                    <option value="">Select Cess</option>
                    <option value="0">0%</option>
                    <option value="1">1%</option>
                    <option value="2">2%</option>
                  </select>
                </div>

                {/* Discount */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Discount
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      placeholder="Discount"
                      className="flex-1 min-w-0 px-3 py-1.5 text-sm border border-r-0 border-gray-300 rounded-l focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <select
                      name="discountType"
                      value={formData.discountType}
                      onChange={handleInputChange}
                      className="px-2 py-1.5 border border-l-0 border-gray-300 rounded-r bg-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option>Amount</option>
                      <option>Percentage</option>
                    </select>
                  </div>
                </div>

                {/* Offer Text */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Offer text
                  </label>
                  <input
                    type="text"
                    name="offerText"
                    value={formData.offerText}
                    onChange={handleInputChange}
                    placeholder="Show offer"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Stock Details */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h3 className="text-base font-medium text-gray-700 mb-3">
                Stock Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Stock */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Stock
                  </label>
                  <input
                    type="text"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="Stock"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateItemsDrawer;
