# PostgreSQL Setup Guide

This guide will help you set up PostgreSQL for the 3D Filament Profiles application.

## Prerequisites

1. **PostgreSQL installed** on your system
   - macOS: `brew install postgresql`
   - Ubuntu/Debian: `sudo apt-get install postgresql postgresql-contrib`
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)

2. **Node.js and pnpm** (already installed)

## Database Setup

### 1. Start PostgreSQL Service

```bash
# macOS
brew services start postgresql

# Ubuntu/Debian
sudo systemctl start postgresql

# Windows
# PostgreSQL service should start automatically
```

### 2. Create Database and User

```bash
# Connect to PostgreSQL as superuser
psql postgres

# Create database
CREATE DATABASE "3d_filament_profiles";

# Create user (optional, for production)
CREATE USER filament_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE "3d_filament_profiles" TO filament_user;

# Exit psql
\q
```

### 3. Set Environment Variables

Create or update your `.env.local` file:

```bash
DATABASE_URL="postgresql://localhost:5432/3d_filament_profiles"
# Or with user/password:
# DATABASE_URL="postgresql://filament_user:your_password@localhost:5432/3d_filament_profiles"
```

### 4. Run Migrations

```bash
# Generate migration files (already done)
pnpm db:generate

# Push schema to database
pnpm db:push

# Or run migrations (if you prefer)
pnpm db:migrate
```

### 5. Seed the Database

```bash
# Seed with 50 filaments (default)
pnpm db:seed

# Seed with custom number
pnpm db:seed 100

# Force overwrite existing data
pnpm db:seed --force
```

## Troubleshooting

### Connection Issues

- **Port 5432**: Ensure PostgreSQL is running on the default port
- **Authentication**: Check username/password in connection string
- **Database exists**: Verify the database was created successfully

### SSL Issues (Production)

For production deployments, you may need to configure SSL:

```bash
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

### Reset Database

If you need to start fresh:

```bash
# Drop and recreate database
psql postgres -c "DROP DATABASE \"3d_filament_profiles\";"
psql postgres -c "CREATE DATABASE \"3d_filament_profiles\";"

# Then run migrations and seed again
pnpm db:push
pnpm db:seed
```

## Development Workflow

1. **Schema changes**: Edit `src/server/db/schema.ts`
2. **Generate migration**: `pnpm db:generate`
3. **Apply changes**: `pnpm db:push` or `pnpm db:migrate`
4. **Seed data**: `pnpm db:seed`

## Database Studio

View and manage your data with Drizzle Studio:

```bash
pnpm db:studio
```

This will open a web interface at `http://localhost:4983` where you can browse tables, run queries, and manage data.
