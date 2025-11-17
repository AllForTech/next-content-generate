import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you use a UI library
import { Input } from '@/components/ui/input';
import { SaveImageParameters } from '@mdxeditor/editor'; // The type for submitting data

// Define the shape of the props the MDX editor will pass to your component
interface CustomImageDialogProps {
  // This is the function you MUST call to insert the image into the editor.
  onImageUpload: (image: SaveImageParameters) => void;
  // This is the function to close the dialog without inserting anything.
  onClose: () => void;
  // This prop contains the state if the user is editing an existing image (optional)
  // state: EditingImageDialogState | NewImageDialogState;
}

const CustomImageDialog: React.FC<CustomImageDialogProps> = ({ onImageUpload, onClose }) => {
  const [url, setUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to handle the form submission
  const handleSubmit = async () => {
    if (loading) return;

    // CASE 1: Image URL provided
    if (url.trim()) {
      onImageUpload({
        src: url.trim(),
        altText: altText.trim(),
        // width and height are optional, but good practice if known
      });
      onClose();
      return;
    }

    // CASE 2: File upload
    if (file) {
      setLoading(true);
      try {
        // --- STEP A: Upload the File to your Backend ---
        // You would call your private API route here (e.g., /api/upload-image)
        const uploadedUrl = await uploadImageToServer(file);

        // --- STEP B: Submit the final URL to the MDX Editor ---
        onImageUpload({
          src: uploadedUrl,
          altText: altText.trim() || file.name,
          // You could fetch dimensions from the server response here if needed
        });
        onClose();

      } catch (error) {
        console.error('Image upload failed:', error);
        alert('Failed to upload image. Check console for details.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Placeholder function for your actual server upload logic
  const uploadImageToServer = async (file: File): Promise<string> => {
    // 1. Construct FormData
    const formData = new FormData();
    formData.append('image', file);

    // 2. Call your API route
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Server error during upload');
    }

    const result = await response.json();
    // The server must return the public URL of the uploaded image
    return result.publicUrl;
  };


  return (
    <div className="p-4 bg-white border border-black rounded shadow-lg max-w-sm mx-auto">
      <h2 className="text-lg font-bold mb-4">Insert Image</h2>

      {/* File Upload Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Upload File</label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            // Clear URL when file is selected
            setUrl('');
          }}
        />
        <p className="text-xs text-gray-500 mt-1">or enter a URL below</p>
      </div>

      {/* URL Input Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <Input
          type="url"
          placeholder="https://example.com/image.png"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            // Clear file when URL is manually entered
            setFile(null);
          }}
        />
      </div>

      {/* Alt Text Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Alt Text</label>
        <Input
          placeholder="Description for accessibility"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading || (!url.trim() && !file)}>
          {loading ? 'Uploading...' : 'Insert Image'}
        </Button>
      </div>
    </div>
  );
};

export default CustomImageDialog;