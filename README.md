# Live TV Web App

A premium production-ready Live TV Web App inspired by HD Streamz APK style UI with modern, clean, unique web design.

## Tech Stack
- Next.js 14 (App Router)
- Firebase v9 modular SDK
- Firestore (Main Database)
- Firebase Auth (Admin Login)
- Firebase Analytics
- Tailwind CSS
- HLS.js
- PWA (next-pwa)
- Minimal dependencies

## Features
- Modern premium dark UI with glassmorphism
- 4-player system (HLS.js, HTML5, Iframe, HLS Retry)
- Admin panel with CRUD operations
- Live events system with auto status updates
- Category and country management
- Dynamic branding system
- PWA support
- Mobile-first responsive design

## Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`

## Firebase Configuration
The app uses the exact Firebase configuration provided in the requirements.

## Admin Access
- Super Admin Code: 258000
- Admin panel: `/admin`
- Login page: `/admin/login`

## API Endpoints
- `/api/channels` - Channel management
- `/api/live-events` - Live events management
- `/api/categories` - Category management
- `/api/countries` - Country management
- `/api/admin/*` - Admin operations
- `/api/settings` - App settings

## Database Collections
- channels
- liveEvents
- categories
- countries
- adminCodes
- settings
