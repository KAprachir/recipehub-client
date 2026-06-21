export const dynamic = 'force-dynamic'

import React from 'react'
import Hero from '@/components/shared/Hero'
import FeaturesSteps from '@/components/shared/FeaturesSteps'
import PremiumBanner from '@/components/shared/PremiumBanner'
import { getRecipes } from '@/lib/api/recipes'
import HomeRecipeSections from '@/components/recipes/HomeRecipeSections'

export default async function Home () {
  let featuredRecipes = []
  let popularRecipes = []

  try {
    const featuredRes = await getRecipes({ isFeatured: true })
    featuredRecipes = featuredRes?.recipes || []

    const popularRes = await getRecipes({ sortBy: 'Popular' })
    popularRecipes = (popularRes?.recipes || []).slice(0, 6)
  } catch (error) {
    console.error("Error fetching homepage recipes:", error)
  }

  return (
    <main className='flex-1 flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased selection:bg-[#046A38]/20 selection:text-[#046A38]'>
      {/* Hero Segment */}
      <div className='relative border-b border-neutral-50 dark:border-neutral-900'>
        <Hero />
      </div>

      {/* Dynamic Recipes Sections (Featured & Popular) */}
      <HomeRecipeSections 
        featuredRecipes={featuredRecipes} 
        popularRecipes={popularRecipes} 
      />

      {/* Features Workflow Steps Segment */}
      <div className='relative bg-neutral-50/50 dark:bg-neutral-900/10 border-b border-neutral-50 dark:border-neutral-900'>
        <FeaturesSteps />
      </div>

      {/* Premium Upgrade Segment Callout */}
      <div className='relative py-4 md:py-8'>
        <PremiumBanner />
      </div>
    </main>
  )
}
