# Classified Platform - Product Requirements Document

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Core Functionalities](#2-core-functionalities)
- [3. Project Structure](#3-project-structure)
- [4. Data Models](#4-data-models)
- [5. API Specifications](#5-api-specifications)
- [6. UI/UX Guidelines](#6-uiux-guidelines)
- [7. Performance Requirements](#7-performance-requirements)
- [8. Security Requirements](#8-security-requirements)
- [9. Monitoring and Analytics](#9-monitoring-and-analytics)
- [10. Deployment Strategy](#10-deployment-strategy)

## 1. Project Overview

A classified platform enabling users to post and sell products with built-in user rating system.

### Target Users

- Sellers: Individuals or small businesses looking to sell products
- Buyers: Users searching for specific products or browsing listings
- Guest Users: Non-authenticated users who can browse listings

### Technical Stack

- Frontend: Next.js 14 (App Router)
- Authentication: Clerk
- Styling: Tailwind CSS with shadcn/ui components
- Database: PostgreSQL with Prisma ORM
- Image Storage: Upload Thing
- Payment Processing: Stripe

## 2. Core Functionalities

### 2.1 User Authentication (Clerk Integration)

#### Guest Access

- View all posts and search functionality
- Access to public user profiles and ratings
- Cannot message sellers or create listings

#### Authenticated User Features

- Create, edit, and delete posts
- Message other users
- Bookmark posts
- Rate transactions
- Promote listings (paid feature)

#### Implementation Notes

- Implement middleware to protect authenticated routes
- Use Clerk components for sign-in/sign-up flows
- Store additional user metadata in our database

### 2.2 Post Management

#### Post Creation

- Required Fields:
  - Title (max 100 chars)
  - Description (max 2000 chars)
  - Category (from predefined list)
  - Price
  - Location
  - Images (max 10, each max 5MB)
  - Contact preferences

#### Post Promotion

- Promotion Tiers:
  - Featured (homepage placement): $10/week
  - Category Top: $5/week
  - Highlight Listing: $2/week
- Implementation:
  - Stripe integration for payments
  - Automated promotion expiration
  - Queue system for featured posts

### 2.3 Search & Navigation

#### Search Implementation

- Elasticsearch integration
- Indexing:
  - Post title
  - Description
  - Category
  - Location
  - Tags
- Search Features:
  - Fuzzy matching
  - Category filtering
  - Price range filtering
  - Location-based search
  - Sort options (newest, price, popularity)

#### Infinite Scrolling

- Implementation Requirements:
  - 20 items per page
  - Preload next page
  - Loading skeleton UI
  - Maintain scroll position on back navigation
  - Cache previous results

### 2.4 Rating System

#### Transaction Rating Flow

1. Transaction marked complete
2. Both parties receive rating prompt
3. 14-day window to submit rating
4. Rating becomes visible after both parties submit or window expires

#### Rating Categories

- Buyer → Seller:

  - Item Accuracy (1-5)
  - Communication (1-5)
  - Shipping Speed (1-5)
  - Overall Experience (1-5)
  - Comments (optional)

- Seller → Buyer:
  - Payment Promptness (1-5)
  - Communication (1-5)
  - Adherence to Terms (1-5)
  - Overall Experience (1-5)
  - Comments (optional)

#### Rating Calculation

```typescript
Overall Rating = (
  (0.5 * avg_last_10_ratings) +
  (0.3 * avg_previous_20_ratings) +
  (0.2 * avg_remaining_ratings)
)
```

## 3. Project Structure

```
classified-web-app/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/page.tsx        # Clerk sign-in page
│   │   └── sign-up/page.tsx        # Clerk sign-up page
│   ├── api/
│   │   ├── posts/route.ts          # Post CRUD operations
│   │   ├── ratings/route.ts        # Rating operations
│   │   └── webhooks/route.ts       # Payment webhooks
│   ├── bookmarks/
│   │   └── page.tsx                # User's bookmarked posts
│   ├── category/
│   │   └── [category]/page.tsx     # Category-specific listings
│   ├── posts/
│   │   ├── [id]/
│   │   │   ├── edit/page.tsx       # Edit post form
│   │   │   └── page.tsx           # Post details page
│   │   └── new/page.tsx           # Create new post form
│   ├── profile/
│   │   └── [id]/page.tsx          # User profile page
│   ├── search/
│   │   └── page.tsx               # Search results page
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Homepage
├── components/
│   ├── forms/
│   │   ├── post-form.tsx
│   │   └── rating-form.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── sidebar.tsx
│   ├── posts/
│   │   ├── post-card.tsx
│   │   ├── post-grid.tsx
│   │   └── post-actions.tsx
│   ├── ratings/
│   │   ├── rating-stars.tsx
│   │   └── rating-display.tsx
│   └── ui/                        # shadcn components
├── lib/
│   ├── actions/                   # Server actions
│   │   ├── posts.ts
│   │   ├── ratings.ts
│   │   └── bookmarks.ts
│   ├── db/
│   │   ├── schema.ts             # Database schema
│   │   └── index.ts              # Database configuration
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   └── utils.ts                  # Utility functions
```

## 4. Data Models

### User Model

```prisma
model User {
  id            String    @id
  clerkId       String    @unique
  name          String
  email         String    @unique
  posts         Post[]
  ratings       Rating[]
  bookmarks     Bookmark[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Post Model

```prisma
model Post {
  id          String    @id @default(cuid())
  title       String
  description String
  price       Decimal
  category    Category  @relation(fields: [categoryId], references: [id])
  categoryId  String
  images      Image[]
  status      PostStatus @default(ACTIVE)
  promoted    Boolean    @default(false)
  promotionEndDate DateTime?
  userId      String
  user        User       @relation(fields: [userId], references: [id])
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

### Rating Model

```prisma
model Rating {
  id                String    @id @default(cuid())
  transactionId     String
  raterId           String
  rateeId           String
  ratingType        RatingType
  overallRating     Decimal
  itemAccuracy      Decimal?
  communication     Decimal
  shippingSpeed     Decimal?
  paymentPromptness Decimal?
  adherenceToTerms  Decimal?
  comments          String?
  createdAt         DateTime  @default(now())
}
```

## 5. API Specifications

### Posts API

#### Create Post

```typescript
POST /api/posts
Authorization: Required
Body: {
  title: string
  description: string
  price: number
  categoryId: string
  images: File[]
}
```

#### Get Posts

```typescript
GET /api/posts
Query Parameters:
  - page: number
  - category?: string
  - search?: string
  - minPrice?: number
  - maxPrice?: number
  - sortBy: 'newest' | 'price_asc' | 'price_desc'
```

## 6. UI/UX Guidelines

### Theme Configuration

```typescript
// Color Palette
colors: {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  background: {
    light: '#FFFFFF',
    dark: '#000000'
  }
}

// Typography
typography: {
  primary: 'Inter',
  heading: {
    fontSize: {
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.75rem'
    }
  }
}
```

### Component Guidelines

- Use shadcn/ui components as base
- Maintain consistent spacing (0.5rem increments)
- Follow accessibility guidelines (WCAG 2.1)
- Implement responsive designs for all components

## 7. Performance Requirements

### Loading Times

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Largest Contentful Paint: < 2.5s

### Image Optimization

- Implement responsive images
- Use next/image for automatic optimization
- Maximum image sizes:
  - Thumbnails: 200KB
  - Full-size: 5MB

### Caching Strategy

- Implement stale-while-revalidate
- Cache search results for 5 minutes
- Cache static pages for 24 hours

## 8. Security Requirements

### Authentication

- Implement Clerk middleware
- Protected routes for authenticated features
- CSRF protection on all forms

### Data Protection

- Sanitize all user inputs
- Implement rate limiting on API routes
- Secure file uploads with Upload Thing
- Regular security audits

## 9. Monitoring and Analytics

### Performance Monitoring

- Implement Vercel Analytics
- Track key metrics:
  - Page load times
  - API response times
  - Error rates
  - User engagement

### Business Metrics

- Track:
  - Daily active users
  - Post creation rate
  - Message response time
  - Transaction completion rate
  - Rating submission rate

## 10. Deployment Strategy

### Environment Setup

- Development: Vercel Preview
- Staging: Vercel Preview
- Production: Vercel Production

### Database Management

- Use Prisma migrations
- Implement backup strategy
- Monitor database performance

---

This PRD serves as a living document and should be updated as the project evolves. All major changes should be documented and communicated to the development team.
