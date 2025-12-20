# malesin_shoescare Monorepo

A production-ready monorepo for **malesin_shoescare** shoe cleaning service, featuring a neo-brutalist landing page and CleanStride admin dashboard.

## 🏗️ Project Structure

```
malesin-shoescare/
├── apps/
│   ├── landing/          # Public landing page (Vite + React)
│   └── admin/            # Admin dashboard (Vite + React)
├── packages/
│   └── ui/               # Shared UI components & design tokens
├── src/                  # Legacy admin (original codebase)
└── pnpm-workspace.yaml   # Workspace configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Laravel backend running on port 8000

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev:landing    # Landing page on http://localhost:5173
pnpm dev:admin      # Admin panel on http://localhost:5174
pnpm dev            # Legacy admin on http://localhost:8080
```

### Available Scripts

| Command              | Description                   |
| -------------------- | ----------------------------- |
| `pnpm dev:landing`   | Start landing page dev server |
| `pnpm dev:admin`     | Start admin panel dev server  |
| `pnpm dev`           | Start legacy admin dev server |
| `pnpm build:all`     | Build all apps                |
| `pnpm build:landing` | Build landing page            |
| `pnpm build:admin`   | Build admin panel             |

## 📱 Apps

### Landing Page (`apps/landing`)

- **URL**: http://localhost:5173
- **Style**: Neo-brutalist design
- **Features**:
  - Services showcase (from backend API)
  - Online booking form
  - Customer reviews
  - Gallery carousel
  - WhatsApp & Instagram integration

### Admin Dashboard (`apps/admin`)

- **URL**: http://localhost:5174
- **Style**: Clean, professional
- **Features**:
  - Order management
  - Service management
  - Transaction reports
  - Export PDF/Excel/CSV
  - Photo upload

## 🔗 Backend API

The frontend connects to a Laravel backend at `http://localhost:8000`.

### Public Endpoints (no auth)

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | `/api/public/services` | List active services |
| POST   | `/api/public/booking`  | Create booking       |

### Protected Endpoints (requires auth)

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/api/login`           | User login           |
| GET    | `/api/orders`          | List orders          |
| POST   | `/api/orders`          | Create order         |
| GET    | `/api/services`        | List all services    |
| GET    | `/api/dashboard/stats` | Dashboard statistics |

## 📍 Business Info

- **Location**: TirtoUtomo, Landungsari Malang
- **Hours**: 08:30 - 17:00 (Mon-Fri)
- **WhatsApp**: +62 882-1080-6864
- **Instagram**: [@malesin_shoecare](https://instagram.com/malesin_shoecare)

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Shadcn/ui
- **State**: TanStack Query
- **Monorepo**: pnpm workspaces
- **Backend**: Laravel, MySQL, Sanctum

## 📝 License

Private - malesin_shoescare © 2025
