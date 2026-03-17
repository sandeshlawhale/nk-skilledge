import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Edit, Trash2, Video, FileText, CheckSquare, Settings, Users, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/_auth/admin/courses')({
  component: AdminCourses,
})

function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/courses`)
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

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-geist">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Course Management</h1>
          <p className="text-slate-500 mt-1 italic">Create, edit, and organize your educational content.</p>
        </div>
        <Button className="bg-slate-900 hover:bg-primary font-bold rounded-xl shadow-lg shadow-indigo-100">
          <Plus className="mr-2 h-4 w-4" /> Create New Course
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            className="pl-10 h-9 rounded-xl border-slate-200 focus:ring-primary shadow-none" 
            placeholder="Search courses by title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Badge variant="outline" className="h-9 px-4 rounded-xl border-slate-200 text-slate-500 font-medium cursor-pointer hover:bg-slate-50">
            All Status
          </Badge>
          <Badge variant="outline" className="h-9 px-4 rounded-xl border-slate-200 text-slate-500 font-medium cursor-pointer hover:bg-slate-50">
            Most Recent
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course._id} className="overflow-hidden flex flex-col group border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm rounded-2xl">
             <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img 
                  src={course.thumbnail || `https://placehold.co/600x400/e2e8f0/4f46e5?text=${encodeURIComponent(course.title)}`} 
                  alt={course.title} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge className="bg-white/90 backdrop-blur-md text-slate-900 font-bold border-0 shadow-sm">
                    ₹{course.price || 'FREE'}
                  </Badge>
                  <Badge className={course.status === 'published' ? 'bg-green-500 text-white font-bold border-0' : 'bg-amber-500 text-white font-bold border-0'}>
                    {course.status?.toUpperCase() || 'DRAFT'}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Button variant="secondary" size="sm" className="font-bold rounded-xl shadow-lg">
                      <Settings className="mr-2 h-4 w-4" /> Manage Content
                   </Button>
                </div>
              </div>
              
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                  {course.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="px-6 py-0 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col p-3 bg-slate-50 rounded-xl border border-slate-100 transition-colors group-hover:bg-white group-hover:border-primary/20">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                       <BookOpen className="h-2.5 w-2.5" /> Lessons
                    </span>
                    <span className="text-xl font-bold text-slate-900">{course.lessonsCount || 0}</span>
                  </div>
                  <div className="flex flex-col p-3 bg-slate-50 rounded-xl border border-slate-100 transition-colors group-hover:bg-white group-hover:border-primary/20">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                       <Users className="h-2.5 w-2.5" /> Students
                    </span>
                    <span className="text-xl font-bold text-slate-900">0</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-6 flex gap-2 border-t border-slate-50/50 mt-4">
                 <Button variant="outline" className="flex-1 rounded-xl font-bold border-slate-200 hover:bg-slate-50 text-slate-600">
                   <Edit className="mr-2 h-4 w-4" /> EDIT
                 </Button>
                 <Button variant="outline" className="flex-1 rounded-xl font-bold border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600">
                   <Trash2 className="mr-2 h-4 w-4" /> DELETE
                 </Button>
              </CardFooter>
          </Card>
        ))}

        <div className="border-2 border-dashed border-slate-200 bg-slate-50/30 hover:bg-white hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center h-full min-h-[350px] cursor-pointer group rounded-3xl shadow-none hover:shadow-xl hover:shadow-indigo-50">
          <div className="h-20 w-20 bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all duration-300 rounded-2xl border border-slate-100 group-hover:border-primary/20">
            <Plus className="h-10 w-10" />
          </div>
          <h3 className="font-bold text-xl text-slate-900 mt-6 font-geist">New Course</h3>
          <p className="text-sm text-slate-500 mt-2 max-w-[220px] italic">Launch your next training program and empower your students.</p>
        </div>
      </div>
    </div>
  )
}
