import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlayCircle, Clock, Award, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth/dashboard/my-courses')({
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
        const response = await fetch(`${API_BASE_URL}/enrollments/user/${user._id}`)
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-geist">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Learning</h1>
        <p className="text-slate-500 mt-1 italic">Pick up from where you left off.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {enrollments.map((enrollment) => {
          const course = enrollment.courseId
          const progress = enrollment.progress || 0
          return (
            <Card key={enrollment._id} className="overflow-hidden flex flex-col group border-0 bg-transparent shadow-none hover:bg-slate-100/50 p-2 rounded-xl transition-all duration-200">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-200 shadow-sm transition-transform duration-200 group-hover:shadow-md">
                <img 
                  src={course?.thumbnail || 'https://placehold.co/600x400/e2e8f0/4f46e5?text=Course'} 
                  alt={course?.title} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Progress Bar at bottom of thumbnail - YouTube Style */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
                    <div 
                      className="h-full bg-red-600 transition-all duration-300 shadow-[0_0_8px_rgba(220,38,38,0.5)]" 
                      style={{ width: `${progress}%` }} 
                    />
                </div>

                <div className="absolute bottom-2 right-2">
                   <Badge className="bg-black/80 text-white text-[10px] font-bold border-0 px-1.5 py-0">
                     {course?.lessonsCount || 0} LESSONS
                   </Badge>
                </div>
              </div>
              
              <div className="flex mt-3 gap-3">
                 <div className="h-9 w-9 bg-linear-to-br from-indigo-500 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                   NK
                 </div>
                 <div className="flex flex-col flex-1 min-w-0 pr-2">
                    <h3 className="font-bold text-slate-900 line-clamp-2 text-sm leading-snug group-hover:text-primary transition-colors mb-1">
                      {course?.title}
                    </h3>
                    <div className="flex flex-col text-[12px] text-slate-500 space-y-0.5">
                      <span className="font-medium">NK Skilledge Academy</span>
                      <div className="flex items-center gap-1.5 font-semibold text-slate-600">
                         <span>{progress}% watched</span>
                         <span className="h-0.5 w-0.5 rounded-full bg-slate-400" />
                         <span className="text-[11px] uppercase tracking-tighter">Enrolled</span>
                      </div>
                    </div>
                 </div>
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                    <MoreVertical className="h-4 w-4" />
                 </Button>
              </div>

              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button asChild className="w-full bg-slate-900 hover:bg-red-600 text-white font-semibold text-xs py-1 h-8">
                  <Link to={`/dashboard/course/${course?._id}/lesson/active`}>
                    <PlayCircle className="mr-1.5 h-3.5 w-3.5" /> RESUME COURSE
                  </Link>
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {enrollments.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
          <div className="mb-4 text-slate-300">
             <PlayCircle className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No courses yet</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-6">Explore our curriculum and start your learning journey today.</p>
          <Button asChild>
            <Link to="/dashboard/all-courses">Browse Courses</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
