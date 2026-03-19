import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlayCircle, Clock, Award, MoreVertical, Loader2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export const Route = createFileRoute('/_auth/students/')({
  component: Dashboard,
})

function Dashboard() {
  const { user } = useAuthStore()

  const [enrollments, setEnrollments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user?._id) return
      try {
        const response = await authFetch(`${API_BASE_URL}/enrollments/user/${user._id}`)
        const data = await response.json()
        if (data.success) {
          setEnrollments(data.data)
        }

      } catch (error) {
        console.error('Error fetching enrollments:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEnrollments()
  }, [user?._id])


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
            <div className="text-4xl font-black text-slate-900 mb-1">
              {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-slate-200" /> : String(enrollments.length).padStart(2, '0')}
            </div>
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
            <Badge className="bg-primary text-white border-0 font-bold mb-4 px-3 py-1 uppercase tracking-widest text-[9px]">CONTINUE LEARNING</Badge>
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
            ) : enrollments.length > 0 ? (
              <>
                <h3 className="text-2xl font-black italic tracking-tight uppercase mb-2 line-clamp-1">{enrollments[0].courseId?.title}</h3>
                <p className="text-slate-400 text-sm mb-6 font-medium italic">Jump back into your curriculum.</p>
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 text-primary">
                      <span>Module Progress</span>
                      <span>{enrollments[0].progress || 0}%</span>
                    </div>
                    <Progress value={enrollments[0].progress || 0} className="h-1.5 bg-white/10 [&>div]:bg-primary" />
                  </div>
                  <Button asChild size="icon" className="h-12 w-12 rounded-2xl bg-white text-slate-900 hover:bg-primary hover:text-white transition-all shadow-xl">
                    <Link to={`/students/course/${enrollments[0].courseId?._id}/lesson/active`}>
                      <PlayCircle className="h-6 w-6" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-black italic tracking-tight uppercase mb-2">No Active Courses</h3>
                <p className="text-slate-400 text-sm mb-6 font-medium">Explore our catalog to start learning.</p>
                <Button asChild variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold px-6">
                  <Link to="/students/all-courses">Browse Catalog</Link>
                </Button>
              </>
            )}
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
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-slate-200" />
            </div>
          ) : enrollments.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active enrollments found.</p>
              <Button asChild variant="link" className="text-primary mt-2">
                <Link to="/students/all-courses">Browse Catalog</Link>
              </Button>
            </div>
          ) : (
            enrollments.map((enrollment) => {
              const course = enrollment.courseId
              const progress = enrollment.progress || 0
              return (
                <Card key={enrollment._id} className="group overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl flex flex-col">
                  <div className="h-44 bg-slate-100 relative overflow-hidden">
                    <img src={course?.thumbnail || `https://placehold.co/400x200/e2e8f0/4f46e5?text=${course?.title}`} alt="Course Cover" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {progress === 100 ? (
                      <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                        COMPLETED
                      </div>
                    ) : (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                        {progress}% DONE
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-black text-slate-900 mb-6 text-xl uppercase tracking-tight italic group-hover:text-primary transition-colors line-clamp-2 min-h-[56px]">{course?.title}</h3>
                    <div className="mt-auto space-y-5">
                      <div>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2.5">
                          <span className="text-slate-400">Modules Enrolled</span>
                          <span className={progress === 100 ? 'text-green-500' : 'text-primary'}>
                            {progress}%
                          </span>
                        </div>
                        <Progress value={progress} className={`h-1.5 bg-slate-100 ${progress === 100 ? '[&>div]:bg-green-500' : '[&>div]:bg-primary'}`} />
                      </div>
                      <Button asChild variant={progress === 100 ? 'outline' : 'default'} className={`w-full h-12 rounded-xl font-bold uppercase tracking-wider transition-all shadow-none ${progress !== 100 ? 'bg-slate-900 group-hover:bg-primary shadow-lg shadow-indigo-50 text-white' : 'border-slate-200'}`}>
                        <Link to={`/students/course/${course?._id}/lesson/active`}>
                          {progress === 0 ? 'Initialize Learning' : progress === 100 ? 'Review Content' : 'Resume Module'}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}
