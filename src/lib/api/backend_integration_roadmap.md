# RecipeHub Backend Integration Roadmap (Step-by-Step)

Follow this sequence to systematically connect your frontend client pages to your MongoDB backend server.

---

## 🗺️ Step 1: Ensure Authentication & Session Security (Base Setup) (Completed)
Before writing database queries, make sure your backend server can verify who is logged in.
- [x] Make sure `better-auth` or your custom token headers are decoded successfully on the server.
- [x] Ensure you can extract the active user ID (`req.user.id` or `req.user._id`) from requests that send authentication headers.

---

## 🗺️ Step 2: Implement User Recipes Portfolio (Medium Priority) (Completed)
This is the best place to start database interactions since you already have recipes in MongoDB.

### 1. Backend Server Endpoints
- [x] Implement **`GET /api/user/my-recipes`**: Query `db.collection('recipes').find({ userId: req.user.id })`.
- [x] Implement **`DELETE /api/recipes/:id`**: Query `db.collection('recipes').deleteOne({ _id: req.params.id })`.

### 2. Client API Blueprint
- [x] Go to `src/lib/api/recipes.js` and uncomment the code inside `getUserRecipes`.
- [x] Go to `src/lib/actions/recipes.js` and uncomment the code inside `deleteRecipe`.

### 3. Frontend Page Connection
- [x] Go to `src/app/dashboard/user/my-recipes/page.jsx`.
- [x] Uncomment the two imports at the top: `getUserRecipes` and `deleteRecipe`.
- [x] Replace the mock data setting inside `useEffect` and `handleDeleteRecipe` with the calls to those functions.

---

## 🗺️ Step 3: Implement Favorites System (Medium Priority) (Completed)

### 1. Backend Server Endpoints
- [x] Implement **`POST /api/recipes/:id/favorite`**: Check if user already favorited the recipe. If yes, remove it; if no, insert the user-recipe pairing into `favorites` collection.
- [x] Implement **`GET /api/user/favorites`**: Query `favorites` collection, extract recipe IDs, and find matching records in the `recipes` collection.

### 2. Client API Blueprint
- [x] Go to `src/lib/api/user.js` and uncomment the code inside `getUserFavorites`.
- [x] Go to `src/lib/actions/recipes.js` and uncomment the code inside `toggleFavoriteRecipe`.

### 3. Frontend Page Connection
- [x] Go to `src/app/dashboard/user/favorites/page.jsx`.
- [x] Uncomment the imports `getUserFavorites` and `toggleFavoriteRecipe`.
- [x] Update your mount `useEffect` and `handleRemoveFavorite` handler to use these functions.

---

## 🗺️ Step 4: Implement User Dashboard Overview (Medium-High Priority)

### 1. Backend Server Endpoint
- Implement **`GET /api/user/dashboard-summary`**: Return stats aggregates (count of user's recipes, count of user's favorites, sum of likes received from their recipes, recent activities logs).

### 2. Client API Blueprint
- Go to `src/lib/api/user.js` and uncomment the code inside `getUserDashboardSummary`.

### 3. Frontend Page Connection
- Go to `src/app/dashboard/user/overview/page.jsx`.
- Uncomment the import `getUserDashboardSummary`.
- Bind it in the `useEffect` hook to set the `stats` state.

---

## 🗺️ Step 5: Implement Purchased Premium Recipes (Medium Priority)

### 1. Backend Server Endpoint
- Implement **`GET /api/user/purchased`**: Find user transactions or unlocked recipes pairing, and resolve them to recipe contents.

### 2. Client API Blueprint
- Go to `src/lib/api/recipes.js` and uncomment the code inside `getUserPurchasedRecipes`.

### 3. Frontend Page Connection
- Go to `src/app/dashboard/user/purchased/page.jsx`.
- Uncomment the import `getUserPurchasedRecipes`.
- Bind inside the `useEffect` state loader.

---

## 🗺️ Step 6: Implement Admin Controls & Moderation (Advanced)

### 1. Backend Server Endpoints
- Implement **`GET /api/admin/overview-summary`**: Returns global statistics (total users count, total recipes count, premium users, total flags) and growth data.
- Implement **`GET /api/admin/reports`**: Fetch all flagged recipes and user report records.
- Implement **`PUT /api/admin/reports/:id/dismiss`**: Update report status in database to `Dismissed`.
- Implement **`DELETE /api/admin/recipes/:id`** (or report resolution endpoint): Delete the flagged recipe from catalog.

### 2. Client API & Actions Blueprints
- Go to `src/lib/api/admin.js` and uncomment `getAdminDashboardSummary` and `getAdminReports`.
- Go to `src/lib/actions/admin.js` and uncomment `dismissReport` and `takeDownRecipe`.

### 3. Frontend Page Connections
- Connect `src/app/dashboard/admin/overview/page.jsx` using `getAdminDashboardSummary`.
- Connect `src/app/dashboard/admin/reports/page.jsx` using `getAdminReports`, `dismissReport`, and `takeDownRecipe`.

---

## 🗺️ Step 7: Implement Payment & Gateway Checkouts (Final Phase)

### 1. Backend Server Endpoint
- Implement **`GET /api/payment/verify?session_id=...`**: Call Stripe API to check checkout success. On success, update user role to `premium` in database and log the transaction.

### 2. Client API Blueprint
- Go to `src/lib/api/payment.js` and uncomment `verifyPaymentSession`.

### 3. Frontend Page Connection
- Go to `src/app/payment/success/page.jsx`.
- Uncomment the `verifyPaymentSession` import, read the `session_id` search parameter, and trigger verification in `useEffect`.
