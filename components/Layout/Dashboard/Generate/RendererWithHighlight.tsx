'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ScrollArea } from '@/components/ui/scroll-area'; // For code blocks

// Custom component to handle your image placeholders
const CustomImagePlaceholder = ({ value }) => {
  // Extracts the description inside
  const description = value.match(/\[image:\s*(.*?)]/)?.[1] || "Visual Content";

  return (
    <div className="image-placeholder-card p-6 bg-blue-50 border-l-4 border-blue-600 my-4 rounded-lg flex items-center justify-between shadow-sm">
      <p className="text-blue-800 font-semibold italic">
        Visual Placeholder: {description}
      </p>
      {/* You would eventually replace this with a real image API call here */}
      <span className="text-blue-600 text-3xl">🖼️</span>
    </div>
  );
};

export default function ContentGenerator({content}: { content: string }) {
  // ... useCompletion hook and state (isEditing) ...

  const mark =
    '# The Future of Edge Computing and the IoT: A 2026 Forecast\n' +
    '\n' +
    '## 📈 Macro Trends: Decentralization and Data Gravity\n' +
    '\n' +
    '\n' +
    'The next two years will see a critical shift as data processing moves closer to the source of generation (the "Edge"). This decentralization is driven by two main factors: regulatory pressure for data sovereignty and the sheer volume of data, which makes backhauling to centralized clouds inefficient and expensive.\n' +
    '\n' +
    '### Key Drivers for Edge Adoption\n' +
    '\n' +
    '* **Latency Requirements:** Critical for autonomous systems, AR/VR applications, and advanced manufacturing (Industry 5.0).\n' +
    '* **Cost Efficiency:** Reduces bandwidth expenditure by processing and filtering raw data locally.\n' +
    '* **Security Posture:** Isolating sensitive data processing to secure local enclaves minimizes attack surface area.\n' +
    '\n' +
    '## 🛠️ Technology Spotlight: TinyML and Specialized Chips\n' +
    '\n' +
    '\n' +
    'The proliferation of battery-powered IoT devices requires highly efficient processing. This is leading to the rise of specialized hardware and software methodologies like TinyML (Machine Learning on microcontrollers).\n' +
    '\n' +
    '### Comparison of Edge Processing Paradigms\n' +
    '\n' +
    '| Paradigm | Processor Type | Power Consumption | Ideal Use Case |\n' +
    '| :--- | :--- | :--- | :--- |\n' +
    '| **Traditional Cloud** | GPU/CPU Clusters | High | Training large models, batch processing. |\n' +
    '| **Fog Computing** | Server-grade CPUs | Medium | Regional data aggregation, complex analytics. |\n' +
    '| **TinyML (Edge)** | Microcontrollers/ASICs | Very Low | Real-time sensor monitoring, anomaly detection. |\n' +
    '\n' +
    '> The ability to run complex inference models at milliwatt levels is the single most disruptive factor for the next generation of IoT devices.\n' +
    '\n' +
    '## 🔒 Security and Trust at the Perimeter\n' +
    '\n' +
    '\n' +
    'Security remains the primary barrier to entry for many enterprise IoT deployments. The focus is shifting from simple password protection to identity-based and zero-trust security models that authenticate every device and connection.\n' +
    '\n' +
    '### Core Security Mandates\n' +
    '\n' +
    '1.  **Zero Trust Architecture:** Every device, user, and connection is verified, regardless of location.\n' +
    '2.  **Hardware Root of Trust:** Utilizing secure enclave hardware for cryptographic keys and boot verification.\n' +
    '3.  **Over-the-Air (OTA) Updates:** Secure, auditable mechanisms for patching firmware and models across millions of deployed devices.\n' +
    '\n' +
    '## 🌍 The Zorin OS Role in Edge Deployment';


  // Split the content into cards based on H2 (##)
  const cards = content ? content.split('\n## ').filter(c => c.trim() !== '') : [];

  return (
    <div className="container-full center flex-col">
      {/* ... form and editing logic ... */}

      <ScrollArea className="container-full !justify-start flex-col center mt-8">
        {cards && cards?.map((cardContent, index) => {
          // Re-add the H2 markdown syntax for ReactMarkdown to recognize it
          const content = index === 0 ? cardContent : `## ${cardContent}`;

          return (
            <div key={index} className="gamma-card p-6 mb-8 center flex-col border rounded-xl shadow-lg bg-white transition-all hover:shadow-2xl">
              <ReactMarkdown
                // Custom renderer for the placeholder tag
                components={{
                  text: ({ children }) => {
                    const text = String(children);
                    // Check if the text matches the image placeholder format
                    if (text.match(/[\[]image:\s*(.*?)]/)) {
                      return <CustomImagePlaceholder value={text} />;
                  }
                  return <>{children}</>;
                },
                  code: ({node, className, children, ...props}) => {
                  // Ensures code blocks look professional
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                  <SyntaxHighlighter
                  language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
              ) : (
              <code className={className} {...props}>
                {children}
              </code>
              )
              }
              }}
            >
              {content}
            </ReactMarkdown>
        </div>
        );
        })}
      </ScrollArea>
    </div>
  );
}