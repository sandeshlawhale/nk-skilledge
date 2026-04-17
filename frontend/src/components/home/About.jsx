import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import CountUp from '@/components/ui/count-up'
import { TRAINING_STATS } from '@/constants'

export function About() {
  return (
    <section className="w-full max-w-7xl py-12 px-4 mx-auto border-t border-slate-100">
      {/* Section Header */}
      <div className="mb-8 flex items-center gap-3 w-full justify-center">
        <div className="h-px w-8 bg-primary"></div>
        <p className="font-bold text-xs tracking-[0.2em] text-primary uppercase">About NK SkillEdge</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
        {/* Left Column: Image (1/3 width) */}
        <div className='md:col-span-1 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.09)]'>
          <div className="border-2 border-slate-900 bg-white overflow-hidden">
            <img
              src="/Kartik-CEO.png"
              alt="Kartik Mendhe - CEO"
              className="w-full aspect-4/5 object-cover transition-all duration-700"
            />
          </div>
        </div>

        {/* Right Column: Content (2/3 width) */}
        <div className="md:col-span-2 flex flex-col space-y-4">
          <div className="pt-2">
            <h3 className="text-3xl font-black text-slate-900">Kartik Mendhe</h3>
            <p className="text-slate-500 text-sm font-semibold capitalize tracking-wide">CEO, NK SkillEdge Pvt. Ltd.</p>
          </div>

          <div className="space-y-4 text-lg font-medium text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-500 text-base">Who We Are:</span>
            <p>
              NK SkillEdge is a youth-led initiative focused on bridging the gap between education and industry.
              Founded by passionate young innovators, our mission is to empower students with practical skills and real-world exposure
              that prepares them for modern careers.
            </p>
            <span className="font-bold text-slate-500 text-base">What We Do:</span>
            <p>
              Along with training the next generation of developers, we also build digital solutions for businesses and startups.
              From websites and applications to scalable digital platforms, NK SkillEdge combines learning with real-world development
              to create meaningful impact.
            </p>
          </div>

          <div className="pt-4">
            <Link to="/about">
              <Button variant="outline" size="hero" className="group">
                Learn More
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </Link>
          </div>

          <div className="w-full max-w-7xl mx-auto flex flex-col space-y-2 pt-6">
            <div className="">
              <p className="font-bold text-xs tracking-wide text-primary capitalize">Our Students</p>
              <h2 className="text-3xl md:text-2xl font-semibold text-slate-900 tracking-tight">Making a <span className="text-primary italic">Real Impact</span></h2>
            </div>

            <div className="grid grid-cols-2 md:flex md:flex-row gap-8 md:gap-12 w-full md:w-auto">
              {TRAINING_STATS.map((stat, i) => (
                <div key={i} className="">
                  <p className="text-4xl font-black text-slate-900 mb-1">
                    <CountUp
                      from={0}
                      to={stat.number}
                      direction="up"
                      duration={0.5}
                      className="text-primary"
                      startWhen={true}
                      separator=""
                    />{i == 2 ? "%" : "+"}
                  </p>
                  <p className="text-sm font-semibold text-primary capitalize tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
