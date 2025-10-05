# Next.js 3D Shirt Customizer

This is a full-stack web application built with Next.js that allows users to customize a 3D model of a t-shirt and visualize the changes in real-time. It features a 3D customizer, user authentication, a dashboard for managing designs, and an admin area.

## Features

- **3D Shirt Customizer**: Interactive 3D shirt customizer using React Three Fiber and Three.js.
- **Real-time Customization**: Change color, and apply textures to the 3D model.
- **Authentication**: User registration and login using NextAuth.js.
- **Dashboard**: User dashboard to view and manage saved designs.
- **Database**: PostgreSQL database with Drizzle ORM for data persistence.
- **Admin Area**: Separate section for administrators to manage the application.
- **Component-based UI**: Built with Radix UI and shadcn/ui for a consistent and accessible design system.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **3D Rendering**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [Three.js](https://threejs.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Linting/Formatting**: [Biome](https://biomejs.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20.x or higher)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/get-started) or [Podman](https://podman.io/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd shirt
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Environment Variables

Create a `.env` file in the root of the project and add the necessary environment variables. You can start by copying the `.env.example` if one exists. A `DATABASE_URL` is required.

```
DATABASE_URL="postgres://postgres:password@localhost:5432/shirt"
```

### Database Setup

The `start-database.sh` script will start a PostgreSQL container for you. It will use the `DATABASE_URL` from your `.env` file to configure the database.

- On macOS or Linux, you can run it directly:
  ```bash
  ./start-database.sh
  ```
- On Windows, use WSL (Windows Subsystem for Linux):
  ```bash
  wsl
  ./start-database.sh
  ```

### Running the Development Server

Once the database is running, you can start the Next.js development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Creates a production build.
- `pnpm start`: Starts a production server.
- `pnpm preview`: Builds and starts the production server.
- `pnpm typecheck`: Runs TypeScript to check for type errors.
- `pnpm check`: Runs Biome to check for linting and formatting errors.
- `pnpm check:write`: Runs Biome and fixes fixable errors.

## Project Structure

```
.
├── app/                # Next.js App Router pages
├── components/         # Shared React components (including UI and 3D canvas)
├── public/             # Static assets (images, 3D models)
├── server/             # Server-side logic (auth, database)
├── lib/                # Shared library functions and utilities
├── hooks/              # Custom React hooks
├── styles/             # Global styles
└── drizzle.config.ts   # Drizzle ORM configuration
```
