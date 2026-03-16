import { Marquee } from '@/components/ui/marquee'
import { TESTIMONIALS } from '@/constants'

export function Testimonials() {
  return (
    <section className="py-12 bg-white overflow-hidden border-t border-slate-100 flex flex-col h-screen max-h-[800px] justify-center">
      <div className="text-center space-y-2 mb-8 px-4">
        <div className="flex items-center gap-3 w-full justify-center">
          <div className="h-px w-8 bg-primary"></div>
          <p className="font-bold text-xs tracking-[0.2em] text-primary uppercase">What People Say About Us</p>
        </div>
        <h2 className="text-xl md:text-3xl font-bold text-slate-900 tracking-tight">Voices of Trust & Excellence.</h2>
        <p className="text-base text-slate-500 max-w-2xl mx-auto w-full font-light">
          Don't just take our word for it. Here's what our clients and students have to say about their experience with NK SkillEdge.
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-center overflow-hidden w-full">
        <Marquee pauseOnHover className="[--duration:40s] [--gap:0px] border-l border-slate-200">
          {TESTIMONIALS.slice(0, Math.ceil(TESTIMONIALS.length / 2)).map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-[350px] flex flex-col p-6 bg-white border-y border-r border-slate-200 hover:bg-slate-50 transition-colors h-full"
            >
              <div className="flex-1 mb-4">
                <p className="text-sm text-slate-600 font-medium leading-relaxed italic line-clamp-4">
                  "{testimonial.testimonial}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">{testimonial.clientName}</h4>
                <p className="text-xs text-slate-500">
                  {testimonial.designation} <span className="text-primary font-semibold">@{testimonial.company}</span>
                </p>
              </div>
            </div>
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:45s] [--gap:0px] border-l border-slate-200 -mt-px">
          {TESTIMONIALS.slice(Math.ceil(TESTIMONIALS.length / 2)).map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-[350px] flex flex-col p-6 bg-white border-y border-r border-slate-200 hover:bg-slate-50 transition-colors h-full"
            >
              <div className="flex-1 mb-4">
                <p className="text-sm text-slate-600 font-medium leading-relaxed italic line-clamp-4">
                  "{testimonial.testimonial}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">{testimonial.clientName}</h4>
                <p className="text-xs text-slate-500">
                  {testimonial.designation} <span className="text-primary font-semibold">@{testimonial.company}</span>
                </p>
              </div>
            </div>
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-white"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-white"></div>
      </div>
    </section>
  )
}
