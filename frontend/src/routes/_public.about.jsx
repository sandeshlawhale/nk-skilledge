import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_public/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl pt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/50 border border-sky-200 text-sky-700 text-sm font-semibold mb-6">
          Our Story
        </div>
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 tracking-tight mb-6">
          Empowering the next generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700">innovators.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 font-medium">
          NKSkilledge was founded with a simple but powerful mission: bridge the gap between academic learning and real-world tech industry demands. We don't just teach code; we build engineers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 text-left">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h3 className="text-2xl font-bold font-heading text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              To provide accessible, high-quality, project-based education that prepares students for immediate impact in the technology sector.
            </p>
          </div>
          <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
            <h3 className="text-2xl font-bold font-heading text-slate-900 mb-3 text-orange-600">Our Vision</h3>
            <p className="text-orange-800/80 font-medium leading-relaxed">
              To become the global standard for practical, industry-aligned software engineering and AI education.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
