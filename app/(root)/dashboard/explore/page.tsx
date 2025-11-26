import React from 'react';

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-gray-800 sm:p-6 lg:p-8">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">Explore AI Tools</h1>
        <p className="mb-6 text-xs text-gray-600 sm:text-sm">
          We&apos;re constantly working to bring you the best AI tools and features. This page is
          currently under maintenance and new tools are being added. Please check back soon for
          exciting updates!
        </p>
        <div className="rounded-md border-t border-b border-gray-300 bg-gray-50 px-6 py-4">
          <p className="text-xs text-gray-700 sm:text-sm">Thank you for your patience.</p>
        </div>
      </div>
    </div>
  );
}
