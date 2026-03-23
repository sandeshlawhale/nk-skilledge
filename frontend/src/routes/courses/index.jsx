import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { PageHeader } from '@/components/shared/PageHeader'
import { CourseCard } from '@/components/shared/CourseCard'
import { Loader2, BookOpen } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const Route = createFileRoute('/courses/')({
  component: PublicCourses,
})

function PublicCourses() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/courses?status=published`)
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
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/20" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Catalog...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full max-w-7xl py-12 px-4 mx-auto space-y-4">
        <div className="px-1">
          <PageHeader
            title="Elite Curriculums"
            subtitle={`${courses.length} Professional modules available for your growth`}
          />
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-1">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                linkTo="/courses/$courseId"
                params={{ courseId: course._id }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 px-4 mx-1">
            <div className="h-16 w-16 bg-white flex items-center justify-center text-slate-200 shadow-sm mx-auto mb-6">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">No modules published yet</h3>
            <p className="text-slate-500 font-medium mt-2 italic text-sm">Our experts are crafting new curriculums. Check back soon!</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
