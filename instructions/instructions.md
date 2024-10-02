# Project overview

Build a classified platform where users can post pictures and descriptions of their products to sell to other users.

Will be using Next.js 14, shadcn, tailwind, clerk

# Core functionalities

## User Authentication and Access

1. Guest User Access

- Users that are not logged in can view all posts.
- Ensures open access to content, encouraging browsing and potential sign-ups.

2. User Authentication for Interactions

- Users need to be logged in to post and send messages to sellers.
- Enhances security and accountability in user interactions.

## Post Management

3. Post Creation and Editing

- Users can create new posts after logging in.
- Users can edit and delete their own posts.
- Provides control and flexibility for users to manage their listings.

4. Post Promotion

- Users can pay to promote their posts.
- Options include featuring posts on the home page or at the top of category lists.
- Creates a revenue stream and offers users enhanced visibility for their listings.

## Search and Navigation

5. Search Functionality

- Users can search for specific items or services.
- Implement robust search algorithms for accurate and fast results.

6. Category Filtering

- Users can filter posts by categories.
- Improves navigation and helps users find relevant content quickly.

7. Infinite Scrolling

- Users can scroll infinitely without lag.
- Implement efficient data loading and rendering to ensure smooth user experience.

## User Interface and Experience

8. Theming Options

- The platform should have both dark and light themes.
- Option to follow the user's machine system preference for theme selection.
- Enhances user experience by providing visual comfort and personalization.

## User rating system

9. Transaction Completion Trigger:

- After a transaction is marked as complete by both parties, trigger the rating process.
- Send notifications to both buyer and seller prompting them to rate the transaction.

10. Rating Interface:

- Create a simple, user-friendly interface for submitting ratings.
- Include a 5-star rating system (1 being lowest, 5 being highest).
- Add optional text fields for additional comments.

11. Rating Categories:
    a. For Buyers rating Sellers:

- Item Accuracy (does the item match the description?)
- Communication
- Shipping Speed (if applicable)
- Overall Experience
  b. For Sellers rating Buyers:
- Payment Promptness
- Communication
- Adherence to agreed terms
- Overall Experience

12. Rating Submission:

- Allow users to submit ratings within a specific timeframe (e.g., 14 days after transaction completion).
- Implement a one-time submission policy to prevent rating changes.

13. Rating Calculation:

- Calculate an overall rating for each user based on their average scores across all transactions.
- Use a weighted average, giving more importance to recent ratings.
- Example formula: Overall Rating = (0.5 _ Avg of last 10 ratings) + (0.3 _ Avg of previous 20 ratings) + (0.2 \* Avg of all other ratings)

14. Rating Display:

- Show the overall rating prominently on user profiles.
- Display the number of ratings received.
- Provide a breakdown of ratings by category.

15. Verification System:

- Only allow ratings from verified transactions to prevent fake reviews.
- Implement a system to flag suspicious rating patterns.

16. Privacy Considerations:

- Allow users to choose whether individual rating comments are public or private.
- Ensure compliance with data protection regulations.

17. Dispute Resolution:

- Implement a system for users to contest unfair ratings.
- Have a moderation team review disputed ratings.

18. Incentives for Rating:

- Offer small incentives (e.g., platform credits) to encourage users to leave thoughtful ratings.

19. API Endpoints:

- POST /api/ratings: To submit a new rating
- GET /api/ratings/{userId}: To retrieve ratings for a specific user
- PUT /api/ratings/{ratingId}: To update a rating (within allowed timeframe)
- DELETE /api/ratings/{ratingId}: To remove a rating (for moderation purposes)

20. Database Schema:

```sql
CREATE TABLE ratings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  transaction_id INT NOT NULL,
  rater_id INT NOT NULL,
  ratee_id INT NOT NULL,
  rating_type ENUM('buyer', 'seller') NOT NULL,
  overall_rating DECIMAL(2,1) NOT NULL,
  item_accuracy DECIMAL(2,1),
  communication DECIMAL(2,1) NOT NULL,
  shipping_speed DECIMAL(2,1),
  payment_promptness DECIMAL(2,1),
  adherence_to_terms DECIMAL(2,1),
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transaction_id) REFERENCES transactions(id),
  FOREIGN KEY (rater_id) REFERENCES users(id),
  FOREIGN KEY (ratee_id) REFERENCES users(id)
);
```

## Additional Considerations

- Responsive Design: Ensure the app works well on various devices and screen sizes.
- Performance Optimization: Implement caching and efficient data fetching to support features like infinite scrolling and quick search results.
- Messaging System: Develop a secure and user-friendly messaging system for communication between buyers and sellers.
- Payment Integration: Set up a secure payment system for promoted posts.
- User Profiles: Allow users to create and manage their profiles, including contact information and listing history.
- Users can bookmark or favorite posts by clicking on the heart icon
  - Bookmarked posts can be viewed in their profile under bookmarked tab section.

# Doc

xxx

# Current file structure

classified-web-app/
├── .eslintrc.json
├── components.json
├── middleware.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── lib/
│ └── utils.ts
├── instructions/
│ └── instructions.md
├── components/
│ ├── SignInButton.tsx
│ └── ui/
│ ├── accordion.tsx
│ ├── avatar.tsx
│ ├── badge.tsx
│ ├── button.tsx
│ ├── card.tsx
│ ├── drawer.tsx
│ ├── dropdown-menu.tsx
│ ├── form.tsx
│ ├── hover-card.tsx
│ ├── input.tsx
│ ├── label.tsx
│ ├── menubar.tsx
│ ├── navigation-menu.tsx
│ ├── scroll-area.tsx
│ ├── skeleton.tsx
│ ├── tabs.tsx
│ ├── textarea.tsx
│ ├── toggle.tsx
│ └── tooltip.tsx
└── app/
├── globals.css
├── layout.tsx
└── page.tsx
