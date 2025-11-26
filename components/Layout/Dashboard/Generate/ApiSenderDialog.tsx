'use client'
import React, { useState } from 'react';
import { Send, Globe, Key, AlertTriangle, CheckCircle, Loader2, Database, X, Code, Plus, Trash2 } from 'lucide-react';
import { useContent } from '@/context/GenerationContext';
import { cn } from '@/lib/utils';


export const ApiSenderDialog = ({ isOpen, onClose }) => {
  // Mock hook usage
  const { generatedContent } = useContent();

  // Initialize customBody with the mocked generated content
  const [customBody, setCustomBody] = useState({ content: `${generatedContent}` });

  // --- State for API Configuration ---
  const [apiEndpoint, setApiEndpoint] = useState('https://api.yourcms.com/v1/posts');
  const [method, setMethod] = useState('POST');
  const [authHeader, setAuthHeader] = useState('Bearer YOUR_AUTH_TOKEN');

  // --- State for Body Editor ---
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  // --- State for API Call Feedback ---
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [apiResult, setApiResult] = useState(null);
  const [errorDetails, setErrorDetails] = useState('');

  if (!isOpen) return null;

  // The actual JSON payload to be sent (using useMemo for optimization)
  const payload = JSON.stringify({
      timestamp: new Date().toISOString(),
      source_component: 'ai_content_generator',
      data: customBody,
    }, null, 2);


  // --- Body Handlers ---
  const handleAddProperty = () => {
    const key = newKey.trim();
    if (key && newValue.trim() !== '') {
      // Simple attempt to parse value as JSON (e.g., number, boolean, array)
      let parsedValue = newValue;
      try {
        // Attempt to parse if it looks like JSON or simple value
        if (newValue.startsWith('{') || newValue.startsWith('[') || !isNaN(Number(newValue)) || newValue === 'true' || newValue === 'false') {
          parsedValue = JSON.parse(newValue);
        }
      } catch (e) {
        // If parsing fails, treat it as a string
        parsedValue = newValue;
      }

      setCustomBody(prev => ({
        ...prev,
        [key]: parsedValue
      }));
      setNewKey('');
      setNewValue('');
    }
  };

  const handleRemoveProperty = (keyToRemove: string) => {
    setCustomBody(prev => {
      const newBody = { ...prev };
      delete newBody[keyToRemove];
      return newBody;
    });
  };


  // --- API Simulation Function ---
  const handleSend = async () => {
    if (!apiEndpoint || status === 'loading') return;

    setStatus('loading');
    setErrorDetails('');
    setApiResult(null);

    // --- Start Mock API Call (Replace this section with actual fetch in a real environment) ---
    try {
      // Implement exponential backoff for resilience (optional but good practice)
      const maxRetries = 3;
      let delay = 1000;

      for (let i = 0; i < maxRetries; i++) {
        try {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, delay));

          // Mock failure condition for demonstration
          if (apiEndpoint.includes('fail') && i < maxRetries - 1) {
            throw new Error('429 Mock Error: Rate limit exceeded, retrying...');
          } else if (apiEndpoint.includes('fail') && i === maxRetries - 1) {
            throw new Error('403 Forbidden: API key expired or endpoint is incorrect.');
          }

          // Simulate successful response
          const mockResponse = {
            id: 'post-' + Math.floor(Math.random() * 10000),
            status: 'published',
            url: 'https://preview.yourcms.com/article/' + Math.floor(Math.random() * 10000),
          };

          setApiResult(mockResponse);
          setStatus('success');
          return; // Exit on success

        } catch (error) {
          if (i < maxRetries - 1) {
            console.log(`Retry attempt ${i + 1} failed. Retrying in ${delay / 1000}s...`);
            delay *= 2; // Exponential backoff
          } else {
            throw error; // Throw the last error
          }
        }
      }
    } catch (error) {
      console.error('API Send Error:', error);
      setErrorDetails(error.message);
      setStatus('error');
    }
    // --- End Mock API Call ---

  }
  

  // Input Field styled with neutral palette
  const InputField = ({ label, icon: Icon, value, onChange, placeholder, type = 'text', readOnly = false, className }) => (
    <div className={cn("flex flex-col space-y-1", className)}>
      <label className="text-xs font-medium text-neutral-600 flex items-center">
        {Icon && <Icon className="w-3.5 h-3.5 mr-1" />}
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={cn(
          "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900",
          "placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black transition-shadow",
          readOnly && "bg-neutral-100 cursor-not-allowed"
        )}
      />
    </div>
  );

  // Status Indicator
  const StatusIndicator = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex items-center text-sm text-neutral-700 bg-neutral-100 p-3 rounded-lg border border-neutral-200">
            <Loader2 className="w-4 h-4 mr-2 animate-spin text-black" />
            Sending data...
          </div>
        );
      case 'success':
        return (
          <div className="p-4 bg-white rounded-lg shadow-inner border-l-4 border-black">
            <div className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 mr-2 text-black" />
              <p className="font-semibold text-neutral-900">Success! Data Published</p>
            </div>
            <pre className="whitespace-pre-wrap text-xs text-neutral-700 bg-neutral-50 p-2 rounded max-h-40 overflow-y-auto">
              {JSON.stringify(apiResult, null, 2)}
            </pre>
          </div>
        );
      case 'error':
        return (
          <div className="p-4 bg-white rounded-lg shadow-inner border-l-4 border-black">
            <div className="flex items-center mb-2">
              <AlertTriangle className="w-5 h-5 mr-2 text-black" />
              <p className="font-semibold text-neutral-900">API Error Occurred</p>
              <button onClick={() => setStatus('idle')} className='ml-auto text-neutral-500 hover:text-black'>
                <X className='w-4 h-4' />
              </button>
            </div>
            <p className="text-xs text-neutral-700 bg-neutral-100 p-2 rounded border border-neutral-300">
              {errorDetails || 'An unknown error occurred during the request.'}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    // Outer Modal Overlay (Fixed, full screen, dark background)
    <div
      className="fixed screen inset-0 z-50 flex items-center justify-center bg-neutral-900/50 backdrop-blur-sm p-4 overflow-hidden"
      onClick={onClose} // Close when clicking the backdrop
      id={'hide-scrollbar'}
    >

      {/* Dialog Content Container (Responsive sizing: max-w-4xl is 56rem) */}
      <div
        className="w-full max-w-4xl mx-auto bg-neutral-50 rounded-xl shadow-2xl border border-neutral-200 font-sans my-8 transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content
      >

        {/* Dialog Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-neutral-200">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Export Content to External API
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-black transition-colors p-1 rounded-full hover:bg-neutral-200"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dialog Content Area */}
        {/* Uses flex-col (stacks) on mobile, and grid-cols-2 (side-by-side) on desktop/lg screens */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 max-h-[80vh] overflow-y-auto">

          {/* LEFT COLUMN: API Configuration */}
          <div className="flex flex-col space-y-6">
            <p className="text-sm text-neutral-600 border-b pb-3 border-neutral-200">
              Configure the API endpoint, authentication details, and HTTP method.
            </p>

            {/* API Endpoint and Auth */}
            <div className="space-y-4">
              <InputField
                className={''}
                label="API Endpoint URL"
                icon={Globe}
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                placeholder="e.g., https://api.service.com/data"
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/3">
                  <label className="text-xs font-medium text-neutral-600 flex items-center mb-1">
                    <Code className="w-3.5 h-3.5 mr-1" />
                    HTTP Method
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                  </select>
                </div>
                <div className="w-full sm:w-2/3">
                  <InputField
                    label="Authorization Header (e.g., Bearer Token)"
                    icon={Key}
                    className={''}
                    value={authHeader}
                    onChange={(e) => setAuthHeader(e.target.value)}
                    placeholder="e.g., Bearer asdf123..."
                    type="password"
                  />
                </div>
              </div>
            </div>

            {/* Custom Body Editor */}
            <div className="p-4 bg-white rounded-lg border border-neutral-300 shadow-inner flex-grow">
              <h3 className="text-sm font-semibold mb-3 text-neutral-800 flex items-center">
                <Code className="w-4 h-4 mr-2" />
                Custom JSON Body Editor (Data)
              </h3>

              {/* Current Properties Display */}
              <div className="mb-4 space-y-2 max-h-40 overflow-y-auto pr-2">
                {Object.entries(customBody).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-2 bg-neutral-100 rounded-md border border-neutral-200">
                          <span className="text-xs font-mono text-neutral-700 truncate">
                              <span className="font-semibold text-black">{key}:</span> {JSON.stringify(value?.slice(0, 30))}
                          </span>
                    <button
                      onClick={() => handleRemoveProperty(key)}
                      className="text-neutral-500 hover:text-black transition-colors p-1 flex-shrink-0 ml-2"
                      aria-label={`Remove property ${key}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Property Inputs - stack on extra small screens */}
              <div className="flex flex-col xs:flex-row gap-2 items-end pt-3 border-t border-neutral-200">
                <div className='flex-1 flex-row flex space-x-2'>
                  <InputField
                    label="New Key"
                    icon={null}
                    className={''}
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    placeholder="e.g., 'title'"
                  />
                  <InputField
                    icon={null}
                    className={''}
                    label="New Value (JSON or String)"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="e.g., 'Jane Doe' or 123 or [1,2]"
                  />
                </div>
                <button
                  onClick={handleAddProperty}
                  disabled={!newKey.trim() || !newValue.trim()}
                  className={cn(
                    "h-10 w-full xs:w-10 flex-shrink-0 flex items-center justify-center rounded-lg font-medium transition-colors",
                    "bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:text-neutral-500"
                  )}
                  aria-label="Add property"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Payload Preview & Action */}
          <div className="lg:order-last order-first flex flex-col space-y-4">

            {/* Payload Preview */}
            <div className="flex-grow">
              <h3 className="text-sm font-semibold mb-2 text-neutral-800">
                Full JSON Payload
              </h3>
              <pre id={'hide-scrollbar'} className="bg-neutral-900 text-neutral-100 p-4 rounded-lg text-xs overflow-x-auto border border-neutral-700 h-56 lg:h-80 whitespace-pre-wrap">
                  {payload}
              </pre>
            </div>

            {/* Status Feedback Area */}
            <div className="min-h-[60px]">
              <StatusIndicator />
            </div>

            {/* Action Button */}
            <button
              onClick={handleSend}
              disabled={status === 'loading'}
              className={cn(
                "w-full flex items-center justify-center h-10 px-4 py-2 rounded-lg font-medium transition-colors",
                "bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:text-neutral-500",
                "shadow-md hover:shadow-lg flex-shrink-0"
              )}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending to API...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Content Now ({method})
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
