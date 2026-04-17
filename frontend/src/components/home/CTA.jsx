import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section className="w-full max-w-7xl py-12 px-4 mx-auto overflow-hidden">
      <div className="relative bg-slate-950 p-8 md:p-12 md:px-16 overflow-hidden group border border-white/5">
        {/* Mesh Gradient Blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-emerald-500/20 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-30%] right-[10%] w-[70%] h-[90%] bg-purple-600/30 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[70%] bg-pink-500/40 blur-[100px] rounded-full mix-blend-screen"></div>

        <div className="relative z-10 flex flex-col items-start text-left space-y-2 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tighter leading-[1.1]">
            Ready to Start{" "}
            <span className="text-white italic">Your Journey?</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-xl">
            Join our industry-focused training or partner with us to build innovative digital solutions.
          </p>
          <div className="pt-4 flex flex-row gap-6">
            <Link to="/training">
              <Button size="xl" variant="secondary" className="border border-background">
                View Training
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="xl" className="text-background">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
