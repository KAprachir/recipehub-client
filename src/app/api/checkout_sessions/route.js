import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'
import { getUserSession } from '@/lib/core/session'

export async function POST(req) {
  try {
    // 1. Get current logged-in user from request session cookies
    const user = await getUserSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const headersList = await headers()
    const origin = headersList.get('origin')

    // Parse request body dynamically
    let recipeId = null
    let recipeName = null
    let price = 1499 // default $14.99 (Premium Membership)
    let isPremiumUpgrade = true

    try {
      const contentType = req.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        const body = await req.json()
        if (body.recipeId) {
          recipeId = body.recipeId
          recipeName = body.recipeName
          price = Math.round(parseFloat(body.price || 4.99) * 100)
          isPremiumUpgrade = false
        }
      } else {
        const formData = await req.formData()
        const bodyRecipeId = formData.get('recipeId')
        if (bodyRecipeId) {
          recipeId = bodyRecipeId
          recipeName = formData.get('recipeName')
          price = Math.round(parseFloat(formData.get('price') || 4.99) * 100)
          isPremiumUpgrade = false
        }
      }
    } catch (e) {
      // Fallback if parsing fails or fields are missing
    }

    const lineItem = isPremiumUpgrade 
      ? {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'RecipeHub Premium Membership',
              description: 'Unlock premium profile badge and unlimited recipe creations.',
            },
            unit_amount: 1499, // $14.99 USD in cents
          },
          quantity: 1,
        }
      : {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Recipe Unlock: ${recipeName}`,
              description: `Get lifetime access to the premium recipe "${recipeName}".`,
            },
            unit_amount: price || 499, // dynamic recipe price
          },
          quantity: 1,
        }

    // 2. Create Stripe Checkout Session with inline price details
    const session = await stripe.checkout.sessions.create({
      line_items: [lineItem],
      mode: 'payment',
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}${recipeId ? `&recipe_id=${recipeId}` : ''}`,
      cancel_url: `${origin}/payment/cancel${recipeId ? `?recipe_id=${recipeId}` : ''}`,
      metadata: {
        userId: user.id, // Pass user ID as metadata to verify and upgrade
        recipeId: recipeId || '',
        isPremiumUpgrade: isPremiumUpgrade ? 'true' : 'false'
      },
    });

    // 3. Handle both JSON response and direct 303 Redirect
    const acceptHeader = req.headers.get('accept') || ''
    if (acceptHeader.includes('application/json')) {
      return NextResponse.json({ url: session.url })
    }

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}