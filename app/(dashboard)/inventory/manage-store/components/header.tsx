"use client";
import { useState } from "react";
import { Upload, Plus } from "lucide-react";
import CreateItemsDrawer from "./rightSidebar";

interface ItemsHeaderProps {
  title?: string;
}

const Header = ({ title = "Items" }: ItemsHeaderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div className="flex items-center justify-between pb-3">
      {/* Left: Title */}
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

      {/* Right: Buttons */}
      <div className="flex items-center gap-2">
        {/* Import */}
        <button className="border border-primary text-primary hover:bg-blue-50 px-2.5 py-1.5 rounded flex items-center gap-1.5 text-sm">
          <Upload size={14} />
          <span>Import</span>
        </button>

        {/* New */}
        <button
          className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded flex items-center gap-1.5 text-sm"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Plus size={14} />
          <span>New</span>
        </button>
      </div>

      <CreateItemsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default Header;
