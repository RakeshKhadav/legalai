"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
  text?: string;
}

export default function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      {/* Spinner */}
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />

      {/* Text */}
      <p className="text-blue-700 font-medium">{text}</p>
    </div>
  );
}
