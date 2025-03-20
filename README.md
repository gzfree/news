# News Application

A responsive mobile web application with news features, video filters, and data visualization dashboards.

## Features

- News feed and article details
- Video filters with background effects
- Noise cancellation during video calls
- Data visualization dashboard for Botim income comparison
- Search functionality

## Deployment

This project is automatically deployed to Vercel through GitHub Actions.

### URL
- Production: https://news-kappa-henna.vercel.app/

### Quick Access URLs
- News: https://news-kappa-henna.vercel.app/news.html
- Dashboard: https://news-kappa-henna.vercel.app/d-income-comparison.html
- Video Filters: https://news-kappa-henna.vercel.app/video-filters.html
- Search: https://news-kappa-henna.vercel.app/search.html

## GitHub MCP (Managed Continuous Publishing)

### Setup Instructions

1. Create Vercel secrets in your GitHub repository:
   - Go to Settings > Secrets and Variables > Actions
   - Add these repository secrets:
     - `VERCEL_TOKEN`: Your Vercel API token
     - `VERCEL_PROJECT_ID`: Your Vercel project ID
     - `VERCEL_ORG_ID`: Your Vercel organization ID

2. Push changes to the main branch to trigger automatic deployment

3. View deployment status in the Actions tab of your GitHub repository

### Manual Deployment

If needed, you can manually trigger a deployment from the Actions tab in GitHub.

## Development

To run the project locally, simply open any HTML file in your browser. No build steps required.

## File Structure

- `news.html` - News application main page
- `video-filters.html` - Video filters and effects page
- `d-income-comparison.html` - Data visualization dashboard
- `search.html` - Search interface
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
