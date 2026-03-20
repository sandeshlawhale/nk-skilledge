import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlayCircle, Clock, Loader2, BookOpen, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CourseCard } from '@/components/shared/CourseCard'

export const Route = createFileRoute('/_auth/students/')({
  component: Dashboard,
})

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [enrollments, setEnrollments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    navigate({ to: '/students/my-courses', replace: true })
  }, [navigate])

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-1">
        <div>
          <Badge className="bg-primary/10 text-primary border-primary/20 font-black mb-3 uppercase tracking-widest text-[9px] rounded-none">Student Portal</Badge>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase italic">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-slate-500 font-medium italic mt-1">Ready to continue your journey towards excellence?</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-none font-black border-slate-200 bg-white h-11 px-6 uppercase tracking-widest text-[10px]">
            Schedule
          </Button>
          <Button className="bg-slate-900 hover:bg-primary rounded-none font-black h-11 px-6 uppercase tracking-widest text-[10px] shadow-none">
            Resume Learning
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 px-1">
        <Card className="border-0 shadow-sm rounded-none overflow-hidden bg-white/50 backdrop-blur-sm group hover:shadow-lg transition-all duration-500">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="h-10 w-10 rounded-none bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="h-5 w-5" />
              </div>
              <Badge variant="secondary" className="bg-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400 border-0 rounded-none">Current</Badge>
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1 italic">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-slate-200" /> : String(enrollments.length).padStart(2, '0')}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrolled Courses</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-none overflow-hidden bg-white/50 backdrop-blur-sm group hover:shadow-lg transition-all duration-500">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="h-10 w-10 rounded-none bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="h-5 w-5" />
              </div>
              <Badge variant="secondary" className="bg-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400 border-0 rounded-none">Total Time</Badge>
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1 italic">24.5h</div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hours Learned</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-slate-900 shadow-xl rounded-none text-white p-8 relative overflow-hidden flex flex-col justify-center min-h-[180px] group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <Badge className="bg-primary text-white border-0 font-black mb-4 px-2 py-0.5 rounded-none uppercase tracking-widest text-[8px]">ACTIVE UNIT</Badge>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-slate-600" />
            ) : enrollments.length > 0 ? (
              <>
                <h3 className="text-xl font-black italic tracking-tight uppercase mb-1 line-clamp-1">{enrollments[0].courseId?.title}</h3>
                <p className="text-slate-400 text-[10px] mb-6 font-bold uppercase tracking-widest italic opacity-80">Jump back into your curriculum.</p>
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.2em] mb-2 text-primary">
                      <span>Module Progress</span>
                      <span>{enrollments[0].progress || 0}%</span>
                    </div>
                    <Progress value={enrollments[0].progress || 0} className="h-1 bg-white/10 [&>div]:bg-primary rounded-none" />
                  </div>
                  <Button asChild size="icon" className="h-10 w-10 rounded-none bg-white text-slate-900 hover:bg-primary hover:text-white transition-all shadow-none">
                    <Link to={`/students/course/${enrollments[0].courseId?._id}`}>
                      <PlayCircle className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-black italic tracking-tight uppercase mb-1">No Active Units</h3>
                <p className="text-slate-400 text-[10px] mb-6 font-bold uppercase tracking-widest italic">Explore our catalog to start learning.</p>
                <Button asChild className="bg-white text-slate-900 hover:bg-primary hover:text-white rounded-none font-black h-10 px-6 uppercase tracking-widest text-[9px] shadow-none">
                  <Link to="/students/all-courses">Browse Catalog</Link>
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3 italic">
            <div className="h-2 w-8 bg-primary rounded-none"></div>
            Continuum
          </h2>
          <Button asChild variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary">
            <Link to="/students/my-courses">Deep Dive <ChevronRight className="h-3 w-3 ml-1" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-1">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary/20" />
            </div>
          ) : enrollments.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-slate-50/50 rounded-none border border-dashed border-slate-200">
              <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Zero active enrollments found.</p>
              <Button asChild variant="link" className="text-primary mt-2 uppercase text-[10px] font-black tracking-widest">
                <Link to="/students/all-courses">Browse Catalog</Link>
              </Button>
            </div>
          ) : (
            enrollments.slice(0, 3).map((enrollment) => (
              <CourseCard
                key={enrollment._id}
                course={enrollment.courseId}
                progress={enrollment.progress}
                linkTo={`/students/course/${enrollment.courseId?._id}`}
                metadata="Last Accessed"
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
