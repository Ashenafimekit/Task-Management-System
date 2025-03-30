# Task Management System

## 📌 Overview
This is a simple **Task Management System** built with **Next.js (App Router), React, TypeScript, Prisma, Zustand, TanStack Query, and SQLite**. Users can **add, edit, delete, and manage tasks** efficiently with a user-friendly interface.

---

## 🚀 Features
- **Add New Task** 🆕
- **Edit Existing Task** ✏️
- **Delete Task** ❌
- **Task Status (Completed/Pending)** ✅❌
- **Persistent Data Storage with Prisma & SQLite** 💾
- **State Management using Zustand** 🎛️
- **Optimized Data Fetching with TanStack Query** 🔄

---

## 🏗️ Tech Stack
### **Frontend:**
- **Next.js (App Router)**
- **React with TypeScript**
- **ShadCN UI (Component Library)**
- **Tailwind CSS (Styling)**
- **Zustand (State Management)**
- **TanStack Query (Data Fetching & Caching)**

### **Backend:**
- **Next.js Server Actions/Functions**
- **Prisma (ORM for Database Handling)**
- **Zod (Schema Validation)**

### **Database:**
- **SQLite (Lightweight Embedded Database)**

---

## 📂 Folder Structure
```
my-app/
│── prisma/                  # Prisma setup
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Prisma schema
│── public/                  # Static assets
│── app/                     # Next.js App Router (main app directory)
│   ├── api/tasks/           # API routes for tasks (CRUD operations)
│   │   ├── route.ts         # GET & POST (Fetch & Create Tasks)
│   │   ├── [id]/route.ts    # GET, PUT, DELETE (Manage single task)
│   ├── page.tsx             # Main entry page
│── components/              # UI Components
│   ├── TaskList.tsx         # List all tasks
│   ├── TaskForm.tsx         # Form to add/edit tasks
│── hooks/                   # Custom Hooks
│   ├── useTasks.ts          # Fetching tasks with React Query
│── store/                   # Zustand State Management
│   ├── useTaskStore.ts      # Task state management
│── lib/                     # Helper utilities
│   ├── prisma.ts            # Prisma client setup
│   ├── validators.ts        # Zod validation schemas
│── .env                     # Environment variables
│── next.config.js           # Next.js configuration
│── tailwind.config.js       # Tailwind CSS configuration
│── tsconfig.json            # TypeScript configuration
│── package.json             # Dependencies & Scripts
│── README.md                # Documentation
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/ashenafimekit/task-management-system.git
cd task-management-system
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Prisma & Database
```sh
npx prisma migrate dev --name init
npx prisma generate
```

### 4️⃣ Start the Development Server
```sh
npm run dev
```

## 📝 License
This project is licensed under the **MIT License**.

---

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📞 Contact
For any questions, reach out via:
- **Email:** ashumekit502@gmail.com
- **LinkedIn:** [Ashenafi Mekit](https://www.linkedin.com/in/ashenafi-mekit)
- **Portfolio:** [ashenafimekit.vercel.app](https://ashenafimekit.vercel.app)

