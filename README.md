# ThinkInk - AI Content Generator

ThinkInk is a powerful, AI-driven content generation platform built with Next.js and Google's Gemini API. It provides a seamless experience for creating diverse types of content, from blog posts to marketing copy, with the help of advanced AI.

## ✨ Features

- **AI-Powered Content Generation**: Utilizes the Google Gemini API to generate high-quality, context-aware content based on user prompts.
- **Real-time Streaming**: Content is streamed from the server in real-time, providing a dynamic and responsive user experience.
- **Markdown and Code Support**: The generated content is rendered with full markdown support, including syntax highlighting for code blocks.
- **Modern UI/UX**: A sleek and intuitive interface built with Next.js, Tailwind CSS, and shadcn/ui.
- **Authentication**: Secure user authentication and management.
- **Dashboard**: A user-friendly dashboard to manage and generate content.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **AI**: [Google Gemini API](https://ai.google.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [React Context API](https://react.dev/reference/react/createContext)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/ai_content_generator.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up your environment variables by creating a `.env.local` file in the root of your project and adding the following:
    ```env
    GEMINI_API_KEY=your_gemini_api_key
    ```
4.  Run the development server
    ```sh
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
/
├── app/
│   ├── (auth)/         # Authentication pages
│   ├── (root)/         # Main application pages
│   └── api/            # API routes
├── components/
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Layout components
│   └── ui/             # UI components from shadcn/ui
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and database schema
└── public/             # Static assets
```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.