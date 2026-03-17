import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Plus, Trash2, Video, FileText, ChevronRight, Layout } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_auth/admin/courses/manage/$courseId')({
  component: CourseManager,
})

function CourseManager() {
  const { courseId } = Route.useParams()
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, lessonsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/courses/${courseId}`),
          fetch(`${API_BASE_URL}/lessons/course/${courseId}`)
        ])
        const courseData = await courseRes.json()
        const lessonsData = await lessonsRes.json()

        if (courseData.success) setCourse(courseData.data)
        if (lessonsData.success) setLessons(lessonsData.data)
      } catch (error) {
        console.error('Error fetching course data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [courseId])

  if (isLoading) return <div className="flex justify-center p-20 animate-pulse">Loading course data...</div>

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-geist">
      <div className="flex justify-between items-end bg-slate-900 p-10 rounded-3xl text-white shadow-xl">
         <div>
            <Badge className="bg-primary text-white mb-4 border-0">COURSE EDITOR</Badge>
            <h1 className="text-4xl font-black uppercase tracking-tight">{course?.title}</h1>
            <p className="text-slate-400 mt-2 font-medium italic">Manage lessons, resources, and student tasks for this curriculum.</p>
         </div>
         <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold px-6 h-12 uppercase tracking-tight shadow-lg">
            <Plus className="mr-2 h-5 w-5" /> Add New Lesson
         </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
               <Layout className="h-5 w-5 text-primary" /> Curriculum Structure
            </h2>
            
            <div className="space-y-4">
               {lessons.map((lesson, idx) => (
                  <Card key={lesson._id} className="border-0 shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all">
                     <CardHeader className="p-6 bg-white border-b border-slate-50 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center font-black text-slate-300">
                              {idx + 1}
                           </div>
                           <div>
                              <CardTitle className="text-lg font-bold text-slate-900">{lesson.title}</CardTitle>
                              <div className="flex items-center gap-3 mt-1">
                                 <Badge variant="outline" className="text-[9px] uppercase font-bold border-slate-100 text-slate-400 h-4">
                                    <Video className="h-2.5 w-2.5 mr-1" /> VIDEO
                                 </Badge>
                                 <span className="text-xs font-semibold text-slate-300">|</span>
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                    <FileText className="h-2.5 w-2.5" /> 3 Tasks
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <Button variant="ghost" size="icon" className="rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors">
                              <Trash2 className="h-4 w-4" />
                           </Button>
                           <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                        </div>
                     </CardHeader>
                  </Card>
               ))}
               
               {lessons.length === 0 && (
                  <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                     <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No lessons added to this course yet.</p>
                  </div>
               )}
            </div>
         </div>

         <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Quick Edit</h2>
            <Card className="border-0 shadow-sm rounded-3xl bg-white p-6">
               <div className="space-y-4">
                  <div className="space-y-1.5">
                     <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-1">Course Title</label>
                     <Input defaultValue={course?.title} className="rounded-xl border-slate-100 bg-slate-50 h-11 font-bold shadow-none focus:ring-primary" />
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-1">Description</label>
                     <Textarea defaultValue={course?.description} className="rounded-xl border-slate-100 bg-slate-50 min-h-[120px] font-medium shadow-none focus:ring-primary" />
                  </div>
                  <Button className="w-full bg-slate-900 hover:bg-primary rounded-xl font-bold uppercase tracking-tight h-12 shadow-lg shadow-indigo-100 mt-2">
                     Save Changes
                  </Button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
