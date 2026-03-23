import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Loader2 } from 'lucide-react'
import { CourseCard } from '@/components/shared/CourseCard'
import { PageHeader } from '@/components/shared/PageHeader'

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
      <PageHeader
        title="Published Courses"
        subtitle="Manage and oversee active curricula from the central registry."
      >
        <div className="flex flex-col items-end gap-2">
          <Button asChild variant="outline" size='xl' className="">
            <Link to="/admin/courses">Management Mode</Link>
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.filter(c => c.status === 'published').map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            linkTo={`/courses/${course._id}`}
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
