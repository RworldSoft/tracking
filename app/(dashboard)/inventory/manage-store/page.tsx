"use client";
import { ChevronLeft, ChevronRight, Edit, FileText, Sheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./components/header";
import Filter from "./components/filter";

export default function ManageStore() {
  return (
    <div className="w-full">
      <Header title="Manage Store" />

      {/* Filters Row */}
      <Filter />
      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-md">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Primary</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-sm">
              <td className="p-3 border text-blue-600 cursor-pointer">apple</td>
              <td className="p-3 border">888 Box</td>
              <td className="p-3 border">₹ 20</td>
              <td className="p-3 border">₹ 98</td>
              <td className="p-3 border flex items-center justify-center gap-4">
                <Button variant="outline" size="icon" className="h-8 w-8">
                   <FileText />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                
                  <Edit />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-4 mt-4 text-sm">
        <span>1 - 1 of 1</span>
        <Button variant="outline" size="icon">
          <ChevronLeft className="w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <ChevronRight className="w-4" />
        </Button>
      </div>
    </div>
  );
}
