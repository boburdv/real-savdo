import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoaderCircle className="animate-spin" size={38} />
    </div>
  );
}
