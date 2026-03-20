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

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')

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

  const categories = ['All', ...new Set(courses.map(c => c.category).filter(Boolean))]
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory
    const levelMatch = selectedLevel === 'All' || course.levels === selectedLevel
    return categoryMatch && levelMatch
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="animate-spin rounded-none h-6 w-6 border-b-2 border-primary"></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Catalog...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-geist">
      <div className="flex flex-col gap-6 px-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-5 w-1 bg-slate-900 rounded-full"></div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">Elite Curriculum</h2>
            <Badge variant="outline" className="ml-2 text-[10px] font-bold border-slate-200 text-slate-400 rounded-none uppercase tracking-widest">
              {filteredCourses.length} Modules Available
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4 bg-slate-50/50 p-4 border border-slate-100 rounded-none">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Browse Categories</span>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-none border ${
                    selectedCategory === cat 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Difficulty Level</span>
            <div className="flex flex-wrap gap-2">
              {levels.map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-none border ${
                    selectedLevel === lvl 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
        {filteredCourses.map((course) => {
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

      {filteredCourses.length === 0 && (
        <div className="text-center py-20 bg-slate-50/50 rounded-none border border-dashed border-slate-200 px-4 mx-1">
          <div className="h-16 w-16 bg-white rounded-none flex items-center justify-center text-slate-200 shadow-sm mx-auto mb-6">
            <BookOpen className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">No modules match filters</h3>
          <p className="text-slate-500 font-medium mt-2 italic text-sm">Try adjusting your filters or browsing all categories.</p>
          <Button 
            variant="link" 
            onClick={() => { setSelectedCategory('All'); setSelectedLevel('All'); }}
            className="mt-4 text-primary font-black uppercase tracking-widest text-[10px]"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
