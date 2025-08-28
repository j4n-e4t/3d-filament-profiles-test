# Database Seeding Scripts

This directory contains scripts for populating the database with mock data for development and testing purposes.

## Filament Mock Data Seeder

The `seed-mock-data.ts` script generates realistic mock data for the filament database and inserts it using the existing database connection.

### Features

- **Realistic Data**: Generates filament entries with realistic brands, materials, colors, and print settings
- **Material-Specific Settings**: Each material type (PLA, ABS, PETG, etc.) gets appropriate temperature and print settings
- **Varied Content**: Includes different brands, colors, weights, and purchase dates
- **Smart Defaults**: Uses realistic ranges for all numeric values
- **Safety Checks**: Prevents accidental overwriting of existing data unless forced

### Usage

#### Using npm/pnpm script (recommended)

```bash
# Seed with default 50 filaments
pnpm db:seed

# Seed with custom number of filaments
pnpm db:seed 100

# Force overwrite existing data
pnpm db:seed --force

# Seed 75 filaments and force overwrite
pnpm db:seed 75 --force
```

#### Direct execution

```bash
# Using tsx (if installed globally)
tsx scripts/seed-mock-data.ts

# Using tsx with arguments
tsx scripts/seed-mock-data.ts 100 --force

# Using npx
npx tsx scripts/seed-mock-data.ts
```

### Command Line Arguments

1. **Number of filaments** (optional): First argument specifies how many filament entries to generate
   - Default: 50
   - Example: `pnpm db:seed 100` generates 100 filaments

2. **Force flag** (optional): `--force` flag allows overwriting existing data
   - Without flag: Script exits if database already contains data
   - With flag: Clears existing data and inserts new data

### Generated Data

The script generates the following types of data:

#### Brands (15 total)

- Prusament, Hatchbox, Polymaker, MatterHackers, Overture
- Sunlu, eSun, Inland, Amazon Basics, Creality
- ColorFabb, Fillamentum, FormFutura, Verbatim, Ultimaker

#### Materials (15 total)

- PLA, PLA+, ABS, PETG, TPU, TPE
- PC, PVA, HIPS, ASA, POM, PMMA
- PA, PPS, PEEK

#### Colors (18 total)

- Standard colors: Black, White, Gray, Silver, Red, Blue, Green, Yellow, Orange, Purple, Pink, Brown
- Special effects: Transparent, Glow in Dark, Metallic, Pearl, Neon, Pastel

#### Print Settings

Each material gets realistic temperature and print settings based on typical 3D printing recommendations:

- **PLA**: 190-220°C nozzle, 50-70°C bed, 40-80 mm/s speed
- **ABS**: 230-260°C nozzle, 100-120°C bed, 30-60 mm/s speed
- **PETG**: 230-250°C nozzle, 70-90°C bed, 25-50 mm/s speed
- **TPU**: 210-240°C nozzle, 50-70°C bed, 15-35 mm/s speed
- And many more...

### Database Connection

The script uses the same database connection configuration as your main application:

- Reads `DATABASE_URL` from environment variables
- Falls back to `file:db.sqlite` if no environment variable is set
- Uses the existing Drizzle ORM setup with libsql

### Output

The script provides detailed feedback:

- Connection status
- Data generation progress
- Insertion results
- Statistics on material and brand distribution
- Success/error messages with emojis for easy reading

### Example Output

```
🌱 Starting database seeding...
🔗 Connecting to database: file:db.sqlite
📦 Generating 50 filament entries...
💾 Inserting data into database...
✅ Successfully seeded database with 50 filament entries!
📊 Database now contains 50 total entries.

📈 Material distribution:
   PLA: 12 filaments
   ABS: 8 filaments
   PETG: 10 filaments
   TPU: 5 filaments
   ...

🏷️  Brand distribution:
   Prusament: 4 filaments
   Hatchbox: 6 filaments
   Polymaker: 3 filaments
   ...

🎉 Seeding completed successfully!
```

### Safety Features

- **Data Protection**: Won't overwrite existing data without explicit `--force` flag
- **Error Handling**: Comprehensive error handling with clear error messages
- **Validation**: Uses the same schema validation as your main application
- **Transaction Safety**: Database operations are handled safely through Drizzle ORM

### Customization

To modify the generated data, edit the arrays and settings in `seed-mock-data.ts`:

- Add new brands to the `brands` array
- Add new materials to the `materials` array
- Modify temperature ranges in `materialSettings`
- Adjust price ranges, weight ranges, etc.
- Customize note templates

### Troubleshooting

**Common Issues:**

1. **"Database already contains X filaments"**
   - Use `--force` flag to overwrite existing data
   - Or manually clear the database first

2. **"Error seeding database"**
   - Check that your database is accessible
   - Verify `DATABASE_URL` environment variable if using remote database
   - Ensure database schema is up to date

3. **"Cannot find module" errors**
   - Make sure all dependencies are installed: `pnpm install`
   - Verify the script path is correct

**Getting Help:**

- Check the console output for specific error messages
- Verify your database connection settings
- Ensure the database schema matches the expected structure
