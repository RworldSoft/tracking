import React from 'react'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
const Filter = ( ) => {
  return (
    <div>
      {" "}
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Input placeholder="Search" className="border rounded-md" />

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cat1">Category 1</SelectItem>
            <SelectItem value="cat2">Category 2</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Active" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Warehouse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wh1">Warehouse 1</SelectItem>
            <SelectItem value="wh2">Warehouse 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Filter