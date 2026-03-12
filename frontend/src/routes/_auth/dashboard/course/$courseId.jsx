import { createFileRoute, Outlet, Link, useParams } from '@tanstack/react-router'
import { PlayCircle, CheckCircle, Lock, LayoutList } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export const Route = createFileRoute('/_auth/dashboard/course/$courseId')({
  component: CourseLayout,
})

const MODULES = [
  {
    id: 'm1',
    title: 'Introduction & Setup',
    lessons: [
      { id: 'l1', title: 'Course Overview', duration: '5:24', status: 'completed' },
      { id: 'l2', title: 'Environment Setup', duration: '12:15', status: 'completed' },
    ]
  },
  {
    id: 'm2',
    title: 'Core Architecture',
    lessons: [
      { id: 'l3', title: 'Understanding the Component Tree', duration: '18:30', status: 'current' },
      { id: 'l4', title: 'State Management Patterns', duration: '25:40', status: 'locked' },
    ]
  }
]

function CourseLayout() {
  const { courseId } = useParams({ from: '/_auth/dashboard/course/$courseId' })

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 border-t -m-6 md:-m-8">
      {/* Sidebar / Curriculum */}
      <aside className="w-full md:w-80 lg:w-96 bg-white border-r flex flex-col h-screen sticky top-0 md:h-[calc(100vh-64px)]">
        <div className="p-6 border-b">
          <Link to="/dashboard" className="text-sm font-medium text-indigo-600 hover:underline mb-4 inline-block">
            &larr; Back to Dashboard
          </Link>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">Advanced React Patterns & Architecture</h2>
          <div className="mt-4">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Overall Progress</span>
              <span className="text-indigo-600">35%</span>
            </div>
            <Progress value={35} className="h-2" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {MODULES.map((module, i) => (
            <div key={module.id}>
              <h3 className="text-sm font-bold tracking-wide text-slate-500 uppercase mb-3 flex items-center">
                <LayoutList className="mr-2 h-4 w-4" /> Module {i + 1}: {module.title}
              </h3>
              <div className="space-y-1">
                {module.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    to={`/dashboard/course/${courseId}/lesson/${lesson.id}`}
                    className={`flex items-start gap-3 p-3 transition-colors ${
                      lesson.status === 'current' ? 'bg-indigo-50 border border-indigo-100' :
                      lesson.status === 'locked' ? 'opacity-60 cursor-not-allowed grayscale' :
                      'hover:bg-slate-50'
                    }`}
                  >
                    <div className="mt-0.5">
                      {lesson.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : lesson.status === 'current' ? (
                        <PlayCircle className="h-5 w-5 text-indigo-600 fill-indigo-100" />
                      ) : (
                        <Lock className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-medium truncate ${lesson.status === 'current' ? 'text-indigo-900 font-bold' : 'text-slate-700'}`}>
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">{lesson.duration}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Player Area */}
      <main className="flex-1 overflow-y-auto bg-slate-950 flex flex-col relative min-h-screen md:min-h-0">
        <Outlet />
      </main>
    </div>
  )
}
