import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Clock, Star, PlayCircle, Loader2, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/_auth/students/my-courses')({
  component: MyCourses,
})

function MyCourses() {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary/20" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-geist">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
        <div>
          <Badge className="bg-primary/10 text-primary border-primary/20 font-bold mb-2 uppercase tracking-widest text-[9px] rounded-none">Learning Hub</Badge>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase italic">My Curriculum</h1>
          <p className="text-slate-500 font-medium italic mt-0.5 text-xs">Track your progress and continue your professional journey.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((enrollment) => {
          const course = enrollment.courseId
          const progress = enrollment.progress || 0
          return (
            <Card key={enrollment._id} className="group overflow-hidden border border-slate-200 shadow-none hover:shadow-lg transition-all duration-500 bg-white rounded-none flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course?.thumbnail || `https://placehold.co/600x400/e2e8f0/4f46e5?text=${course?.title}`}
                  alt={course?.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2">
                  {progress === 100 ? (
                    <Badge className="bg-green-600 text-white font-black shadow-lg border-0 px-3 py-1 rounded-none uppercase text-[9px] tracking-widest">
                      COMPLETED
                    </Badge>
                  ) : (
                    <Badge className="bg-white/90 backdrop-blur-md text-slate-900 font-black shadow-lg border-0 px-3 py-1 rounded-none uppercase text-[9px] tracking-widest">
                      {progress}% DONE
                    </Badge>
                  )}
                </div>
              </div>

              <CardHeader className="p-5 pb-0">
                <div className="flex items-center gap-2 mb-2 text-primary font-black text-[9px] uppercase tracking-[0.2em]">
                  <div className="h-1 w-4 bg-primary rounded-none"></div>
                  {course?.lessonsCount || 0} Modules
                </div>
                <CardTitle className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors line-clamp-1 uppercase italic tracking-tighter">
                  {course?.title}
                </CardTitle>
                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Progress</span>
                    <span className={progress === 100 ? 'text-green-600' : 'text-primary'}>{progress}%</span>
                  </div>
                  <Progress value={progress} className={`h-1 bg-slate-100 rounded-none ${progress === 100 ? '[&>div]:bg-green-600' : '[&>div]:bg-primary'}`} />
                </div>
              </CardHeader>

              <CardContent className="px-5 py-4 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[9px] tracking-widest">
                  <Clock className="h-3 w-3" />
                  <span>{course?.duration || 'Self-Paced'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-600 font-black bg-amber-50 px-2 py-0.5 rounded-none">
                  <Star className="h-3 w-3 fill-amber-600" />
                  <span className="text-[10px]">4.9</span>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0">
                <Button asChild className={`w-full transition-all duration-300 h-11 rounded-none font-black uppercase tracking-widest text-[10px] shadow-none ${progress === 100 ? 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50' : 'bg-slate-900 hover:bg-primary text-white'}`}>
                  <Link to={`/students/course/${course?._id}`} className="flex items-center justify-center gap-2">
                    {progress === 100 ? 'Review Content' : progress === 0 ? 'Initialize Learning' : 'Resume Module'}
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {enrollments.length === 0 && (
        <div className="text-center py-20 bg-slate-50/50 rounded-none border border-dashed border-slate-200">
          <div className="h-16 w-16 bg-white rounded-none flex items-center justify-center text-slate-200 shadow-sm mx-auto mb-6">
            <BookOpen className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">No active courses</h3>
          <p className="text-slate-500 font-medium mt-2 italic text-sm">You haven't enrolled in any courses yet.</p>
          <Button asChild className="mt-6 bg-slate-900 rounded-none px-8 h-12 font-black uppercase tracking-widest shadow-none text-xs">
             <Link to="/students/all-courses">Browse Catalog</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
