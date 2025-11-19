# Deployment Guide

This guide will walk you through deploying the "ThinkInk" AI content generator to Vercel.

## Prerequisites

1.  **Git Repository:** Your project should be in a Git repository (e.g., on GitHub, GitLab, or Bitbucket).
2.  **Vercel Account:** You will need a Vercel account. You can sign up for free at [vercel.com](https://vercel.com).

## Step 1: Deploy to Vercel

1.  Go to your Vercel dashboard and click the "Add New..." button, then select "Project".
2.  Import your Git repository.
3.  Vercel will automatically detect that you are using a Next.js project and configure the build settings for you.

## Step 2: Configure Environment Variables

You will need to add the environment variables from your `.env.local` file to your Vercel project.

1.  In your Vercel project settings, go to the "Environment Variables" section.
2.  Add the following environment variables with their corresponding values:

    -   `NEXT_PUBLIC_SUPABASE_URL`
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    -   `DATABASE_URL`
    -   `GOOGLE_API_KEY`
    -   `TAVILY_API_KEY`
    -   `UNSPLASH_ACCESS_KEY`
    -   `CRON_SECRET`
    -   `CRON_AUTHOR_ID`

    You can get the values for these variables from your Supabase project, Google AI Studio, Tavily, and Unsplash developer dashboards.

## Step 3: Database Setup

Your Supabase database schema needs to be in sync with your Drizzle schema.

1.  Make sure you have run all the Drizzle migrations locally.
2.  When you push your code to your Git repository, Vercel will automatically trigger a new deployment.

## Step 4: Configure Cron Job

The application includes a scheduled task for automated content generation. You can set this up using Vercel's cron jobs.

1.  In your Vercel project settings, go to the "Cron Jobs" section.
2.  Add a new cron job with the following settings:
    -   **Schedule:** Choose a schedule that suits your needs (e.g., `0 0 * * *` to run once a day at midnight).
    -   **Command:** `GET https://<your-deployment-url>/api/scheduled/research`
    -   **Secret:** Make sure to include your `CRON_SECRET` in the request headers for authentication.

## Step 5: Access Your Deployed Application

Once the deployment is complete, you can access your application at the URL provided by Vercel.

That's it! Your "ThinkInk" AI content generator should now be deployed and running on Vercel.
