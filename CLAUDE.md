# Next task

Commit what was done.
Check in TODO.md what to to next. 
Use TODO.md as memory for tasks and prioritzation. 

# Material UI Design Rules

1. Use responsive MUI Grid system instead of custom Tailwind classes
   - Replace `md-show-flex`, `md-hide` with `sx={{ display: { xs: 'none', md: 'flex' } }}`

2. Replace custom inputs with MUI TextField and FormControl components
   - Use proper MUI form components instead of raw HTML inputs

3. Implement theme spacing system instead of hardcoded pixel values
   - Use theme spacing units (e.g., `mb: 2` instead of `mb: '16px'`)
   - Use spacing multipliers consistently for margins and paddings

4. Use MUI Stack for layouts instead of custom flexbox containers
   - Particularly for button/tag layouts in cards

5. Add proper dark mode support with palette.mode
   - Update theme to include proper darkMode palette
   - Use palette.mode to conditionally render styles

6. Replace divs with MUI Box components
   - Use Box instead of div for basic layout elements
   - Use CardActions for card action areas

7. Define component defaults in theme.components
   - Move reused styles to theme to prevent repetition
   - Define focus states for accessibility

8. Use MUI Skeleton for loading states
   - Replace PlaceholderImage with MUI Skeleton
   - Add loading states to data-dependent components

9. Use MUI Container consistently
   - Replace custom container divs with MUI Container components

10. Implement proper theme responsive typography
    - Define responsive font sizes using MUI's `responsiveFontSizes` utility
    - Replace hardcoded font sizes with theme typography tokens