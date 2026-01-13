# Agent Instructions

## Task Management
1. Use TODO.md as the primary task tracking and prioritization system
2. Before each commit:
   - Add completed items to TODO.md under "Completed Features"
   - Update remaining crucial tasks
   - Use `/compact` command after committing

## Material UI Design Rules

1. Grid System
   - Use MUI Grid system for responsive layouts
   - Replace custom responsive classes with MUI sx props
   - Example: `sx={{ display: { xs: 'none', md: 'flex' } }}`

2. Form Components
   - Use MUI TextField and FormControl components
   - Replace HTML inputs with proper MUI equivalents

3. Spacing System
   - Use theme spacing units (e.g., `mb: 2`)
   - Avoid hardcoded pixel values
   - Maintain consistent spacing multipliers

4. Layout Components
   - Prefer MUI Stack over custom flexbox
   - Use MUI Box instead of plain divs
   - Use CardActions for card interactions

5. Theme Configuration
   - Implement proper dark mode with palette.mode
   - Define component defaults in theme.components
   - Use responsiveFontSizes for typography
   - Define consistent container widths

6. Loading States
   - Use MUI Skeleton components
   - Implement loading states for data-dependent components

## Database Commands (Self-hosted Supabase)
- `pnpm db:push` - Push migrations to database (uses PowerShell script, reads .env)
- `pnpm db:clean` - Drop all tables (with confirmation)
- VS Code Task: Ctrl+Shift+P → "Supabase: Push Migrations"
- Database: postgres@localhost:5433 (supabase/postgres with PostGIS)
- Studio: https://supabase.dev.zntl
- See SUPABASE.md for details

## Code Standards
- Write all comments, UI text, and code in English
- Include JSDoc comments for future developer reference
- Follow project structure defined in arch.md
- Adhere to principles outlined in PRINCIPLES.md