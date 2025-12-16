import React from 'react'
import { Input } from "@/components/ui/input";
const Filter = ( ) => {
  return (
    <div>
      {" "}
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Input placeholder="Search" className="border rounded-md" />

      </div>
    </div>
  );
}

export default Filter