import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Loader2 } from 'lucide-react'
import { CourseCard } from '@/components/shared/CourseCard'

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 px-1">
        <div>
          <Badge className="bg-primary/10 text-primary border-primary/20 font-black mb-2 uppercase tracking-widest text-[9px] rounded-none">Personal Dashboard</Badge>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase italic">Your Learning Path</h1>
          <p className="text-slate-500 font-medium italic mt-0.5 text-xs">A collection of specialized professional curriculums currently in progress.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((enrollment) => (
          <CourseCard 
            key={enrollment._id}
            course={enrollment.courseId}
            progress={enrollment.progress}
            linkTo={`/students/course/${enrollment.courseId?._id}`}
            metadata="Curriculum Progress"
          />
        ))}
      </div>

      {enrollments.length === 0 && (
        <div className="text-center py-20 bg-slate-50/50 rounded-none border border-dashed border-slate-200 px-4">
          <div className="h-16 w-16 bg-white rounded-none flex items-center justify-center text-slate-200 shadow-sm mx-auto mb-6">
            <BookOpen className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Enrollment Required</h3>
          <p className="text-slate-500 font-medium mt-2 italic text-sm">You haven't initialized any learning modules yet.</p>
          <Button asChild className="mt-6 bg-slate-900 rounded-none px-8 h-12 font-black uppercase tracking-widest shadow-none text-xs">
             <Link to="/students/all-courses">Browse Catalog</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
