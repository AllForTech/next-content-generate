import React from 'react';

export default function ExplorePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="text-center max-w-md">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
          Explore AI Tools
        </h1>
        <p className="text-xs sm:text-sm mb-6 text-gray-600">
          We're constantly working to bring you the best AI tools and features.
          This page is currently under maintenance and new tools are being added.
          Please check back soon for exciting updates!
        </p>
        <div className="border-t border-b border-gray-300 py-4 px-6 bg-gray-50 rounded-md">
          <p className="text-xs sm:text-sm text-gray-700">
            Thank you for your patience.
          </p>
        </div>
      </div>
    </div>
  );
}
