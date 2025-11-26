<div align="center">
  <br />

 <h1 align="center">Think-Ink</h1>
  <h3 align="center">✨ ThinkInk is a powerful, AI-driven content generation platform designed for content creators. ✨</h3>

  <p align="center">
    Create stylish, structured, and <strong>fact-checked</strong> content in seconds.
    <br />
  </p>

  <p align="center">
    <a href="https://github.com/AllForTech/Think-Ink_content_generate/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/AllForTech/Think-Ink_content_generate?style=for-the-badge&color=black" alt="Contributors" />
    </a>
    <a href="https://github.com/AllForTech/Think-Ink_content_generate/network/members">
      <img src="https://img.shields.io/github/forks/AllForTech/Think-Ink_content_generate?style=for-the-badge&color=black" alt="Forks" />
    </a>
    <a href="https://github.com/AllForTech/Think-Ink_content_generate/stargazers">
      <img src="https://img.shields.io/github/stars/AllForTech/Think-Ink_content_generate?style=for-the-badge&color=black" alt="Stars" />
    </a>
    <a href="https://github.com/AllForTech/Think-Ink_content_generate/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/AllForTech/Think-Ink_content_generate?style=for-the-badge&color=black" alt="License" />
    </a>
  </p>
</div>

<br />

<div align="center" style="overflow: hidden;">
  <img src="assets/hero_image.png" alt="ThinkInk Dashboard" width="90%" style="border-radius: 20px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
</div>

<br />

<details>
  <summary><strong>📚 Table of Contents (Click to Expand)</strong></summary>
  <br />

- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📜 Available Scripts](#-available-scripts)
- [📄 License](#-license)
</details>

<br />

---

## ✨ Key Features

ThinkInk goes beyond simple text generation. We treat content creation as an engineering problem, solving for accuracy, speed, and style.

<table>
  <tr>
    <td width="50%">
      <h3 align="center">🧠 Fact-Grounded RAG</h3>
      <p align="center">No more hallucinations. We use <strong>Tavily Search API</strong> to fetch real-time data before generation, ensuring your content is factually accurate.</p>
    </td>
    <td width="50%">
      <h3 align="center">⚡ Real-Time Streaming</h3>
      <p align="center">Powered by <strong>Vercel AI SDK</strong>. Watch your content appear instantly character-by-character. No waiting for loading spinners.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center">🎨 Professional Styling</h3>
      <p align="center">Markdown is rendered via <strong>Tailwind Typography</strong>. Tables, lists, and headers look magazine-quality right out of the box.</p>
    </td>
    <td width="50%">
      <h3 align="center">📅 Automated Scheduling</h3>
      <p align="center">Set it and forget it. Configure Cron jobs to generate content based on trending topics while you sleep.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center">🔐 Secure Auth</h3>
      <p align="center">Enterprise-grade security using <strong>Supabase</strong> with full Google OAuth integration.</p>
    </td>
    <td width="50%">
      <h3 align="center">📄 DOCX Export</h3>
      <p align="center">Take your content offline. Seamlessly export your generated blogs to <code>.docx</code> format.</p>
    </td>
  </tr>
</table>

<br />

---

## 🛠️ Tech Stack

We use the bleeding edge of the React ecosystem to deliver a high-performance experience.

<div align="center">

  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind" alt="Frontend" />
  <br />

  <img src="https://skillicons.dev/icons?i=supabase,postgresql,vercel,gcp" alt="Backend" />

</div>

<br />

| Category        | Technology                      |
| :-------------- | :------------------------------ |
| **Framework**   | Next.js 14 (App Router)         |
| **AI Model**    | Google Gemini Pro/Vercel AI SDK |
| **Data Source** | Tavily AI Search/Cheerio        |
| **Database**    | Supabase (PostgreSQL)           |
| **Styling**     | Tailwind CSS + Shadcn/ui        |
| **Icons**       | Lucide React                    |

<br />

---

## 🚀 Getting Started

Follow these steps to set up your local newsroom.

### 📋 Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- API Keys for **Google Gemini**, **Tavily**, and **Supabase**.

### 🔧 Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/AllForTech/Think-Ink_content_generate.git](https://github.com/AllForTech/Think-Ink_content_generate.git)
    cd Think-Ink_content_generate
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env.local` file in the root directory and add your keys:

    ```bash
    cp .env.example .env.local
    # Edit .env.local with your specific API keys
    ```

4.  **Ignition**

    ```bash
    npm run dev
    ```

    Visit `http://localhost:3000` to start creating.

<br />

---

## 📜 Available Scripts

| Command          | Action                                   |
| :--------------- | :--------------------------------------- |
| `npm run dev`    | 🟢 Starts the development server         |
| `npm run build`  | 🏗️ Builds the application for production |
| `npm run start`  | 🚀 Starts the production server          |
| `npm run lint`   | 🧹 Runs ESLint to check for code quality |
| `npm run format` | 💅 Formats code using Prettier           |

<br />

---

<div align="center">

## 🤝 Contributing

  <p>Contributions are welcome! Feel free to check the <a href="https://github.com/AllForTech/Think-Ink_content_generate/issues">issues page</a>.</p>

<h3>📄 License</h3>
  <p>Distributed under the <strong>MIT License</strong>.</p>

  <p>
    <br />
    Made with ❤️ by the <a href="https://www.allfortech.org">AllForTech</a> Team
  </p>
</div>
