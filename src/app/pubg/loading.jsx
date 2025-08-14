import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div>
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
