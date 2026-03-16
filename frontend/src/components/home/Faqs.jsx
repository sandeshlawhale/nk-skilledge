import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FAQS } from '@/constants'

export function Faqs() {
  return (
    <section className="w-full max-w-7xl py-12 px-4 mx-auto border-t border-slate-100">
      <div className="mb-8 flex items-center gap-3 w-full justify-center">
        <div className="h-px w-8 bg-primary"></div>
        <p className="font-bold text-xs tracking-[0.2em] text-primary uppercase">FAQ</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-12 items-start">
        {/* Left Column: Heading & CTA (1/3) */}
        <div className="md:col-span-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Frequently Asked <span className="text-primary italic">Questions.</span>
            </h2>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Find answers to common questions about our courses, services, and how NK SkillEdge helps students and businesses grow.
            </p>
          </div>

          {/* CTA - Hidden on mobile as per requirement */}
          <div className="hidden md:block p-8 bg-white border border-slate-200 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[6px_6px_0px_0px_rgba(37,99,235,0.1)] transition-all duration-300">
            <p className="text-slate-900 font-bold leading-relaxed">
              Still have questions?
            </p>
            <Link to="/contact">
              <Button variant="brutal" className="w-full bg-slate-900 hover:bg-primary transition-all duration-300 h-14">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Accordion (2/3) */}
        <div className="md:col-span-2">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-t border-slate-200 last:border-b"
              >
                <AccordionTrigger className="text-lg md:text-xl font-bold text-slate-900 hover:text-primary hover:no-underline text-left py-5 px-4 transition-colors cursor-pointer">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base md:text-lg leading-relaxed pb-5 font-light px-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
