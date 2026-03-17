import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, ChevronRight, FileText, Download, MessageSquare, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_auth/dashboard/course/$courseId/lesson/$lessonId')({
  component: LessonPlayer,
})

function LessonPlayer() {
  const { courseId, lessonId } = useParams({ from: '/_auth/dashboard/course/$courseId/lesson/$lessonId' })
  const { user } = useAuthStore()
  const navigate = useNavigate()
  
  const [lesson, setLesson] = useState(null)
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [completedTasks, setCompletedTasks] = useState([])

  useEffect(() => {
    const fetchLessonData = async () => {
      setIsLoading(true)
      try {
        let currentLessonId = lessonId
        
        // If "active" is passed, we should ideally fetch the user's current progress
        // For now, let's fetch all lessons and take the first one if "active"
        if (lessonId === 'active') {
          const lessonsRes = await fetch(`${API_BASE_URL}/lessons/course/${courseId}`)
          const lessonsData = await lessonsRes.json()
          if (lessonsData.success && lessonsData.data.length > 0) {
            currentLessonId = lessonsData.data[0]._id
            // Update URL to the real lesson ID
            navigate({ to: `/dashboard/course/${courseId}/lesson/${currentLessonId}`, replace: true })
            return
          }
        }

        // Fetch lesson detail
        const lessonRes = await fetch(`${API_BASE_URL}/lessons/${currentLessonId}`)
        const lessonData = await lessonRes.json()
        if (lessonData.success) {
          setLesson(lessonData.data)
        }

        // Fetch tasks
        const tasksRes = await fetch(`${API_BASE_URL}/tasks/lesson/${currentLessonId}`)
        const tasksData = await tasksRes.json()
        if (tasksData.success) {
          setTasks(tasksData.data)
        }

        // Fetch user progress for this course to see completed tasks
        if (user?._id) {
          const progressRes = await fetch(`${API_BASE_URL}/progress/user/${user._id}/course/${courseId}`)
          const progressData = await progressRes.json()
          if (progressData.success) {
            setCompletedTasks(progressData.data.completedTasks || [])
          }
        }
      } catch (error) {
        console.error('Error fetching lesson data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLessonData()
  }, [courseId, lessonId, user?._id])

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/progress/complete-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?._id, taskId, courseId })
      })
      const data = await response.json()
      if (data.success) {
        setCompletedTasks(prev => [...prev, taskId])
        // Refresh progress in store or parent if needed
      }
    } catch (error) {
      console.error('Error completing task:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 border-b border-slate-800 bg-black aspect-video">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-full font-geist">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center group overflow-hidden border-b border-slate-800">
        {lesson?.videoUrl ? (
          <iframe 
            src={lesson.videoUrl} 
            className="w-full h-full" 
            allowFullScreen
            title={lesson.title}
          />
        ) : (
          <div className="text-center space-y-4 max-w-md px-6">
            <div className="h-20 w-20 bg-slate-800 flex items-center justify-center mx-auto ring-4 ring-slate-800/50 rounded-full cursor-pointer hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-t-12 border-t-transparent border-l-20 border-l-white border-b-12 border-b-transparent ml-2" />
            </div>
            <p className="text-slate-400 font-medium italic">Lesson video will appear here.</p>
          </div>
        )}
      </div>

      {/* Lesson Details & Interactions */}
      <div className="flex-1 bg-white p-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-primary border-primary/20">
                   {lesson?.status === 'published' ? 'Active Lesson' : 'Draft'}
                 </Badge>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight">{lesson?.title}</h1>
              <p className="text-slate-500 mt-2 flex items-center gap-2 font-medium">
                <ChevronRight className="h-4 w-4 bg-slate-100 rounded-full" /> {lesson?.duration || '15:00'} min duration
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="text-slate-600 border-slate-200">
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button className="bg-slate-900 border-0 hover:bg-primary transition-all shadow-lg shadow-indigo-100">
                Next Lesson <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8 border-b w-full justify-start rounded-none bg-transparent h-auto p-0 gap-8">
              <TabsTrigger value="overview" className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-0 py-4 font-bold h-full shadow-none bg-transparent transition-all hover:text-primary">
                OVERVIEW
              </TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-0 py-4 font-bold h-full shadow-none bg-transparent transition-all hover:text-primary relative">
                TASKS & PROJECTS
                {tasks.length > 0 && (
                  <span className="ml-1.5 bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded-full">
                    {tasks.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-0 py-4 font-bold h-full shadow-none bg-transparent transition-all hover:text-primary">
                RESOURCES
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed italic border-l-4 border-primary/20 pl-6 mb-8">
                {lesson?.description || "No description available for this lesson."}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                       <PlayCircle className="h-5 w-5 text-primary" /> Learning Objectives
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                       In this lesson, we cover the core concepts and practical applications required for professional proficiency.
                    </p>
                 </div>
                 <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50">
                    <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                       <CheckCircle2 className="h-5 w-5 text-indigo-600" /> Lesson Support
                    </h4>
                    <p className="text-sm text-indigo-800/70 leading-relaxed">
                       Need help? Drop a message in the discussion tab or reach out to your mentor for 1-on-1 guidance.
                    </p>
                 </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tasks" className="space-y-6">
              <div className="p-8 border bg-slate-50/50 border-slate-200 rounded-3xl">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Module Tasks</h3>
                    <p className="text-slate-500 text-sm mt-1">Complete these assignments to validate your learning.</p>
                  </div>
                  <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold ring-1 ring-primary/20">
                    {completedTasks.length} / {tasks.length} Completed
                  </div>
                </div>

                <div className="grid gap-4">
                   {tasks.map((task, i) => {
                     const isCompleted = completedTasks.includes(task._id)
                     return (
                       <div 
                         key={task._id} 
                         className={`p-6 border rounded-2xl transition-all ${
                           isCompleted 
                             ? 'bg-green-50/50 border-green-100 opacity-80' 
                             : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                         }`}
                       >
                         <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                               <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Task {i+1}</span>
                                  {task.type && <Badge variant="secondary" className="text-[9px] h-4">{task.type}</Badge>}
                               </div>
                               <h4 className={`font-bold text-lg ${isCompleted ? 'text-green-800 line-through' : 'text-slate-900'}`}>
                                 {task.title}
                               </h4>
                               <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                                 {task.description}
                               </p>
                            </div>
                            <Button 
                              onClick={() => handleCompleteTask(task._id)}
                              disabled={isCompleted}
                              size="sm"
                              className={`rounded-xl px-4 font-bold text-xs ${
                                isCompleted 
                                  ? 'bg-green-500 hover:bg-green-500' 
                                  : 'bg-slate-900 hover:bg-primary'
                              }`}
                            >
                              {isCompleted ? (
                                <><CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> DONE</>
                              ) : (
                                'MARK COMPLETE'
                              )}
                            </Button>
                         </div>
                       </div>
                     )
                   })}
                   
                   {tasks.length === 0 && (
                     <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200 uppercase tracking-widest text-[10px] font-bold">
                        No tasks assigned to this lesson yet.
                     </div>
                   )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
               {lesson?.resources?.length > 0 ? lesson.resources.map((res, i) => (
                 <div key={i} className="border border-slate-200 bg-white p-5 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-colors shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-primary/5 text-primary flex items-center justify-center rounded-xl">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{res.title || 'Lesson Resource'}</h4>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{res.type || 'PDF Document'}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild className="rounded-xl font-bold text-xs border-slate-200">
                    <a href={res.url} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" /> DOWNLOAD
                    </a>
                  </Button>
                </div>
               )) : (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100 italic text-slate-400 text-sm">
                   Additional learning resources will be listed here.
                </div>
               )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
