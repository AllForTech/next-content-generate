# ThinkInk: The Professional Content Architect

ThinkInk is a powerful, **AI-driven content generation platform** designed for content creators. It leverages cutting-edge **Retrieval-Augmented Generation (RAG)** to ensure generated outputs are not only stylish and well-structured but also **grounded in real-time, verifiable facts**—eliminating common AI hallucinations.

## ✨ Features

* **Fact-Grounded Generation (RAG):** Utilizes the **Tavily Search API** within an AI tool-calling workflow to gather real-time data, ensuring all generated content is highly accurate and up-to-date.
* **Structured, Presentation-Ready Output:** The AI is meticulously prompted to generate content in a **Gamma.app-style Markdown structure**, complete with strict formatting rules, clear headings, and visual placeholders for easy frontend rendering.
* **Real-time Streaming:** Content is streamed instantly from the server using the **Vercel AI SDK**, providing a dynamic and highly responsive user experience.
* **Professional Styling:** Markdown is rendered using the **Tailwind Typography plugin**, offering polished, magazine-quality styling for all text and data elements (tables, lists, code).
* **Secure Authentication:** **Supabase** is used for robust, scalable user authentication, including support for **Google OAuth**.
* **Modern UI/UX:** A sleek and intuitive interface built with Next.js, **Tailwind CSS**, and **shadcn/ui**.

## 🛠️ Tech Stack

| Category | Component | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | Modern, full-stack React framework. |
| **AI/RAG** | **Google Gemini API** & **Vercel AI SDK** | Core generation and streaming. |
| **Data Retrieval** | **Tavily AI** | Real-time, fact-checking search API. |
| **Database/Auth** | **Supabase** | Secure user authentication and management. |
| **Styling/UI** | [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) | Modular, utility-first styling and component library. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Enhanced code reliability and maintainability. |
| **State Management** | [React Context API](https://react.dev/reference/react/createContext) | Application state management. |
| **Icons** | [Lucide React](https://lucide.dev/guide/packages/lucide-react) | Vector icons for the UI. |

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn

### Installation

1.  Clone the repository:

    ```sh
    git clone [https://github.com/AllForTech/next-content-generate.git](https://github.com/AllForTech/next-content-generate.git)
    ```
    
2.  Install dependencies:

    ```sh
    npm install
    ```
    
3.  Set up your environment variables by creating a `.env.local` file in the root of your project and adding the following:

    ```env
    # AI Credentials
    GEMINI_API_KEY=your_gemini_api_key
    TAVILY_API_KEY=your_tavily_api_key

    # Supabase Credentials
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    # NOTE: Supabase requires setting up Google Client ID/Secret in its Dashboard
    ```

4.  Run the development server:

    ```sh
    npm run dev
    ```
    
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

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

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.