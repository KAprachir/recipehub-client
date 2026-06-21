# RecipeHub — Recipe Sharing Platform

RecipeHub is a comprehensive web platform designed for food enthusiasts to create, share, discover, and manage recipes. Users can publish their own culinary masterpieces, browse community-shared recipes, save favorites, and upgrade to premium memberships to unlock unlimited publishing privileges.

## Project Features

### Normal User Features
- **Browse Recipes**: Easily discover recipes with categories, cuisines, and preparation times.
- **Filtering & Search**: Dynamic MongoDB `$in` filter system with category and pagination.
- **Detailed Recipe Pages**: Detailed view of ingredients, instructions, likes count, custom reports modal, and favorites toggle.
- **Recipe Limits**: Normal users are restricted to publishing up to **2 recipes**.
- **Interactive Likes & Favorites**: Save and like recipes in real-time.
- **Profile Customization**: Edit username and profile picture.
- **Premium Subscription**: Securely checkout via **Stripe Integration** to receive a verified premium badge and unlock **unlimited recipe publishing**.

### Admin Panel & Moderation
- **Dashboard Overview**: Access analytics for total users, recipes, premium members, and reports.
- **User Management**: Monitor user registrations and block/unblock accounts to enforce policy.
- **Recipe Moderation**: Edit metadata, delete content, and set **Featured Recipes** for the homepage.
- **Reports Moderation**: View flags (Spam, Offensive Content, Copyright issues) to dismiss flags or perform recipe takedowns.
- **Transactions log**: Inspect secure checkout history with amount, user, date, and Stripe Transaction ID.
- **Diagnostics API**: Instant database connection ping checks.

---

## Tech Stack

- **Client**: Next.js 16 (App Router), Tailwind CSS, HeroUI, Framer Motion, SweetAlert2.
- **Authentication**: Better Auth (Google Login & Credentials Provider) with cookie session handling.
- **Server**: Node.js, Express, MongoDB (Native Node Driver), JSON Web Token (JWT) verification, Stripe checkout API.
- **Hosting / Deployments**: CORS configured for secure client-server exchange.

---

## Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed, as well as a MongoDB database connection string.

### 2. Environment Configurations

#### Client Configuration (`.env.local`)
Create a `.env.local` file in the root of the client directory:
```env
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_uri
DB_NAME=recipehub
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### Server Configuration (`.env`)
Create a `.env` file in the root of the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_uri
DB_NAME=recipehub
BETTER_AUTH_SECRET=your_better_auth_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## Running the Application

### Start the Server Backend
```bash
cd recipehub-server
npm install
npm run start
```
Default server URL: `http://localhost:5000`

### Start the Next.js Client
```bash
cd recipehub-client
npm install
npm run dev
```
Default client URL: `http://localhost:3000`
