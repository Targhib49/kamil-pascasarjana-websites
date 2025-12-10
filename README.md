# Muslim Postgraduate Organization Website

A modern, full-stack web application built with Next.js 16, Supabase, and Tailwind CSS for managing a Muslim postgraduate community platform.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## 🌟 Features

### Public Features

- **📰 News & Articles** - Latest updates with category filtering
- **📅 Events Calendar** - Academic, Islamic, and community events
- **📚 Publications Archive** - Quarterly magazine with PDF viewer
- **🎮 Educational Games** - Interactive learning tools
- **🗺️ Campus Maps** - Interactive location finder
- **🕌 Prayer Times** - Accurate prayer time calculator
- **🧭 Qibla Finder** - Direction to Mecca
- **🌐 Bilingual** - Full English/Indonesian support

### Admin Features (Coming Soon)

- Content management system
- Rich text editor for articles
- Event management
- Publication uploads
- User management
- Role-based access control

## 🚀 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Component library

### Backend & Database

- **Supabase** - PostgreSQL database
- **Supabase Auth** - Authentication system
- **Supabase Storage** - File storage
- **Row Level Security** - Data protection

### Deployment

- **Vercel** - Hosting platform
- **GitHub** - Version control

## 📁 Project Structure

```
muslim-postgrad-org/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── news/                     # News section
│   │   ├── page.tsx              # News listing
│   │   └── [slug]/page.tsx       # Individual article
│   ├── events/page.tsx           # Events calendar
│   ├── publications/page.tsx     # Magazine archive
│   ├── about/page.tsx            # About page
│   ├── contact/page.tsx          # Contact page
│   ├── games/                    # Educational games
│   └── test-db/page.tsx          # Database connection test
├── components/                   # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── NewsSection.tsx
│   ├── NewsCard.tsx
│   └── UpdatesWindows.tsx
├── lib/                          # Utilities
│   └── supabase/
│       ├── client.ts             # Browser client
│       ├── server.ts             # Server client
│       └── queries.ts            # Database queries
├── public/                       # Static assets
├── proxy.ts                      # Next.js 15 proxy
├── next.config.js                # Next.js configuration
└── tailwind.config.ts            # Tailwind configuration
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Supabase account
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/muslim-postgrad-org.git
cd muslim-postgrad-org
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key

# Optional: Secret key for server-side operations
SUPABASE_SECRET_KEY=your_secret_key
```

### 4. Database Setup

1. Create a Supabase project at https://supabase.com
2. Run the SQL scripts in order:
   - `database-schema.sql` - Creates tables
   - `rls-policies.sql` - Sets up security
   - `storage-policies-fixed.sql` - Storage permissions
   - `increment-functions.sql` - Utility functions
   - `sample-data.sql` - (Optional) Test data

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

### 6. Test Database Connection

Visit `http://localhost:3000/test-db` to verify database connectivity.

## 📊 Database Schema

### Core Tables

- **posts** - News articles and blog posts
- **events** - Calendar events (academic, islamic, community, conference)
- **publications** - Magazine issues with PDFs
- **campus_locations** - Map locations for campus facilities
- **user_profiles** - Admin user management
- **game_scores** - Leaderboard data

See full schema in `/docs/database-schema.sql`

## 🔐 Authentication & Security

- **Supabase Auth** - Email/password authentication
- **Row Level Security (RLS)** - Database-level access control
- **Role-based permissions** - Super admin, content admin, etc.
- **Secure file uploads** - Protected storage buckets

## 🌐 Internationalization (i18n)

- Bilingual support: English & Indonesian
- Separate content fields for each language
- Easy to extend to more languages
- SEO-friendly URL structure

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interfaces
- Progressive Web App (PWA) ready

## 🚀 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Environment Variables on Vercel

Add these in your Vercel project settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY` (optional)

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead** - Your Name
- **Developers** - Development Team
- **Content** - Content Management Team

## 📞 Contact

- **Email** - info@mpo.org
- **Website** - https://yourwebsite.com
- **GitHub** - https://github.com/yourusername/muslim-postgrad-org

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the styling system
- All contributors and community members

---

**Built with ❤️ by Muslim Postgraduate Organization**
