'use client'
// import { imageUploadHandler$ } from '@mdxeditor/editor';
import React, { useState, useEffect } from 'react';

// This is the component that replaces the default image dialogue
const CustomImageEditor = () => {
  // 1. Use the hook to get the state and the setter function
  // const { image, save, close } = imageUploadHandler$(');

  // 2. Local state for the inputs
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  // 3. Handle saving the new/edited image data
  const handleSave = () => {
    // Call the 'save' function provided by the hook, passing the new image data
    // save({
    //   src: url,
    //   alt: alt,
    //   title: alt // Optional: Use alt text as title
    // });
  };

  return (
    <div className="p-4 bg-white border rounded shadow-lg dark:bg-gray-800">
      <h3 className="text-xl font-semibold mb-3">Insert Custom Image</h3>

      {/* Input for the Image URL */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Image URL (Unsplash or direct)</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Input for Alt Text */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Alt Text</label>
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={close}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!url} // Disable if no URL is present
          className={`px-4 py-2 text-white rounded ${url ? 'bg-blue-600' : 'bg-blue-300'}`}
        >
          {/*{image ? 'Update Image' : 'Insert Image'}*/}
        </button>
      </div>

      {/* You would integrate your Unsplash search functionality here */}
    </div>
  );
};

export default CustomImageEditor;