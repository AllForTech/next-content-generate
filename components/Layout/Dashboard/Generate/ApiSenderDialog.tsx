'use client';
import React, { useState } from 'react';
import {
  Send,
  Globe,
  Key,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Database,
  X,
  Code,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContent } from '@/context/GenerationContext';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export const ApiSenderDialog = ({ isOpen, onClose }) => {
  // Mock hook usage
  const { generatedContent } = useContent();

  // Initialize customBody with the mocked generated content
  const [customBody, setCustomBody] = useState({ content: `${generatedContent}` });

  // --- State for API Configuration ---
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [method, setMethod] = useState('POST');
  const [authHeader, setAuthHeader] = useState('');

  // --- State for Body Editor ---
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  // --- State for API Call Feedback ---
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [apiResult, setApiResult] = useState(null);
  const [errorDetails, setErrorDetails] = useState('');

  if (!isOpen) return null;

  // The actual JSON payload to be sent (using useMemo for optimization)
  const payload = JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      source_component: 'ai_content_generator',
      data: customBody,
    },
    null,
    2,
  );

  // --- Body Handlers ---
  const handleAddProperty = () => {
    const key = newKey.trim();
    if (key && newValue.trim() !== '') {
      // Simple attempt to parse value as JSON (e.g., number, boolean, array)
      let parsedValue = newValue;
      try {
        // Attempt to parse if it looks like JSON or simple value
        if (
          newValue.startsWith('{') ||
          newValue.startsWith('[') ||
          !isNaN(Number(newValue)) ||
          newValue === 'true' ||
          newValue === 'false'
        ) {
          parsedValue = JSON.parse(newValue);
        }
      } catch (e) {
        // If parsing fails, treat it as a string
        parsedValue = newValue;
      }

      setCustomBody((prev) => ({
        ...prev,
        [key]: parsedValue,
      }));
      setNewKey('');
      setNewValue('');
    }
  };

  const handleRemoveProperty = (keyToRemove: string) => {
    setCustomBody((prev) => {
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
  };

  // Status Indicator
  const StatusIndicator = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex items-center rounded-lg border border-neutral-200 bg-neutral-100 p-3 text-sm text-neutral-700">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
            Sending data...
          </div>
        );
      case 'success':
        return (
          <div className="rounded-lg border-l-4 border-black bg-neutral-100 p-4 shadow-inner">
            <div className="mb-2 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-black" />
              <p className="font-semibold text-neutral-900">Success! Data Published</p>
            </div>
            <pre className="max-h-40 overflow-y-auto rounded bg-neutral-50 p-2 text-xs whitespace-pre-wrap text-neutral-700">
              {JSON.stringify(apiResult, null, 2)}
            </pre>
          </div>
        );
      case 'error':
        return (
          <div className="rounded-lg border-l-4 border-black bg-white p-4 shadow-inner">
            <div className="mb-2 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-black" />
              <p className="font-semibold text-neutral-900">API Error Occurred</p>
              <button
                onClick={() => setStatus('idle')}
                className="ml-auto text-neutral-500 hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="rounded border border-neutral-300 bg-neutral-100 p-2 text-xs text-neutral-700">
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
      className="screen fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-neutral-900/50 p-4 backdrop-blur-xs"
      onClick={onClose} // Close when clicking the backdrop
      id={'hide-scrollbar'}
    >
      {/* Dialog Content Container (Responsive sizing: max-w-4xl is 56rem) */}
      <motion.div
        initial={{ opacity: 0, scale: .8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="mx-auto my-8 w-full max-w-4xl transform rounded-xl border border-neutral-200 overflow-hidden bg-neutral-50 font-sans shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
        id={'hide-scrollbar'}
      >
        {/* Dialog Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 p-4 sm:p-6">
          <h2 className="flex items-center text-lg font-bold text-neutral-900 sm:text-xl">
            <Database className="mr-2 h-5 w-5" />
            Export Content to External API
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-black"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dialog Content Area */}
        {/* Uses flex-col (stacks) on mobile, and grid-cols-2 (side-by-side) on desktop/lg screens */}
        <div className="grid max-h-[80vh] grid-cols-1 gap-6 overflow-y-auto p-4 sm:p-6 lg:grid-cols-[1fr_400px]">
          {/* LEFT COLUMN: API Configuration */}
          <div className="flex flex-col space-y-6">
            <p className="border-b border-neutral-200 pb-3 text-sm text-neutral-600">
              Configure the API endpoint, authentication details, and HTTP method.
            </p>

            {/* API Endpoint and Auth */}
            <div className="space-y-4">
              <InputField
                className={''}
                label="API Endpoint URL"
                icon={Globe}
                type={'url'}
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                placeholder="e.g., https://api.service.com/data"
              />

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="w-full sm:w-1/3">
                  <label className="mb-1 flex items-center text-xs font-medium text-neutral-600">
                    <Code className="mr-1 h-3.5 w-3.5" />
                    HTTP Method
                  </label>
                  <Select
                    value={method}
                    defaultValue={'POST'}
                    onValueChange={(value) => setMethod(value)}
                  >
                    <SelectTrigger className="w-full">
                      {/* SelectValue displays the currently selected option based on the 'value' prop of the parent Select */}
                      <SelectValue className={'text-xs'} placeholder="Select a method" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* The value prop of SelectItem corresponds to the 'value' passed to onValueChange */}
                      <SelectItem className={'text-xs hover:bg-neutral-200'} value="POST">POST</SelectItem>
                      <SelectItem className={'text-xs hover:bg-neutral-200'} value="PUT">PUT</SelectItem>
                      <SelectItem className={'text-xs hover:bg-neutral-200'} value="PATCH">PATCH</SelectItem>
                    </SelectContent>
                  </Select>
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
            <div className="flex-grow rounded-lg border border-neutral-300 bg-white p-4 shadow-inner">
              <h3 className="mb-3 flex items-center text-sm font-semibold text-neutral-800">
                <Code className="mr-2 h-4 w-4" />
                Custom JSON Body Editor (Data)
              </h3>

              {/* Current Properties Display */}
              <div className="mb-4 max-h-40 space-y-2 overflow-y-auto pr-2">
                {Object.entries(customBody).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-md border border-neutral-200 bg-neutral-100 p-2"
                  >
                    <span className="truncate font-mono text-xs text-neutral-700">
                      <span className="font-semibold text-black">{key}:</span>{' '}
                      {JSON.stringify(value?.slice(0, 30))}
                    </span>
                    <button
                      onClick={() => handleRemoveProperty(key)}
                      className="ml-2 flex-shrink-0 p-1 text-neutral-500 transition-colors hover:text-black"
                      aria-label={`Remove property ${key}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Property Inputs - stack on extra small screens */}
              <div className="xs:flex-row flex flex-col items-end gap-2 border-t border-neutral-200 pt-3">
                <div className="flex flex-1 flex-row space-x-2">
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
                    'xs:w-10 flex h-10 w-full flex-shrink-0 items-center justify-center rounded-lg font-medium transition-colors',
                    'bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:text-neutral-500',
                  )}
                  aria-label="Add property"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Payload Preview & Action */}
          <div className="order-first flex flex-col space-y-4 lg:order-last">
            {/* Payload Preview */}
            <div className="flex-grow">
              <h3 className="mb-2 text-sm font-semibold text-neutral-800">Full JSON Payload</h3>
              <pre
                id={'hide-scrollbar'}
                className="h-56 overflow-x-auto rounded-lg border border-neutral-700 bg-neutral-900 p-4 text-xs whitespace-pre-wrap text-neutral-100 lg:h-80"
              >
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
                'flex h-10 w-full items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors',
                'bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:text-neutral-500',
                'flex-shrink-0 shadow-md hover:shadow-lg',
              )}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending to API...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Content Now ({method})
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


const InputField = ({
                      label,
                      icon: Icon,
                      value,
                      onChange,
                      placeholder,
                      type = 'text',
                      readOnly = false,
                      className,
                    }) => (
  <div className={cn('flex flex-col space-y-1', className)}>
    <label className="flex items-center text-xs font-medium text-neutral-600">
      {Icon && <Icon className="mr-1 h-3.5 w-3.5" />}
      {label}
    </label>
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        'w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900',
        'transition-shadow placeholder:text-neutral-400 focus:ring-2 focus:ring-black/60 focus:outline-none',
      )}
    />
  </div>
);
