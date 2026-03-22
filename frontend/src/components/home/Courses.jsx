import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import { FEATURED_COURSES } from '@/constants'
import { PageHeader } from '../shared/PageHeader'

export function Courses() {
  return (
    <section className="w-full max-w-7xl py-12 px-4 mx-auto">
      <div className="mb-4 flex items-center gap-3 w-full justify-center">
        <div className="h-px w-8 bg-primary"></div>
        <p className="font-bold text-xs tracking-[0.2em] text-primary uppercase">Courses</p>
      </div>

      <PageHeader
        title="Build Skills That Companies Actually Hire For."
        subtitle="Hands-on training programs designed with real projects, industry tools, and mentorship to help you become job-ready."
      >
        <Link to="/courses">
          <Button variant="brutal-outline" size="xl">
            Browse all courses
          </Button>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {FEATURED_COURSES.map((course, i) => (
          <div key={i} className="group flex flex-col bg-white border border-slate-200 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] transition-all relative z-1 hover:z-10">
            <div className="w-full aspect-video bg-slate-100 relative overflow-hidden">
              <img src={course.img} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-col p-4 flex-1">
              <div className="mb-2">
                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">{course.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 font-light">{course.description}</p>
              </div>
              <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {course.duration}
                </div>
                <Link
                  to="/courses/$courseId"
                  params={{ courseId: course.id }}
                  className="inline-flex items-center justify-center bg-slate-100 hover:bg-primary hover:text-white text-slate-900 px-3 py-1.5 font-black text-[10px] tracking-widest uppercase transition-all duration-300"
                >
                  View &rsaquo;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
