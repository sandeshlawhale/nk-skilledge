import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Loader2, Search } from 'lucide-react'
import { TrainingCard } from '@/components/shared/TrainingCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const Route = createFileRoute('/_auth/students/my-training')({
  component: MyTraining,
})

function MyTraining() {
  const { user } = useAuthStore()
  const [enrollments, setEnrollments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('All')

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const fetchEnrollments = async () => {
    if (!user?._id) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    try {
      const queryParams = new URLSearchParams()
      if (selectedLevel !== 'All') queryParams.append('levels', selectedLevel)
      if (searchQuery) queryParams.append('search', searchQuery)

      const response = await authFetch(`${API_BASE_URL}/enrollments/user/${user._id}?${queryParams.toString()}`)
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

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEnrollments()
    }, 400)
    return () => clearTimeout(timer)
  }, [user?._id, searchQuery, selectedLevel])

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
        title="My training"
        subtitle={`${enrollments.length} Modules available`}
      >
        <div className="flex items-stretch gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search my training..."
              className="pl-10 h-10 text-xs font-bold rounded-none border-slate-200 bg-white w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="h-10! w-32 text-xs font-bold rounded-none border-slate-200 bg-white flex items-center">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-slate-200 w-32!">
              {levels.map(lvl => (
                <SelectItem key={lvl} value={lvl} className="text-xs font-bold uppercase tracking-widest">
                  {lvl === 'All' ? 'All Levels' : lvl}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PageHeader>

      {enrollments.length > 0 ? (
        <div className="space-y-12 pb-10">
          {/* In Progress Section */}
          {enrollments.filter(e => e.progress > 0 && e.progress < 100).length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-1">
                <div className="h-5 w-1 bg-slate-300 rounded-full"></div>
                <h2 className="text-lg font-semibold text-slate-900 capitalize tracking-wide">In Progress</h2>
                <Badge variant="outline" className="ml-2 text-[10px] font-bold border-slate-200 text-slate-400 rounded-none uppercase tracking-widest">
                  {enrollments.filter(e => e.progress > 0 && e.progress < 100).length} Modules
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments
                  .filter(e => e.progress > 0 && e.progress < 100)
                  .map((enrollment) => (
                    <TrainingCard
                      key={enrollment._id}
                      training={enrollment.courseId}
                      progress={enrollment.progress}
                      linkTo={`/students/training/${enrollment.courseId?._id}`}
                      metadata="Current Progress"
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Completed or Not Started Section */}
          {enrollments.filter(e => e.progress === 0 || e.progress === 100).length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-1">
                <div className="h-5 w-1 bg-slate-300 rounded-full"></div>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Modules</h2>
                <Badge variant="outline" className="ml-2 text-[10px] font-bold border-slate-200 text-slate-400 rounded-none uppercase tracking-widest bg-white">
                  {enrollments.filter(e => e.progress === 0 || e.progress === 100).length}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrollments
                  .filter(e => e.progress === 0 || e.progress === 100)
                  .map((enrollment) => (
                    <TrainingCard
                      key={enrollment._id}
                      training={enrollment.courseId}
                      progress={enrollment.progress}
                      linkTo={`/students/training/${enrollment.courseId?._id}`}
                      metadata={enrollment.progress === 100 ? "Completed" : "Not Started"}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {enrollments.length === 0 && (
        <div className="text-center py-20 bg-slate-50/50 rounded-none border border-dashed border-slate-200 px-4">
          <div className="h-16 w-16 bg-white rounded-none flex items-center justify-center text-slate-200 shadow-sm mx-auto mb-6">
            <BookOpen className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Enrollment Required</h3>
          <p className="text-slate-500 font-medium mt-2 italic text-sm">You haven't initialized any learning modules yet.</p>
          <Button asChild className="mt-6 bg-slate-900 rounded-none px-8 h-12 font-black uppercase tracking-widest shadow-none text-xs">
            <Link to="/students/all-training">Browse Catalog</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
