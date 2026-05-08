# Moris Enterprises Website

Laboratory chemicals, medical equipment, biotechnology, and diagnostic tools supplier in Kenya.

## Project Overview

This is the official website for Moris Enterprises, a leading supplier of laboratory and medical equipment in Kenya. The website showcases our products, services, and enables customers to request quotations.

## Technologies Used

This project is built with:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui
- **Routing**: React Router
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack React Query
- **Notifications**: Sonner

## Project Structure

```
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn-ui components
│   │   ├── Navigation.tsx # Navigation bar
│   │   ├── Hero.tsx      # Hero section
│   │   ├── About.tsx     # About section
│   │   ├── Services.tsx  # Services section
│   │   ├── Contact.tsx   # Contact section
│   │   ├── Footer.tsx    # Footer section
│   │   └── Gallery.tsx   # Gallery component
│   ├── pages/            # Page components
│   │   ├── Index.tsx     # Home page
│   │   ├── Gallery.tsx   # Gallery page
│   │   ├── NotFound.tsx  # 404 page
│   │   └── products/     # Product category pages
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── assets/           # Images and static files
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles
├── public/               # Static files (favicon, manifest, etc)
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd <project-name>

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Preview production build
npm preview

# Run ESLint
npm run lint
```

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **SEO Optimized**: Comprehensive meta tags, structured data, and Open Graph tags
- **Product Catalog**: Organized product categories with detailed information
- **Contact Form**: Easy way for customers to request quotations
- **Gallery**: Visual showcase of products and facilities
- **Performance**: Fast loading with optimized assets and images
- **Accessibility**: Semantic HTML and ARIA labels for better accessibility

## Product Categories

- Medical Equipment
- Microbiology and Biotechnology
- Glassware
- Laboratory Chemicals and Reagents
- Water Analysis Instruments
- Laboratory and Material Testing
- Safety Products
- Wastewater Filtration
- Palintest Kits
- Laboratory Equipment
- Automobile Supplies

## Contact Information

**Email**: [Your Email]
**Phone**: +254-733-137-332
**Website**: https://morisenterprises.com

## License

All rights reserved © Moris Enterprises 2010-2024
