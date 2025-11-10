# Project: ThinkInk - AI Content Generator

This project is a full-stack AI content generation platform named "ThinkInk". It's built with Next.js and utilizes the Google Gemini API to create various types of content.

## Key Technologies

*   **Framework:** Next.js
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui
*   **AI:** Google Gemini API (`gemini-2.5-flash-preview-05-20` model)
*   **Database:** Supabase
*   **Language:** TypeScript
*   **State Management:** React Context API

## Core Features

*   **AI-Powered Content Generation:** The main feature of the application. It uses the Gemini API to generate content based on user prompts. The generation is handled by the `/api/generate/route.ts` endpoint.
*   **Real-time Streaming:** The generated content is streamed from the server to the client in real-time for a better user experience.
*   **User Dashboard:** A dashboard is available for users to manage their generated content.
*   **Authentication:** The application uses Supabase for user authentication.

## Project Structure

The project follows a standard Next.js `app` directory structure.

*   `app/(auth)`: Contains authentication-related pages like sign-in and sign-up.
*   `app/(root)`: Contains the main application pages, including the dashboard.
*   `app/api`: Contains the API routes. The most important one is `app/api/generate/route.ts`, which handles the content generation.
*   `components`: Contains the React components, organized by feature (Auth, Layout, UI).
*   `context`: Contains the React context providers for managing global state, such as `GenerationContext.tsx`.
*   `lib`: Contains utility functions, the database schema (`lib/schema.ts`), and AI-related logic (`lib/AI/ai.actions.ts`).
*   `utils/supabase`: Contains the Supabase client and middleware.

## How to Run the Project

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Set up environment variables:**
    Create a `.env.local` file and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_gemini_api_key
    ```
    You will also need to add your Supabase URL and anon key to the environment variables.

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

## How to Build the Project

```bash
npm run build
```

## How to Start the Production Server

```bash
npm run start
```

## Linting and Formatting

*   **Linting:** `npm run lint`
*   **Formatting:** `npm run format`
