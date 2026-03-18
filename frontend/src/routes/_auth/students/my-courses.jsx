import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlayCircle, Clock, Award, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    <div className="space-y-10 max-w-7xl mx-auto font-geist">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 font-bold mb-3 uppercase tracking-widest">Active Enrollment</Badge>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase italic">Your Learning Path</h1>
          <p className="text-slate-500 font-medium italic mt-1">Pick up exactly where you left off and master your craft.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-200 font-bold uppercase tracking-tight bg-white">
              Archive
           </Button>
           <Button asChild className="h-12 px-6 rounded-xl bg-slate-900 hover:bg-primary font-bold uppercase tracking-tight shadow-lg shadow-indigo-100">
              <Link to="/students/all-courses">Find More Courses</Link>
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {enrollments.map((enrollment) => {
          const course = enrollment.courseId
          const progress = enrollment.progress || 0
          return (
            <Card key={enrollment._id} className="group overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white rounded-[2rem] flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={course?.thumbnail || 'https://placehold.co/600x400/e2e8f0/4f46e5?text=Course'} 
                  alt={course?.title} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" 
                />
                
                {/* Progress Overlay - YouTube Style */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-black/20">
                    <div 
                      className="h-full bg-red-600 transition-all duration-300 shadow-[0_0_12px_rgba(220,38,38,0.8)]" 
                      style={{ width: `${progress}%` }} 
                    />
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                   <Badge className="bg-black/80 backdrop-blur-md text-white text-[10px] font-black border-0 px-3 py-1 rounded-full uppercase tracking-widest">
                     {progress}% COMPLETED
                   </Badge>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                 <div className="flex items-start gap-4 mb-6">
                    <div className="h-12 w-12 bg-linear-to-br from-indigo-500 to-orange-400 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg shadow-indigo-100">
                      NK
                    </div>
                    <div className="flex-1 min-w-0">
                       <h3 className="font-black text-slate-900 text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase italic tracking-tighter">
                         {course?.title}
                       </h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Prof. Sandesh L.</p>
                    </div>
                 </div>

                 <div className="mt-auto space-y-6">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-t border-slate-50 pt-6">
                       <span className="flex items-center gap-2">
                          <Clock className="h-3 w-3" /> Still In Progress
                       </span>
                       <Badge variant="ghost" className="h-5 px-2 bg-slate-50 text-slate-400 font-black rounded-lg">
                          V1.0
                       </Badge>
                    </div>

                    <Button asChild className="w-full bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest h-14 rounded-2xl shadow-xl shadow-slate-100 transition-all group-hover:translate-y-[-2px]">
                      <Link to={`/students/course/${course?._id}/lesson/active`}>
                        <PlayCircle className="mr-3 h-5 w-5" /> Resume Module
                      </Link>
                    </Button>
                 </div>
              </div>
            </Card>
          )
        })}
      </div>

      {enrollments.length === 0 && !isLoading && (
        <div className="text-center py-32 bg-slate-50/50 rounded-[3.5rem] border-4 border-dashed border-white shadow-sm">
          <div className="h-24 w-24 bg-white rounded-[2rem] flex items-center justify-center text-slate-200 shadow-sm mx-auto mb-8">
             <PlayCircle className="h-12 w-12" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight italic">Your path is empty</h3>
          <p className="text-slate-500 font-medium mt-3 italic max-w-sm mx-auto">Start your transformation today by enrolling in our expert-led courses.</p>
           <Button asChild className="mt-10 bg-slate-900 rounded-2xl px-10 h-14 font-black uppercase tracking-widest shadow-2xl shadow-slate-200 hover:scale-105 transition-all">
            <Link to="/students/all-courses" className="text-white">Initialize Catalog</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
