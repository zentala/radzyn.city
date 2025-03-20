# Radzyń City Portal - Admin Panel

This directory contains the admin panel implementation for the Radzyń City Portal. The admin panel provides interfaces for managing various aspects of the portal, including news articles, categories, tags, and scraper configurations.

## Features

### Dashboard

The dashboard provides an overview of the portal's content, including statistics on articles, categories, tags, and scraper sources. It also offers quick access to common administrative tasks.

### News Management

The news management section allows administrators to:
- View all news articles
- Create new articles
- Edit existing articles
- Delete articles
- Manually categorize or tag articles

### Scraper Configuration

The scraper configuration section allows administrators to:
- Add new scraper sources
- Edit existing scraper configurations
- Delete scraper sources
- Run scrapers manually
- Configure scraper settings like intervals and selectors

## Setup

### AI Features

The news scraping system uses OpenAI for various features:
- Automatic categorization of articles
- Keyword extraction
- Sentiment analysis
- Summary generation

To enable these features, add your OpenAI API key to the `.env.local` file:

```
OPENAI_API_KEY=your_api_key_here
```

If no API key is provided, the system will fall back to using mock data.

### Cron Jobs

For automated regular scraping, you can set up a cron job on your server:

1. Edit your crontab:
   ```
   crontab -e
   ```

2. Add an entry to run the scraper at your desired interval:
   ```
   # Run scraper every hour
   0 * * * * node /path/to/your/project/scripts/cron-scrape.js >> /path/to/your/project/scraper.log 2>&1
   ```

## Development

The admin panel is built using:
- Next.js (App Router)
- Material UI v6
- React components with TypeScript

When adding new admin features, follow these guidelines:
- Use the existing layout structure
- Maintain consistent styling
- Add proper error handling
- Include loading states
- Add documentation for new features

## Security

The admin panel should be secured in production. Consider implementing:
- Authentication system
- Role-based access control
- CSRF protection
- Rate limiting

For development purposes, the admin panel is currently accessible without authentication.