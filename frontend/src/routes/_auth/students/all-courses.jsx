import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import { Badge } from '@/components/ui/badge'
import { BookOpen } from 'lucide-react'
import { CourseCard } from '@/components/shared/CourseCard'

export const Route = createFileRoute('/_auth/students/all-courses')({
  component: AllCourses,
})

function AllCourses() {
  const [courses, setCourses] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuthStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, enrollmentsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/courses`),
          user?._id ? authFetch(`${API_BASE_URL}/enrollments/user/${user?._id}`) : Promise.resolve({ json: () => ({ success: true, data: [] }) })
        ])

        const cData = await coursesRes.json()
        const eData = typeof enrollmentsRes.json === 'function' ? await enrollmentsRes.json() : { success: true, data: [] }

        if (cData.success) {
          setCourses(cData.data.filter(c => c.status === 'published'))
        }
        if (eData.success) {
          setEnrollments(eData.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user?._id])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="animate-spin rounded-none h-6 w-6 border-b-2 border-primary"></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Catalog...</p>
      </div>
    )
  }

  return (
    <div className="space-y-2 max-w-7xl mx-auto font-geist">
      <div className="flex items-center gap-3 px-1">
        <div className="h-5 w-1 bg-slate-300 rounded-full"></div>
        <h2 className="text-lg font-semibold text-slate-900 capitalize tracking-wide">All Courses</h2>
        <Badge variant="outline" className="ml-2 text-[10px] font-bold border-slate-200 text-slate-400 rounded-none uppercase tracking-widest">
          {courses.length} Modules
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => {
          const enrollment = enrollments.find(e => {
            const id = typeof e.courseId === 'object' ? e.courseId._id : e.courseId
            return id === course._id
          })
          const progress = enrollment?.progress || 0

          return (
            <CourseCard
              key={course._id}
              course={course}
              progress={progress}
              linkTo={`/students/course/${course._id}`}
            />
          )
        })}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-20 bg-slate-50/50 rounded-none border border-dashed border-slate-200 px-4">
          <div className="h-16 w-16 bg-white rounded-none flex items-center justify-center text-slate-200 shadow-sm mx-auto mb-6">
            <BookOpen className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">No courses found</h3>
          <p className="text-slate-500 font-medium mt-2 italic text-sm">We're preparing new content for you. Check back shortly.</p>
        </div>
      )}
    </div>
  )
}
