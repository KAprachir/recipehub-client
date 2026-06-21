
# RecipeHub Backend Integration & Learning Guide

Welcome to the RecipeHub Integration Guide! This document is designed to help you learn how to connect your Next.js client to your MongoDB server. 

Below you will find a full breakdown of the API endpoints you need to write on your backend server, how to implement helper utilities in the client, and how to invoke them in your pages.

---

## 🔑 0. Token Verification Middleware Setup (Authentication)

Before your backend queries database entries on behalf of a user, it must verify the client's session token sent via the `Authorization: Bearer <token>` header.

### Step-by-Step Token Verification Process:
1. **Extract Header**: Retrieve the `authorization` header from the incoming request (`req.headers.authorization`).
2. **Verify Bearer Format**: Ensure it contains a valid token starting with the prefix `Bearer `.
3. **Database Lookup**: Look up the token in the `session` collection:
   ```javascript
   const session = await db.collection('session').findOne({ token: tokenValue });
   ```
4. **Validation Check**: Verify if the session exists and has not expired:
   ```javascript
   if (!session || new Date() > new Date(session.expiresAt)) {
     return res.status(401).send({ message: "Unauthorized - Session expired or invalid" });
   }
   ```
5. **Fetch User**: Find the corresponding user in the `user` collection:
   ```javascript
   const user = await db.collection('user').findOne({ _id: new ObjectId(session.userId) });
   ```
6. **Attach and Next**: Bind `req.user = user` to the request object and execute `next()` to proceed to your route handler.

### Middleware Implementation in `index.js`:
Add the following middleware function inside your backend `run()` block:

```javascript
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    // session কালেকশন থেকে টোকেন চেক করুন
    const session = await db.collection('session').findOne({ token });
    if (!session) {
      return res.status(401).send({ message: 'Unauthorized - Invalid session' });
    }

    // টোকেন এক্সপায়ার্ড কিনা চেক করুন
    if (new Date() > new Date(session.expiresAt)) {
      return res.status(401).send({ message: 'Unauthorized - Session expired' });
    }

    // ইউজার কালেকশন থেকে ইউজার বের করুন
    const user = await db.collection('user').findOne({ _id: new ObjectId(session.userId) });
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized - User not found' });
    }

    // রিকোয়েস্ট অবজেক্টে ইউজার সেট করে দিন
    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).send({ message: 'Internal server error during authentication' });
  }
};
```

You can now protect any backend route (like `/api/user/my-recipes`) by passing `verifyToken` as middleware:
```javascript
app.get('/api/user/my-recipes', verifyToken, async (req, res) => {
  // Now you can safely access req.user
  const recipes = await recipesCollection.find({ userId: req.user._id.toString() }).toArray();
  res.send(recipes);
});
```

---

## 1. Backend Server APIs to Implement

On your Express/Node.js backend, you need to create the following endpoints. Each endpoint should interact with your MongoDB collections:

### A. User Dashboard APIs
- **`GET /api/user/dashboard-summary`**
  - **Goal**: Returns statistical overview data for the logged-in user.
  - **MongoDB Query Idea**:
    ```javascript
    const totalRecipes = await db.collection('recipes').countDocuments({ userId: req.user.id });
    const totalFavorites = await db.collection('favorites').countDocuments({ userId: req.user.id });
    const likesResult = await db.collection('recipes').aggregate([
      { $match: { userId: req.user.id } },
      { $group: { _id: null, totalLikes: { $sum: "$likesCount" } } }
    ]).toArray();
    // Return this payload:
    res.json({
      totalRecipes,
      totalFavorites,
      likesReceived: likesResult[0]?.totalLikes || 0,
      trendingRecipe: { name: "Spicy Truffle Risotto", views: "1.2k" },
      recentActivity: [ /* array of log objects */ ]
    });
    ```

- **`GET /api/user/my-recipes`**
  - **Goal**: Fetch recipes created only by the logged-in user.
  - **MongoDB Query Idea**:
    ```javascript
    const myRecipes = await db.collection('recipes').find({ userId: req.user.id }).toArray();
    res.json(myRecipes);
    ```

- **`GET /api/user/favorites`**
  - **Goal**: Fetch recipes that the user has added to their favorites.
  - **MongoDB Query Idea**:
    ```javascript
    const favorites = await db.collection('favorites').find({ userId: req.user.id }).toArray();
    const recipeIds = favorites.map(fav => fav.recipeId);
    const favoriteRecipes = await db.collection('recipes').find({ _id: { $in: recipeIds } }).toArray();
    res.json(favoriteRecipes);
    ```

- **`GET /api/user/purchased`**
  - **Goal**: Fetch premium recipes unlocked or purchased by the current user.
  - **MongoDB Query Idea**:
    ```javascript
    const purchases = await db.collection('purchased_recipes').find({ userId: req.user.id }).toArray();
    const recipeIds = purchases.map(p => p.recipeId);
    const unlockedRecipes = await db.collection('recipes').find({ _id: { $in: recipeIds } }).toArray();
    res.json(unlockedRecipes);
    ```

### B. Admin Dashboard APIs
- **`GET /api/admin/overview-summary`**
  - **Goal**: Return global statistics, logs, and system growth data.
  - **MongoDB Query Idea**:
    ```javascript
    const totalUsers = await db.collection('users').countDocuments();
    const totalRecipes = await db.collection('recipes').countDocuments();
    const premiumMembers = await db.collection('users').countDocuments({ role: 'premium' });
    const totalReports = await db.collection('reports').countDocuments();
    res.json({ totalUsers, totalRecipes, premiumMembers, totalReports });
    ```

- **`GET /api/admin/reports`**
  - **Goal**: Fetch all reports flagged by users.
  - **MongoDB Query Idea**:
    ```javascript
    const reports = await db.collection('reports').find().toArray();
    res.json(reports);
    ```

### C. Mutations & Actions
- **`DELETE /api/recipes/:id`**
  - **Goal**: Delete or take down a recipe.
  - **MongoDB Query Idea**:
    ```javascript
    await db.collection('recipes').deleteOne({ _id: req.params.id });
    res.json({ message: "Recipe removed successfully" });
    ```

- **`POST /api/recipes/:id/favorite`**
  - **Goal**: Toggle favorite status (add if not present, remove if already present).
  - **MongoDB Query Idea**:
    ```javascript
    const query = { userId: req.user.id, recipeId: req.params.id };
    const existing = await db.collection('favorites').findOne(query);
    if (existing) {
      await db.collection('favorites').deleteOne(query);
      res.json({ action: "removed" });
    } else {
      await db.collection('favorites').insertOne({ ...query, createdAt: new Date() });
      res.json({ action: "added" });
    }
    ```

- **`PUT /api/admin/reports/:id/dismiss`**
  - **Goal**: Update status of report to 'Dismissed' on the database.
  - **MongoDB Query Idea**:
    ```javascript
    await db.collection('reports').updateOne({ _id: req.params.id }, { $set: { status: 'Dismissed' } });
    res.json({ message: "Report dismissed" });
    ```

- **`GET /api/payment/verify`**
  - **Goal**: Validate session query params and mark membership status as premium.
  - **MongoDB Query Idea**:
    ```javascript
    const { session_id } = req.query;
    // Check session validity with Stripe API
    // Update user status
    await db.collection('users').updateOne({ _id: req.user.id }, { $set: { role: 'premium' } });
    res.json({ status: "success", amount: "$14.99" });
    ```

---

## 2. Setting Up Client-Side Helper Functions

You should write these functions inside `src/lib/api/` and `src/lib/actions/` directories.

### A. Inside `src/lib/api/recipes.js`
Here is how you can write helper functions to fetch data:
```javascript
import { serverFetch } from '../core/server';

// 💡 IMPLEMENTED: Fetch recipes created by the current user
export const getUserRecipes = async () => {
  return serverFetch('/api/user/my-recipes', { cache: 'no-store' });
};

// 💡 TO IMPLEMENT: Fetch purchased recipes
export const getUserPurchasedRecipes = async () => {
  // return serverFetch('/api/user/purchased', { cache: 'no-store' });
};
```

### B. Inside `src/lib/api/user.js`
```javascript
import { serverFetch } from '../core/server';

// 💡 TO IMPLEMENT: Fetch summary counts for overview dashboard
export const getUserDashboardSummary = async () => {
  // return serverFetch('/api/user/dashboard-summary', { cache: 'no-store' });
};

// 💡 IMPLEMENTED: Fetch favorite recipes
export const getUserFavorites = async () => {
  return serverFetch('/api/user/favorites', { cache: 'no-store' });
};
```

### C. Inside `src/lib/actions/recipes.js`
For actions that change database state (mutations), use `serverMutation`:
```javascript
import { serverMutation } from '../core/server';

// 💡 IMPLEMENTED: Delete a recipe
export const deleteRecipe = async (id) => {
  return serverMutation(`/api/recipes/${id}`, {}, 'DELETE');
};

// 💡 IMPLEMENTED: Toggle favorite on a recipe
export const toggleFavoriteRecipe = async (id) => {
  return serverMutation(`/api/recipes/${id}/favorite`, {}, 'POST');
};
```

---

## 3. How to Connect Frontend Pages to These API Functions

Inside your page files (like `src/app/dashboard/user/overview/page.jsx`), use standard React hooks (`useState` and `useEffect`) to call the helper functions and display the active data:

### Example: Connecting My Recipes Page
```javascript
import React, { useState, useEffect } from "react";
import { getUserRecipes } from "@/lib/api/recipes";
import { deleteRecipe } from "@/lib/actions/recipes";

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load recipes on page mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getUserRecipes();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to load recipes", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle recipe delete
  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      // Remove deleted item from local state
      setRecipes(prev => prev.filter(recipe => recipe._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    // Render your grid maps here...
  );
}
```
