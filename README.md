# 🌌 SmartTodo

SmartTodo is a premium, high-performance To-Do dashboard application built with **React JS**, **Vite**, and **custom CSS design system tokens**. It features an elegant dark mode theme with glassmorphic cards, smooth micro-interactions, progress tracking analytics, and automatic browser storage persistence.

---

## ✨ Features

- **📊 Progress Dashboard**: Visual analytics showing total tasks, pending count, and completed count alongside a dynamic completion progress bar.
- **📝 Full Task CRUD**: Add new tasks, toggle completed status, edit task text inline (double-click to edit), and delete tasks.
- **🔍 Search & Filter**: Real-time searching by title, and category filters (*All*, *Active*, *Completed*).
- **💾 Local Storage Persistence**: State is automatically synced to `localStorage`, so your list is preserved across page reloads.
- **🎨 Glassmorphic Dark UI**: Curated custom styling (fonts, variables, animations) responsive across mobile and desktop viewports.

---

## 🚀 Getting Started

Follow these step-by-step instructions to get a local copy of the project up and running.

### 📋 Prerequisites

Before starting, make sure you have the following installed on your machine:
- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)

### 📥 1. Clone the Repository

Clone the project from GitHub and navigate into the project directory:

```bash
git clone https://github.com/codesprinter/smart-todo.git
cd smart-todo
```

### 📦 2. Install Dependencies

Install all the required package dependencies:

```bash
npm install
```

This installs core libraries like **React**, **Vite**, and **Lucide React** (for modern icons).

### 💻 3. Run the Development Server

Start Vite's fast local development server:

```bash
npm run dev
```

Once started, the CLI will output the local network URL (usually `http://localhost:5173/` or `http://localhost:5174/` if the default port is in use). Open this URL in your web browser.

---

## 🛠️ Build & Verification Commands

### 🏗️ Build for Production

Compile and bundle the project files into a highly-optimized production distribution folder (`dist/`):

```bash
npm run build
```

### 🔍 Preview Production Build

Verify the production build locally before deployment:

```bash
npm run preview
```

### 🧹 Run Code Quality Linters

Scan the React code for style inconsistencies, warnings, or syntax issues using ESLint:

```bash
npm run lint
```

---

## 📦 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite 8](https://vite.dev/)
- **Icon Set**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (using variables and modern HSL grids)
