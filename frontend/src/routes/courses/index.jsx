import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { PageHeader } from '@/components/shared/PageHeader'
import { CourseCard } from '@/components/shared/CourseCard'
import { Loader2, BookOpen, Search } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/courses/')({
  component: PublicCourses,
})

function PublicCourses() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState(['All'])

  const fetchCourses = async () => {
    setIsLoading(true)
    try {
      const queryParams = new URLSearchParams()
      queryParams.append('status', 'published')
      if (selectedCategory !== 'All') queryParams.append('category', selectedCategory)
      if (selectedLevel !== 'All') queryParams.append('levels', selectedLevel)
      if (searchQuery) queryParams.append('search', searchQuery)

      const response = await fetch(`${API_BASE_URL}/courses?${queryParams.toString()}`)
      const data = await response.json()
      if (data.success) {
        setCourses(data.data)
        if (selectedCategory === 'All' && selectedLevel === 'All' && !searchQuery) {
          const cats = ['All', ...new Set(data.data.map(c => c.category).filter(Boolean))]
          setCategories(cats)
        }
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses()
    }, 400)

    return () => clearTimeout(timer)
  }, [searchQuery, selectedCategory, selectedLevel])

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

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
        <div className="flex flex-col gap-6 px-1">
          <PageHeader
            title="Elite Curriculums"
            subtitle={`${courses.length} Professional modules available for your growth`}
          >
            <div className="flex items-stretch gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search courses..."
                  className="pl-10 h-10 text-xs font-bold rounded-none border-slate-200 bg-white w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="h-10! w-32 text-xs font-bold rounded-none border-slate-200 bg-white flex items-center">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-slate-200">
                  {levels.map(lvl => (
                    <SelectItem key={lvl} value={lvl} className="text-xs font-bold uppercase tracking-widest">
                      {lvl === 'All' ? 'All Levels' : lvl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PageHeader>

          {/* Filters */}
          <div className="space-y-2 bg-slate-50/50 p-2 border border-slate-200 rounded-none">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-400 capitalize tracking-wider ml-1">Browse Categories</span>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    className="h-9 px-4 rounded-none text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
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
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">No modules match filters</h3>
            <p className="text-slate-500 font-medium mt-2 italic text-sm">Try adjusting your filters or browsing all categories.</p>
            <Button
              variant="link"
              onClick={() => { setSelectedCategory('All'); setSelectedLevel('All'); setSearchQuery(''); }}
              className="mt-4 text-primary font-black uppercase tracking-widest text-[10px]"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
