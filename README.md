# 🎓 CollegeDiscover

> A production-grade college discovery and comparison platform for Indian students.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-college--discover--topaz.vercel.app-blue?style=for-the-badge&logo=vercel)](https://college-discover-topaz.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=for-the-badge&logo=postgresql)](https://neon.tech)

---

## 🌐 Live Demo

**[https://college-discover-topaz.vercel.app](https://college-discover-topaz.vercel.app)**

---

## ✨ Features

### 🔍 College Search & Listing
- Full-text search across college name, city, and state
- Filter by **category** (Engineering, Medical, Management, Law, Arts, Science), **type** (Government/Private), **state**, fees range, and minimum rating
- Sort by rating, fees (asc/desc), or name
- Paginated grid with skeleton loading states, active filter chips, and a mobile-friendly filter drawer

### 📄 College Detail Pages
- Hero section with gradient initials avatar, key stats, and save button
- Full course listings with duration, fees, and seat count
- Placement statistics with animated progress bars
- Student reviews with star ratings
- "Similar Colleges" section based on category + state

### ⚖️ Compare Colleges
- Add up to **3 colleges** side-by-side from any card via a persistent Compare Tray
- Comparison table across 9 metrics — fees, packages, placement rate, rating, and more
- Highlights the **best value** cell in each row with green accent
- Compare state persists across page navigation (Zustand + localStorage)

### 🔖 Saved Colleges
- Bookmark any college while browsing
- Persisted per-user in the database (requires login)
- Dedicated `/saved` page with one-click unsave

### 🔐 Authentication
- Email/password sign-up and login via **NextAuth v5**
- Secure JWT sessions
- Protected routes via Next.js Middleware
- Redirects to intended page after login

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS |
| Server State | TanStack Query v5 |
| Global State | Zustand + localStorage |
| Auth | NextAuth v5 (Credentials) |
| ORM | Prisma v5 |
| Database | PostgreSQL (Neon) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/rachitgrg/CollegeDiscover.git
cd CollegeDiscover
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Push the database schema & seed data

```bash
npm run db:push
npm run db:seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth + Sign-up endpoints
│   │   ├── colleges/      # GET /api/colleges, GET /api/colleges/[id]
│   │   └── saved/         # GET/POST/DELETE saved colleges
│   ├── auth/              # Login & Sign-up pages
│   ├── colleges/          # Listing page + [id] detail page
│   ├── compare/           # Side-by-side comparison page
│   └── saved/             # Saved colleges page
├── components/
│   ├── college/           # CollegeCard, CollegeHeader, CollegeStats, SaveButton
│   ├── compare/           # CompareTable, CompareTray, CompareAddButton
│   ├── layout/            # Navbar, Footer, PageWrapper
│   ├── search/            # SearchBar, FilterPanel, FilterChip
│   └── ui/                # Button, Input, Badge, Card, Skeleton, Spinner, etc.
├── hooks/                 # useColleges, useCollege, useCompare, useSaved
├── lib/                   # prisma.ts, auth.ts, utils.ts, validations.ts
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # 59 colleges with courses & reviews
├── store/                 # Zustand compare store
└── types/                 # TypeScript type definitions
```

---

## 🗄️ Database Schema

```
College → Course (one-to-many)
College → Review (one-to-many)
User    → Review (one-to-many)
User    → SavedCollege (many-to-many with College)
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed 59 colleges with data |
| `npm run db:studio` | Open Prisma Studio |

---

## 🚢 Deployment

This project is deployed on **Vercel** with **Neon PostgreSQL**.

To deploy your own instance:

1. Fork this repository
2. Import it on [Vercel](https://vercel.com)
3. Add the following environment variables in Vercel:
   - `DATABASE_URL` — your Neon connection string
   - `NEXTAUTH_SECRET` — any random secure string
4. Click **Deploy**

---

## 📸 Pages at a Glance

| Page | Route |
|---|---|
| College Listing | `/colleges` |
| College Detail | `/colleges/[id]` |
| Compare | `/compare` |
| Saved | `/saved` |
| Login | `/auth/login` |
| Sign Up | `/auth/signup` |

---

## 📄 License

MIT © [Rachit Garg](https://github.com/rachitgrg)
