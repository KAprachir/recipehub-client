import React from 'react'
import Hero from '@/components/shared/Hero'
import FeaturesSteps from '@/components/shared/FeaturesSteps'
import PremiumBanner from '@/components/shared/PremiumBanner'

export default function Home () {
  return (
    <main className='flex-1 flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased selection:bg-[#046A38]/20 selection:text-[#046A38]'>
      {/* Hero Segment */}
      <div className='relative border-b border-neutral-50 dark:border-neutral-900'>
        <Hero />
      </div>

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
