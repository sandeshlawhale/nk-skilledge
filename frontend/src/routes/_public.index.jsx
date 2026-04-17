import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/home/Hero'
import { TrustedBy } from '@/components/home/TrustedBy'
import { Training } from '@/components/home/Training'
import { Services } from '@/components/home/Services'
import { About } from '@/components/home/About'
import { Testimonials } from '@/components/home/Testimonials'
import { Faqs } from '@/components/home/Faqs'
import { CTA } from '@/components/home/CTA'

export const Route = createFileRoute('/_public/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      <Hero />
      <TrustedBy />
      <Training />
      <Services />
      <About />
      <Testimonials />
      <Faqs />
      <CTA />
    </div>
  )
}

