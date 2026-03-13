Slooze Commodities – Fullstack Challenge
=======================================

Overview
--------
GraphQL NestJS backend with a Next.js client for managing commodities (auth, roles, CRUD, dashboard). Manager and Store Keeper roles are enforced; demo data and accounts are seeded.

Stack
-----
- Backend: NestJS, Apollo GraphQL, Prisma (PostgreSQL), JWT auth.
- Frontend: Next.js App Router, Apollo Client, React Hook Form + Zod, Tailwind classes.

Repo structure
--------------
- `backend/` – NestJS API, Prisma schema, seed script.
- `frontend/` – Next.js app with dashboard, products, and auth flows.

Prerequisites
-------------
- Node.js 18+
- PostgreSQL database URL

Backend setup
-------------
```bash
cd backend
npm install
```

Configure environment:
- Set `DATABASE_URL` in `.env` (e.g., `postgresql://user:pass@localhost:5432/dbname`).

Database and seed:
```bash
npm run prisma:push
npm run seed
```

Run API (defaults to http://localhost:4000/graphql):
```bash
npm run start:dev
```

Frontend setup
--------------
```bash
cd frontend
npm install
```

Configure environment:
- Set `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4000`).

Run web app:
```bash
npm run dev
```

Demo accounts
-------------
- Manager: `manager@example.com` / `manager123`
- Store Keeper: `keeper@example.com` / `keeper123`

Key features
------------
- Login with JWT, role-based redirects and route guarding.
- Product list with search, filter, pagination; add/edit/delete; detail view.
- Dashboard KPIs for managers.
- Stock status auto-computed based on quantity.

Linting
-------
- Backend: `cd backend && npm run lint`
- Frontend: `cd frontend && npm run lint`
