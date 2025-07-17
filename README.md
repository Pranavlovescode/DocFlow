# 🧾 DocFlow – Document Versioning System

**DocFlow** is a full-stack web application that enables users to upload, manage, and version documents (PDFs, Word files, etc.) with ease. Think of it as **Git for documents** – with a clean UI, version history tracking, and efficient file storage.

> Built with **Spring Boot**, **MongoDB + GridFS**, and a modern frontend stack using **React + Vite + Tailwind + Shadcn UI**.

---

## 🚀 Features

- 🔐 User Authentication (Register & Login)
- 📄 Upload and manage documents
- 🧾 Versioning support per document
- 🕓 View all document upload history
- ⬇️ Download specific document versions
- 🌐 Responsive and modern UI using TailwindCSS
- 💾 Stores files efficiently using MongoDB GridFS

---

## 🛠️ Tech Stack

| Frontend              | Backend           | Database         | File Storage |
|-----------------------|-------------------|------------------|--------------|
| React + Vite          | Spring Boot       | MongoDB Atlas    | GridFS       |
| TailwindCSS + Shadcn  | Spring Security   | JWT Auth         |              |

---

## 📚 Use Cases

- 🧑‍💼 Freelancers/Agencies sharing evolving project files
- 🏫 Students submitting academic work with revision tracking
- 🏢 Teams collaborating on legal or technical documents
- 🧾 Businesses maintaining and updating policy docs or contracts

---

## 📦 Setup Instructions

### ✅ Prerequisites

- Java 17+
- Node.js 18+
- MongoDB Atlas account (or local MongoDB instance)

### 🖥️ Backend – Spring Boot

```bash
cd backend
./mvnw spring-boot:run
```

```bash
cd frontend
pnpm i
pnpm run dev
```

The frontend will run at http://localhost:5173

---

## ✍️ Author  
**Pranav Titambe**  
🌐 [pranavtitambe.in](https://pranavtitambe.in)  
📧 [Connect on LinkedIn](https://www.linkedin.com/in/pranav-titambe)

---


## 🌍 Live Demo
Coming soon at: https://docflow.pranavtitambe.in

---

## ⭐️ Show Your Support
If you find this project useful, please give it a ⭐️ on GitHub and consider contributing!