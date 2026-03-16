import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="w-full max-w-7xl py-16 px-4 overflow-hidden container mx-auto flex flex-col items-center text-center space-y-8">
      <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter max-w-full leading-[1.1]">
        Transforming Talent Into<br /> Industry-Ready <span className="text-primary italic">Professionals.</span>
      </h1>
      <p className="text-xl md:text-2xl text-slate-500 w-full text-center font-light leading-relaxed">
        Gain hands-on learning, industry insights, and the confidence to succeed.<br />
        We prepare students with the skills needed for today&apos;s professional world.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16 w-full sm:w-auto">
        <Link to="/courses">
          <Button size="hero" variant="brutal" className="w-full">
            Explore courses
          </Button>
        </Link>
        <Link to="/services">
          <Button size="hero" variant="brutal-outline" className="w-full">
            Get services
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-7xl aspect-21/9 bg-slate-900 border border-slate-900 shadow-[10px_10px_0px_0px_rgba(37,99,235,0.1)] relative overflow-hidden group">
        <img
          src="/brain/4cabaed3-a5e4-41df-bbd0-4b795a90aa25/hero_coding_premium_1773318755118.png"
          alt="Premium Coding Environment"
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
        />
      </div>
    </section>
  )
}
