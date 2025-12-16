"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6">
      <div className="max-w-lg text-center space-y-6">
        {/* 404 */}
        <h1 className="text-8xl font-extrabold tracking-wider text-primary">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg">
          Sorry, the page you’re looking for doesn’t exist or was moved.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
