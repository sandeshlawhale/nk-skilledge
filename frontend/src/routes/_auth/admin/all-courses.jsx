import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, Star, Info, ShieldCheck } from 'lucide-react'

export const Route = createFileRoute('/_auth/admin/all-courses')({
  component: AdminAllCourses,
})

function AdminAllCourses() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/courses`)
        const data = await response.json()
        if (data.success) {
          // For this view, we can show all, but maybe highlight published ones
          setCourses(data.data)
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-geist">
      <div className="flex justify-between items-end">
        <div>
          <Badge className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 font-bold mb-2 uppercase tracking-[0.2em] text-[10px]">Registry View</Badge>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase italic">Published Courses</h1>
          <p className="text-slate-500 mt-1 font-medium">Viewing the platform as a student to verify content delivery.</p>
        </div>
        <Button asChild variant="outline" className="rounded-xl border-slate-200 font-bold h-12 px-6">
           <Link to="/admin/courses">Switch to Management Mode</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.filter(c => c.status === 'published').map((course) => (
          <Card key={course._id} className="group overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl flex flex-col">
            <div className="relative aspect-video overflow-hidden">
               <img 
                 src={course.thumbnail || 'https://placehold.co/600x400/e2e8f0/4f46e5?text=Course'} 
                 alt={course.title} 
                 className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute top-4 right-4">
                 <Badge className="bg-white/90 backdrop-blur text-primary font-black shadow-lg border-0 px-3 py-1 uppercase text-[10px]">
                   {course.category || 'Professional'}
                 </Badge>
               </div>
            </div>
            
            <CardHeader className="p-6 pb-0">
               <div className="flex items-center gap-2 mb-3 text-indigo-500 font-black text-[10px] uppercase tracking-widest">
                 <ShieldCheck className="h-3.5 w-3.5" />
                 Platform Verified
               </div>
               <CardTitle className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors line-clamp-1 uppercase italic tracking-tight">
                 {course.title}
               </CardTitle>
               <CardDescription className="line-clamp-2 text-slate-600 mt-2 min-h-12 font-medium italic">
                 {course.description}
               </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6 flex items-center justify-between text-sm">
               <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessonsCount || 0} Modules</span>
               </div>
               <div className="flex items-center gap-1 text-amber-500 font-black">
                 <Star className="h-4 w-4 fill-amber-500" />
                 <span>4.9</span>
               </div>
            </CardContent>
            
            <CardFooter className="p-6 pt-0 mt-auto">
               <Button asChild className="w-full bg-slate-900 hover:bg-primary transition-all duration-300 h-12 rounded-xl font-black uppercase tracking-widest shadow-xl shadow-slate-200">
                  <Link to={`/students/course/${course._id}`} className="flex items-center justify-center gap-2">
                    Live Preview <Info className="h-4 w-4" />
                  </Link>
               </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {courses.filter(c => c.status === 'published').length === 0 && (
        <div className="text-center py-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
           <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center text-slate-200 shadow-sm mx-auto mb-6">
              <BookOpen className="h-10 w-10" />
           </div>
           <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">No published courses</h3>
           <p className="text-slate-500 font-medium mt-2">Go to course management to publish your first curriculum.</p>
           <Button asChild className="mt-8 bg-slate-900 rounded-xl px-8 h-12 font-bold uppercase tracking-tight">
              <Link to="/admin/courses">Manage Courses</Link>
           </Button>
        </div>
      )}
    </div>
  )
}
