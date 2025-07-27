# 🗓️ Roster Management App

A friendly, lightweight scheduler for busy healthcare teams. Built with modern React (Next.js 15), TypeScript, Tailwind CSS, and Redux Toolkit.

> **Why?**  Keeping an eye on dozens of clinicians, rooms, and sessions is hard. This app turns chaotic spreadsheets into a single, colourful calendar you can trust.

## 📸 Demo
Run `npm run dev` and open <http://localhost:3000> – the mock data will give you a feel for the workflow in seconds.

## ✨ Key Features

| Group | Highlights |
|-------|------------|
| Scheduling | Calendar & Slots view, colour-coded status, quick week navigation |
| Filtering  | Combine service, provider type, and centre filters with real-time search |
| UX Goodies | Hover tooltips, smooth transitions, keyboard shortcuts |
| Mobile-first | Fully responsive from 320 px up – no pinching required |

## 🛠️ Tech Stack

* **Next.js 15** (Turbopack)
* **React 19** + **TypeScript 5**
* **Tailwind 4** for styling, **Lucide** for icons
* **Redux Toolkit** + typed hooks
* **SWR** + **date-fns** for data and date handling

## 🚀 Quick Start
```bash
# 1 – Clone
git clone <repo> && cd roster-management-app-assignment

# 2 – Install deps
npm install

# 3 – Develop
npm run dev  # http://localhost:3000

# 4 – Production
npm run build && npm start
```
No env vars are needed locally – the app ships with static mock data (`lib/mockData.ts`). Point `NEXT_PUBLIC_API_URL` to your backend when you are ready.

## 📂 Project Layout (TL;DR)
```
components/   Reusable UI & feature components
hooks/        Custom React hooks (data & logic)
lib/          Types, helpers, mock data
pages/        Next.js routes & API stubs
store/        Redux slices & typed hooks
styles/       Tailwind config & globals
```

## 🔧 Useful Scripts
* `dev` – run the Turbopack dev server
* `build` – create an optimised production build
* `start` – start the compiled build
* `lint` – ESLint (with `--fix` coming soon)

## 📜 License
MIT © 2025

---
Made with ☕ & ❤️  by Harshit Soni
