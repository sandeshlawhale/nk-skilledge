import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, PlayCircle } from 'lucide-react'
import { DASHBOARD_COURSES } from '@/constants'

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back, {user?.name}!</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="border bg-white shadow-xs p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">Enrolled Courses</h3>
            <BookOpen className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-slate-900">3</div>
        </div>
        <div className="border bg-white shadow-xs p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">Hours Learned</h3>
            <Clock className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-slate-900">24.5</div>
        </div>
        <div className="md:col-span-2 border bg-primary shadow-lg text-white p-6 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl -mr-10 -mt-10" />
          <h3 className="text-lg font-bold mb-1">Continue Learning</h3>
          <p className="text-white/90 text-sm mb-4">Advanced React Patterns - Module 4</p>
          <div className="flex items-center gap-4">
            <Button size="sm" variant="secondary" className="font-semibold">
              <PlayCircle className="mr-2 h-4 w-4" /> Resume Course
            </Button>
            <span className="text-sm font-medium">65% Completed</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          Your Active Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DASHBOARD_COURSES.map((course) => (
            <div key={course.id} className="border bg-white shadow-xs overflow-hidden flex flex-col">
              <div className="h-32 bg-slate-100 relative">
                <img src={`https://placehold.co/400x200/e2e8f0/4f46e5?text=Course+${course.id}`} alt="Course Cover" className="object-cover w-full h-full" />
                {course.progress === 100 && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1">
                    COMPLETED
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-slate-900 mb-4 line-clamp-2 min-h-12">{course.title}</h3>
                <div className="mt-auto space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-2">
                      <span className="text-slate-500">{course.completedLessons} / {course.totalLessons} Lessons</span>
                      <span className={course.progress === 100 ? 'text-green-600 font-bold' : 'text-primary'}>
                        {course.progress}%
                      </span>
                    </div>
                    <Progress value={course.progress} className={`h-2 ${course.progress === 100 ? '[&>div]:bg-green-500' : ''}`} />
                  </div>
                  <Button variant={course.progress === 100 ? 'outline' : 'default'} className="w-full">
                    {course.progress === 0 ? 'Start Course' : course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
