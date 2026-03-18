import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, PlayCircle } from 'lucide-react'
import { DASHBOARD_COURSES } from '@/constants'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="space-y-10 max-w-7xl mx-auto font-geist">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <Badge className="bg-primary/10 text-primary border-primary/20 font-bold mb-3 uppercase tracking-widest">Student Portal</Badge>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-slate-500 font-medium italic mt-1">Ready to continue your journey towards excellence?</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold border-slate-200 bg-white h-12 px-6 uppercase tracking-tight">
            View Schedule
          </Button>
          <Button className="bg-slate-900 hover:bg-primary rounded-xl font-bold h-12 px-6 uppercase tracking-tight shadow-lg shadow-indigo-100">
            Resume Learning
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 shadow-sm rounded-3xl overflow-hidden bg-white group hover:shadow-xl transition-all duration-500">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <Badge variant="secondary" className="bg-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-0">Current</Badge>
            </div>
            <div className="text-4xl font-black text-slate-900 mb-1">03</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enrolled Courses</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-3xl overflow-hidden bg-white group hover:shadow-xl transition-all duration-500">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6" />
              </div>
              <Badge variant="secondary" className="bg-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-0">Total Time</Badge>
            </div>
            <div className="text-4xl font-black text-slate-900 mb-1">24.5h</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hours Learned</p>
          </CardContent>
        </Card>

        <Card className="border-primary bg-slate-900 shadow-2xl rounded-3xl text-white p-8 relative overflow-hidden flex flex-col justify-center min-h-[200px] group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <Badge className="bg-primary text-white border-0 font-bold mb-4 px-3 py-1">UP NEXT</Badge>
            <h3 className="text-2xl font-black italic tracking-tight uppercase mb-2">Advanced React Patterns</h3>
            <p className="text-slate-400 text-sm mb-6 font-medium">Module 4: Performance Optimization & HoC</p>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 text-primary">
                  <span>Course Progress</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-1.5 bg-white/10 [&>div]:bg-primary" />
              </div>
              <Button size="icon" className="h-12 w-12 rounded-2xl bg-white text-slate-900 hover:bg-primary hover:text-white transition-all shadow-xl">
                <PlayCircle className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
            <div className="h-2 w-8 bg-primary rounded-full"></div>
            Your Learning Continuum
          </h2>
          <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary">
            See All Activity
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DASHBOARD_COURSES.map((course) => (
            <Card key={course.id} className="group overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl flex flex-col">
              <div className="h-44 bg-slate-100 relative overflow-hidden">
                <img src={`https://placehold.co/400x200/e2e8f0/4f46e5?text=Course+${course.id}`} alt="Course Cover" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {course.progress === 100 ? (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                    COMPLETED
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                    {course.progress}% DONE
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-black text-slate-900 mb-6 text-xl uppercase tracking-tight italic group-hover:text-primary transition-colors line-clamp-2 min-h-[56px]">{course.title}</h3>
                <div className="mt-auto space-y-5">
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2.5">
                      <span className="text-slate-400">{course.completedLessons} / {course.totalLessons} Modules</span>
                      <span className={course.progress === 100 ? 'text-green-500' : 'text-primary'}>
                        {course.progress}%
                      </span>
                    </div>
                    <Progress value={course.progress} className={`h-1.5 bg-slate-100 ${course.progress === 100 ? '[&>div]:bg-green-500' : '[&>div]:bg-primary'}`} />
                  </div>
                  <Button variant={course.progress === 100 ? 'outline' : 'default'} className={`w-full h-12 rounded-xl font-bold uppercase tracking-wider transition-all ${course.progress !== 100 ? 'bg-slate-900 group-hover:bg-primary shadow-lg shadow-indigo-50' : 'border-slate-200'}`}>
                    {course.progress === 0 ? 'Initialize Learning' : course.progress === 100 ? 'Review Content' : 'Resume Module'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
