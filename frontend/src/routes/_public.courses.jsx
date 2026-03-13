import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_public/courses')({
  component: CoursesPage,
})

function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl pt-16">
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/50 border border-sky-200 text-sky-700 text-sm font-semibold mb-6">
            Our Curriculum
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 tracking-tight mb-6">
            Master the tools of <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700">tomorrow.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium mb-8">
            Comprehensive, project-based courses designed to take you from beginner to job-ready software engineer.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: 'Full-Stack Web Development', level: 'Beginner to Advanced', duration: '12 Weeks', tags: ['React', 'Node.js', 'PostgreSQL'], color: 'border-sky-200' },
                { title: 'Applied AI & Machine Learning', level: 'Intermediate', duration: '8 Weeks', tags: ['Python', 'TensorFlow', 'LLMs'], color: 'border-indigo-200' },
                { title: 'Advanced Frontend Architecture', level: 'Advanced', duration: '6 Weeks', tags: ['Next.js', 'TypeScript', 'Tailwind'], color: 'border-orange-200' },
            ].map((course, i) => (
                <div key={i} className={`flex flex-col bg-white border ${course.color} p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{course.level}</span>
                        <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{course.duration}</span>
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">{course.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-8 flex-1">
                        {course.tags.map(tag => (
                            <span key={tag} className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full">{tag}</span>
                        ))}
                    </div>

                    <Button className="w-full rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold h-12 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                        Enroll Now
                    </Button>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}
