import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Loader2 } from 'lucide-react'
import { CourseCard } from '@/components/shared/CourseCard'

export const Route = createFileRoute('/_auth/admin/all-courses')({
  component: AdminAllCourses,
})

function AdminAllCourses() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await authFetch(`${API_BASE_URL}/courses`)
        const data = await response.json()
        if (data.success) {
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
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary/20" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-geist">
      <div className="flex justify-between items-end px-1">
        <div>
          <Badge className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 font-black mb-2 uppercase tracking-[0.2em] text-[10px] rounded-none">Registry View</Badge>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase italic">Published Registry</h1>
          <p className="text-slate-500 mt-1 font-medium italic text-xs">Viewing the platform as a student to verify content delivery.</p>
        </div>
        <Button asChild variant="outline" className="rounded-none border-slate-200 font-black h-11 px-6 uppercase tracking-widest text-[10px]">
           <Link to="/admin/courses">Management Mode</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.filter(c => c.status === 'published').map((course) => (
          <CourseCard 
            key={course._id}
            course={course}
            linkTo={`/students/course/${course._id}`}
            metadata="Registry Listing"
          />
        ))}
      </div>
      
      {courses.filter(c => c.status === 'published').length === 0 && (
        <div className="text-center py-20 bg-slate-50/50 rounded-none border border-dashed border-slate-200 px-4">
           <div className="h-16 w-16 bg-white rounded-none flex items-center justify-center text-slate-200 shadow-sm mx-auto mb-6">
              <BookOpen className="h-8 w-8" />
           </div>
           <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Registry Empty</h3>
           <p className="text-slate-500 font-medium mt-2 italic text-sm">No courses are currently live on the student portal.</p>
           <Button asChild className="mt-8 bg-slate-900 rounded-none px-8 h-12 font-black uppercase tracking-widest text-[10px]">
              <Link to="/admin/courses">Manage Courses</Link>
           </Button>
        </div>
      )}
    </div>
  )
}
