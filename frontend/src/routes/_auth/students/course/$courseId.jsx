import { createFileRoute, Link, useParams, useNavigate } from '@tanstack/react-router'
import { useEffect, useState, useRef } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import {
  PlayCircle, CheckCircle2, Lock, LayoutList, MessageSquare,
  PhoneCall, Play, Info, Clock, Award, ChevronDown, ChevronUp,
  Video, FileText, CheckSquare, Code2, ClipboardList, ExternalLink,
  Loader2, AlertCircle, ArrowLeft, Trophy, BarChart3
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export const Route = createFileRoute('/_auth/students/course/$courseId')({
  component: LearningHub,
})

const TASK_TYPES = {
  mcq: { label: 'MCQ', icon: CheckSquare, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  coding: { label: 'Coding', icon: Code2, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  assignment: { label: 'Assignment', icon: ClipboardList, color: 'bg-amber-100 text-amber-700 border-amber-200' },
}

function getVideoEmbed(url) {
  if (!url) return null
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
  const vmMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vmMatch) return `https://player.vimeo.com/video/${vmMatch[1]}`
  const gdMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  if (gdMatch) return `https://drive.google.com/file/d/${gdMatch[1]}/preview`
  return null
}

// In-file Task Component
function TaskItem({ task, courseId, lessonId, userId, initialProgress, onComplete }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize from database progress
  useEffect(() => {
    if (initialProgress) {
      if (task.taskType === 'mcq') {
        setSelected(initialProgress.answer || null)
        setSubmitted(initialProgress.completed || false)
        setIsCorrect(initialProgress.completed || false)
      } else {
        setSubmitted(initialProgress.completed)
      }
    }
  }, [initialProgress, task])

  const handleSubmitMCQ = async () => {
    if (!selected) return
    setIsSubmitting(true)
    const correct = selected === task.correctAnswer

    try {
      await authFetch(`${API_BASE_URL}/progress/complete-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          lessonId,
          taskId: task._id,
          type: 'task',
          answer: selected,
          completed: correct
        }),
      })

      setIsCorrect(correct)
      setSubmitted(true)
      if (onComplete) onComplete(task._id)

      if (!correct) {
        // If wrong, allow them to try again after 2 seconds
        setTimeout(() => {
          setSubmitted(false)
        }, 2000)
      }
    } catch (err) {
      console.error('Progress update failed:', err)
    } finally {
      setTimeout(() => setIsSubmitting(false), 500)
    }
  }

  const handleCompleteAssignment = async () => {
    setIsSubmitting(true)
    try {
      await authFetch(`${API_BASE_URL}/progress/complete-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, lessonId, taskId: task._id, type: 'task', completed: true }),
      })
      setSubmitted(true)
      if (onComplete) onComplete(task._id)
    } catch (err) {
      console.error('Progress update failed:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (task.taskType === 'mcq') {
    return (
      <div className="space-y-4">
        {task.description && <p className="text-slate-600 text-sm leading-relaxed">{task.description}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {task.options?.map((opt, i) => {
            let cls = "p-4 rounded-xl border-2 text-sm font-bold transition-all text-left flex items-start gap-3 "
            if (submitted) {
              if (opt === task.correctAnswer) cls += "bg-green-50 border-green-400 text-green-800"
              else if (opt === selected && !isCorrect) cls += "bg-red-50 border-red-300 text-red-700"
              else cls += "bg-slate-50 border-slate-200 text-slate-400 opacity-50"
            } else {
              cls += selected === opt
                ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                : "bg-white border-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }
            return (
              <button key={i} className={cls} onClick={() => !submitted && setSelected(opt)}>
                <span className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center shrink-0 text-xs font-black ${selected === opt && !submitted ? 'border-white bg-white/20' : 'border-slate-200'}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            )
          })}
        </div>
        {!submitted ? (
          <Button onClick={handleSubmitMCQ} disabled={!selected || isSubmitting} className="w-full bg-slate-900 hover:bg-primary h-12 rounded-xl font-black uppercase tracking-widest mt-4 shadow-none border-b-4 border-slate-950 active:border-b-0 transition-all">
            {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null} Submit Answer
          </Button>
        ) : (
          <div className={`p-4 rounded-xl border-2 font-bold text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            {isCorrect ? (
              <><CheckCircle2 className="h-5 w-5" /> Bullseye! Correct Answer: {task.correctAnswer}</>
            ) : (
              <><AlertCircle className="h-5 w-5" /> Incorrect selection. Try again in a moment...</>
            )}
          </div>
        )}
      </div>
    )
  }

  if (task.taskType === 'coding') {
    return (
      <div className="space-y-4">
        {task.description && <p className="text-slate-600 text-sm leading-relaxed">{task.description}</p>}
        <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm text-emerald-400">
          {task.starterCode || '// Write your code here'}
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-xs text-amber-800 font-medium italic">
          Please submit your solution to the instructor for manual verification.
        </div>
      </div>
    )
  }

  return ( // Assignment
    <div className="space-y-4">
      {task.description && <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 text-indigo-900 text-sm leading-relaxed italic">{task.description}</div>}
      <Button onClick={handleCompleteAssignment} disabled={submitted || isSubmitting} variant={submitted ? "outline" : "default"} className={`w-full h-12 rounded-xl font-black uppercase tracking-widest ${!submitted ? 'bg-slate-900 hover:bg-primary' : 'border-slate-200'}`}>
        {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
        {submitted ? <><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Submitted</> : "Mark as Submitted"}
      </Button>
    </div>
  )
}

function LearningHub() {
  const { courseId } = useParams({ from: '/_auth/students/course/$courseId' })
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [course, setCourse] = useState(null)
  const [enrollment, setEnrollment] = useState(null)
  const [lessons, setLessons] = useState([])
  const [lessonTasks, setLessonTasks] = useState({})
  const [progressData, setProgressData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeLessonId, setActiveLessonId] = useState(null)

  const fetchData = async () => {
    try {
      const [courseRes, enrollmentRes, lessonsRes, progressRes] = await Promise.all([
        authFetch(`${API_BASE_URL}/courses/${courseId}`),
        authFetch(`${API_BASE_URL}/enrollments/user/${user?._id}`),
        authFetch(`${API_BASE_URL}/lessons/course/${courseId}?status=published`),
        authFetch(`${API_BASE_URL}/progress/user/${user?._id}/course/${courseId}`)
      ])

      const cData = await courseRes.json()
      const eData = await enrollmentRes.json()
      const lData = await lessonsRes.json()
      const pData = await progressRes.json()

      if (cData.success) setCourse(cData.data)
      if (eData.success) {
        const found = eData.data.find(e => {
          const id = typeof e.courseId === 'object' ? e.courseId._id : e.courseId
          return id === courseId
        })
        setEnrollment(found || null)
      }
      if (lData.success) {
        setLessons(lData.data)
        const taskPromises = lData.data.map(l => authFetch(`${API_BASE_URL}/tasks/lesson/${l._id}`))
        const taskResponses = await Promise.all(taskPromises)
        const taskMap = {}
        for (let i = 0; i < taskResponses.length; i++) {
          const tData = await taskResponses[i].json()
          if (tData.success) taskMap[lData.data[i]._id] = tData.data
        }
        setLessonTasks(taskMap)
      }
      if (pData.success) setProgressData(pData.data)

    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkLessonComplete = async (lessonId) => {
    try {
      if (!user?._id) return;
      await authFetch(`${API_BASE_URL}/progress/complete-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          lessonId,
          type: 'video'
        })
      });
      fetchData();
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  }

  useEffect(() => {
    if (user?._id) fetchData()
  }, [courseId, user?._id])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/20" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Assembling Curriculum...</p>
      </div>
    )
  }

  // Calculate lesson status
  const lessonsWithStatus = lessons.map((lesson, index) => {
    const tasks = lessonTasks[lesson._id] || []

    // Check if video is completed
    const isVideoCompleted = !lesson.videoUrl || progressData.some(p => p.lessonId === lesson._id && p.type === 'video' && p.completed)

    // Check which tasks are completed
    const completedTaskIds = progressData
      .filter(p => p.lessonId === lesson._id && p.type === 'task' && p.completed)
      .map(p => p.taskId)

    const areTasksCompleted = tasks.length > 0
      ? tasks.every(t => completedTaskIds.includes(t._id))
      : true

    const isCompleted = isVideoCompleted && areTasksCompleted

    return { ...lesson, isCompleted, isVideoCompleted, tasks, completedTaskIds }
  })

  // Determine locking (second pass)
  lessonsWithStatus.forEach((lesson, index) => {
    lesson.isLocked = index > 0 && !lessonsWithStatus[index - 1].isCompleted
  })

  const overallProgress = enrollment?.progress || 0

  if (!enrollment) {
    return (
      <div className="max-w-[1500px] mx-auto font-geist">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Content: Course Details */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <button onClick={() => navigate({ to: '/students/all-courses' })} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors font-bold uppercase text-[9px] tracking-widest">
                <ArrowLeft className="h-3 w-3" /> Back to Catalog
              </button>

              <div className="relative aspect-video rounded-none overflow-hidden bg-slate-100 shadow-md">
                <img src={course?.thumbnail || 'https://placehold.co/1200x600/e2e8f0/4f46e5?text=Course'} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary text-white font-black px-3 py-1 rounded-none border-0 uppercase text-[9px] tracking-widest">
                      {course?.category || 'Professional Level'}
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 text-white border-white/20 font-black px-3 py-1 rounded-none uppercase text-[9px] tracking-widest backdrop-blur-sm">
                      {course?.levels || 'All Levels'}
                    </Badge>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter max-w-2xl drop-shadow-xl">
                    {course?.title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-linear-to-tr from-primary to-indigo-400 border-2 border-white/20 flex items-center justify-center text-[10px] font-black text-white uppercase shadow-lg">
                      {course?.instructorName?.substring(0, 2).toUpperCase() || 'EL'}
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest drop-shadow-md">
                      By {course?.instructorName || 'Elite Instructor'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-none p-8 border border-slate-200 shadow-none space-y-8">
                <div>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 mb-4">
                    <div className="h-1 w-4 bg-primary rounded-none"></div> About this Course
                  </h2>
                  <div className="space-y-4">
                    {Array.isArray(course?.description) ? (
                      course.description.map((para, i) => (
                        <p key={i} className="text-slate-600 leading-relaxed font-medium text-sm">
                          {para}
                        </p>
                      ))
                    ) : (
                      <p className="text-slate-600 leading-relaxed font-medium text-sm">
                        {course?.description || 'Learn advanced concepts and industry best practices in this comprehensive professional curriculum.'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-y border-slate-50">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
                    <span className="text-sm font-bold text-slate-900 uppercase">{course?.duration || 'Self-Paced'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Focus Area</span>
                    <span className="text-sm font-bold text-slate-900 uppercase">{course?.category || 'General'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certificate</span>
                    <span className="text-sm font-bold text-slate-900 uppercase">Included</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expertise</span>
                    <span className="text-sm font-bold text-slate-900 uppercase">{course?.levels || 'All Levels'}</span>
                  </div>
                </div>

                {/* New Grid for Learn & Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                      <div className="h-3 w-1 bg-primary"></div> Goals
                    </h3>
                    <ul className="space-y-3">
                      {course?.whatYouWillLearn?.map((item, i) => (
                        <li key={i} className="text-sm text-slate-600 font-medium flex items-start gap-3">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      )) || <li className="text-sm text-slate-400 italic">No specific goals listed.</li>}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                      <div className="h-3 w-1 bg-slate-400"></div> Requirements
                    </h3>
                    <ul className="space-y-3">
                      {course?.requirements?.map((item, i) => (
                        <li key={i} className="text-sm text-slate-600 font-medium flex items-start gap-3">
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>
                          {item}
                        </li>
                      )) || <li className="text-sm text-slate-400 italic">No special requirements.</li>}
                    </ul>
                  </div>
                </div>

                {/* Tags */}
                {course?.tags?.length > 0 && (
                  <div className="pt-6 border-t border-slate-50">
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="border-slate-100 bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-none">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Course Features/Syllabus Preview */}
              <div className="space-y-4 pt-4">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                  <LayoutList className="h-6 w-6 text-primary" /> Modules
                </h2>
                <div className="grid gap-3">
                  {lessons.map((lesson, idx) => (
                    <div key={lesson._id} className="flex items-center gap-4 p-4 bg-slate-50/50 border border-slate-100 rounded-none group hover:bg-white hover:border-slate-200 transition-all">
                      <div className="h-8 w-8 rounded-none bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0">
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-700 uppercase italic leading-tight group-hover:text-primary transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-0.5">Lesson {idx + 1}</p>
                      </div>
                      <Lock className="h-3.5 w-3.5 text-slate-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Pricing & Enrollment */}
          <aside className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-6 space-y-6">
            <Card className="border border-slate-200 rounded-none overflow-hidden bg-white text-slate-900">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">Lifetime Enrollment</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black italic tracking-tighter text-slate-900">
                      {course?.price ? `₹${course.price}` : 'Price TBD'}
                    </span>
                    {course?.price > 0 && <span className="text-slate-400 text-xs line-through font-bold">₹{(course.price * 1.5).toFixed(0)}</span>}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Instant access to all {lessons.length} modules</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Professional certification on completion</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span>Direct community access & 1:1 support</span>
                  </div>
                </div>

                {!course?.price ? (
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-none space-y-3">
                    <p className="text-[10px] font-bold text-center text-slate-500 uppercase tracking-widest leading-relaxed">
                      Course price is not yet decided. Please contact our admissions team to enroll.
                    </p>
                    <Button className="w-full bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-xs h-12 rounded-none shadow-none">
                      <PhoneCall className="h-4 w-4 mr-2" /> Contact Admin
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-xs h-12 rounded-none shadow-none">
                    Enroll Now
                  </Button>
                )}

                <div className="pt-4 text-center">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] italic">
                    Trusted by 5,000+ Students globally
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* <div className="bg-white border border-slate-200 p-6 rounded-none space-y-4">
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Info className="h-3 w-3 text-primary" /> Learning Support
              </h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
                Have questions about this curriculum? Our learning advisors are available 24/7 to help you make the right choice.
              </p>
              <Button variant="outline" className="w-full border-slate-200 rounded-none font-bold text-[10px] uppercase tracking-widest h-10">
                Request a Callback
              </Button>
            </div> */}
          </aside>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1500px] mx-auto font-geist">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* --- MAIN CONTENT (3/4) --- */}
        <div className="flex-1 min-w-0 space-y-6">
          <div className="space-y-2 px-1">
            <button
              onClick={() => navigate({ to: '/students/my-courses' })}
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors font-black uppercase text-[9px] tracking-widest"
            >
              <ArrowLeft className="h-3 w-3" /> My courses
            </button>
            <h1 className="text-lg md:text-xl font-bold text-slate-900 capitalize tracking-wide">
              {course?.title}
            </h1>
          </div>

          <Tabs defaultValue="course-details" className="space-y-3">
            <div className="px-1">
              <TabsList className="bg-slate-100/50 p-1 rounded-xl h-12 border border-slate-200/50 w-full md:w-auto">
                <TabsTrigger value="modules" className="rounded-lg px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-white data-[state=active]:shadow-sm flex-1 md:flex-none cursor-pointer">
                  Modules
                </TabsTrigger>
                <TabsTrigger value="course-details" className="rounded-lg px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-white data-[state=active]:shadow-sm flex-1 md:flex-none cursor-pointer">
                  Course Details
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Modules Tab */}
            <TabsContent value="modules" className="space-y-2 outline-none">
              <div className="space-y-2">
                <h2 className="text-md md:text-lg font-semibold text-slate-900 capitalize tracking-wide flex items-center gap-2 px-1">
                  <LayoutList className="h-4 w-4 text-primary" /> Modules
                </h2>

                <Accordion type="single" collapsible className="space-y-2" onValueChange={setActiveLessonId}>
                  {lessonsWithStatus.map((lesson, idx) => {
                    const Icon = lesson.isLocked ? Lock : (lesson.isCompleted ? CheckCircle2 : PlayCircle)
                    const embedUrl = getVideoEmbed(lesson.videoUrl)

                    return (
                      <AccordionItem key={lesson._id} value={lesson._id} id={`lesson-${lesson._id}`} className={`border border-slate-200 rounded-none overflow-hidden transition-all duration-300 ${lesson.isLocked ? 'bg-slate-50/50 opacity-60' : 'bg-white shadow-none hover:bg-slate-50/30'}`} disabled={lesson.isLocked}>
                        <AccordionTrigger className={`px-5 py-5 hover:no-underline group ${lesson.isLocked ? 'cursor-not-allowed' : ''}`}>
                          <div className="flex items-center gap-4 text-left w-full">
                            <div className={`h-10 w-10 rounded-none border flex items-center justify-center shrink-0 transition-all ${lesson.isLocked ? 'bg-slate-100 border-slate-200 text-slate-300' : (lesson.isCompleted ? 'bg-green-50 border-green-200 text-green-600' : 'bg-slate-900 border-slate-900 text-white group-hover:scale-105')}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Module {(idx + 1).toString().padStart(2, '0')}</span>
                                {lesson.isCompleted && <Badge className="bg-green-600/10 text-green-700 border-0 text-[8px] font-black py-0 px-1.5 uppercase rounded-none">Verified</Badge>}
                              </div>
                              <h3 className={`text-base font-black uppercase tracking-tight italic ${lesson.isLocked ? 'text-slate-400' : 'text-slate-900'}`}>
                                {lesson.title}
                              </h3>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 space-y-6">
                          {/* Video */}
                          {lesson.videoUrl && (
                            <div className="space-y-3 pt-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                                  <Video className="h-3.5 w-3.5" /> Lecture Recording
                                </h4>
                                <a href={lesson.videoUrl} target="_blank" className="text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:text-primary transition-colors flex items-center gap-1">
                                  Watch Externally <ExternalLink className="h-2.5 w-2.5" />
                                </a>
                              </div>
                              <div className="aspect-video rounded-none overflow-hidden bg-black shadow-inner border border-slate-800">
                                {embedUrl ? (
                                  <iframe src={embedUrl} className="w-full h-full" allowFullScreen />
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-2">
                                    <PlayCircle className="h-10 w-10 opacity-30" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest">Embedded preview unavailable</span>
                                  </div>
                                )}
                              </div>
                              <Button
                                onClick={() => handleMarkLessonComplete(lesson._id)}
                                disabled={lesson.isVideoCompleted}
                                className={`w-full h-11 rounded-none font-black uppercase tracking-widest text-[10px] shadow-none ${lesson.isVideoCompleted ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' : 'bg-slate-900 border border-slate-900'}`}
                              >
                                {lesson.isVideoCompleted ? <><CheckCircle2 className="h-4 w-4 mr-2" /> Video Completed</> : "Mark Video as Complete"}
                              </Button>
                            </div>
                          )}

                          {/* Content/Notes */}
                          {lesson.content && (
                            <div className="prose prose-slate max-w-none text-slate-500 leading-relaxed font-medium border-l-2 border-slate-200 pl-4 py-1 italic text-xs">
                              {lesson.content}
                            </div>
                          )}

                          {/* Tasks */}
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                              <CheckSquare className="h-3.5 w-3.5" /> Proficiency Tasks
                            </h4>

                            {lesson.tasks?.length > 0 ? (
                              <div className="space-y-3">
                                {lesson.tasks.map((task, tIdx) => (
                                  <div key={task._id} id={`task-${task._id}`} className="bg-slate-50/50 rounded-none p-4 border border-slate-200 space-y-3">
                                    <div className="flex items-center justify-between gap-3">
                                      <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-none bg-white flex items-center justify-center text-[9px] font-black text-slate-400 border border-slate-200">
                                          {(tIdx + 1).toString().padStart(2, '0')}
                                        </div>
                                        <h5 className="font-bold text-slate-800 text-xs">{task.title}</h5>
                                      </div>
                                      <Badge className={`text-[8px] font-black uppercase border-0 rounded-none ${TASK_TYPES[task.taskType]?.color || 'bg-slate-100 text-slate-600'}`}>
                                        {task.taskType}
                                      </Badge>
                                    </div>
                                    <TaskItem
                                      task={task}
                                      courseId={courseId}
                                      lessonId={lesson._id}
                                      userId={user?._id}
                                      initialProgress={progressData.find(p => p.taskId === task._id)}
                                      onComplete={() => fetchData()}
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-none p-6 text-center flex flex-col items-center gap-2">
                                <Trophy className="h-6 w-6 text-slate-200" />
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide italic">No tasks assigned — focus on lecture recording.</p>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            </TabsContent>

            {/* Course Details Tab */}
            <TabsContent value="course-details" className="space-y-8 outline-none animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-4">
                <div className="relative aspect-video rounded-none overflow-hidden bg-slate-100 shadow-sm">
                  <img src={course?.thumbnail || 'https://placehold.co/1200x600/e2e8f0/4f46e5?text=Course'} className="w-full h-full object-cover transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                </div>

                <div className="bg-white rounded-none p-8 border border-slate-200 shadow-none space-y-8">
                  <div className='flex items-end justify-between'>
                    <div>
                      <h1 className="text-lg md:text-xl font-bold text-slate-900 capitalize tracking-wide">
                        {course?.title}
                      </h1>
                      <div className='flex  gap-2'>
                        <Badge className="">
                          {course?.category || 'Professional Level'}
                        </Badge>
                        <Badge className="" variant="secondary">
                          {course?.levels || 'Advanced'}
                        </Badge>
                        {course?.tags?.length > 0 && course.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="uppercase">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {course?.instructorName && <div className="flex flex-col">
                      <p className="text-sm font-semibold text-slate-900 capitalize italic">- by {course?.instructorName || 'Elite Instructor'}</p>
                    </div>}
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
                      <span className="text-sm font-bold text-slate-900 uppercase">{course?.duration || 'Self-Paced'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Complexity</span>
                      <span className="text-sm font-bold text-slate-900 uppercase">{course?.levels || 'Advanced'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Modules</span>
                      <span className="text-sm font-bold text-slate-900 uppercase">{lessons.length} Units</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tasks</span>
                      <span className="text-sm font-bold text-slate-900 uppercase">{Object.values(lessonTasks).flat().length} Total</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <div className="h-5 w-1 bg-slate-300 rounded-full"></div>
                      <h2 className="text-sm font-bold text-slate-900 capitalize tracking-wide">Course Overview</h2>
                    </div>
                    <div className="space-y-2 px-1">
                      {Array.isArray(course?.description) ? (
                        course.description.map((para, i) => (
                          <p key={i} className="text-slate-600 leading-relaxed tracking-wide font-medium text-base">
                            {para}
                          </p>
                        ))
                      ) : (
                        <p className="text-slate-600 leading-relaxed font-medium text-base">
                          {course?.description || 'Learn advanced concepts and industry best practices in this comprehensive professional curriculum.'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <div className="h-4 w-1 bg-slate-300 rounded-full"></div>
                      <h2 className="text-base font-bold text-slate-900 capitalize tracking-wide">Key Outcomes</h2>
                    </div>
                    <ul className="space-y-1 px-1">
                      {course?.whatYouWillLearn?.map((item, i) => (
                        <li key={i} className="text-base text-slate-600 font-medium flex items-start gap-3">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      )) || <li className="text-base text-slate-400 italic">Objectives coming soon.</li>}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <div className="h-4 w-1 bg-slate-300 rounded-full"></div>
                      <h2 className="text-base font-bold text-slate-900 capitalize tracking-wide">Requirements</h2>
                    </div>
                    <ul className="space-y-1 px-1">
                      {course?.requirements?.map((item, i) => (
                        <li key={i} className="text-base text-slate-600 font-medium flex items-start gap-3">
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>
                          {item}
                        </li>
                      )) || <li className="text-base text-slate-400 italic">No special requirements.</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* --- MINIMAL TOC SIDEBAR (1/4) --- */}
        <aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-6 space-y-6">

          {/* Simple Progress Bar */}
          <div className="space-y-2 px-1">
            <div className="flex justify-between items-end font-black text-[9px] uppercase tracking-widest">
              <span className="text-slate-400">Course Progress <span className="text-slate-300 ml-1">(Overall)</span></span>
              <span className="text-green-600">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-1 bg-slate-100 rounded-none [&>div]:bg-green-600 transition-all duration-700" />
          </div>

          {/* Minimal Table of Contents */}
          <div className="flex flex-col space-y-5 px-1">
            {lessonsWithStatus.map((l, i) => (
              <div key={l._id} className={`space-y-1.5 ${l.isLocked ? 'opacity-40' : ''}`}>
                {/* Lesson Header */}
                <div className="flex items-start gap-2 group cursor-pointer" onClick={() => {
                  if (!l.isLocked) {
                    setActiveLessonId(l._id)
                    setTimeout(() => {
                      document.getElementById(`lesson-${l._id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }, 100)
                  }
                }}>
                  <div className="mt-1 shrink-0">
                    {l.isCompleted ? (
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                    ) : (
                      <div className={`h-1.5 w-1.5 rounded-none mt-1 ${l._id === activeLessonId ? 'bg-primary' : 'bg-slate-200'}`}></div>
                    )}
                  </div>
                  <h4 className={`text-[11px] font-black uppercase tracking-tight leading-tight ${l._id === activeLessonId ? 'text-primary' : 'text-slate-900'}`}>
                    Lesson {(i + 1).toString().padStart(2, '0')}: {l.title}
                  </h4>
                </div>

                {/* Sub-items (Lecture & Tasks) */}
                <div className="ml-5 space-y-1 border-l border-slate-100 pl-3">
                  {/* Lecture Item (Only if video exists) */}
                  {l.videoUrl && (
                    <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest py-0.5 cursor-pointer transition-colors ${l.isVideoCompleted ? 'text-green-600' : 'text-slate-400'}`} onClick={() => {
                      if (!l.isLocked) {
                        setActiveLessonId(l._id)
                        setTimeout(() => {
                          document.getElementById(`lesson-${l._id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }, 100)
                      }
                    }}>
                      {l.isVideoCompleted ? <CheckCircle2 className="h-3 w-3" /> : <PlayCircle className="h-3 w-3 opacity-50" />}
                      <span>Lecture</span>
                    </div>
                  )}

                  {/* Task Items */}
                  {(lessonTasks[l._id] || []).map((t, tIdx) => {
                    const isTaskDone = (progressData || [])
                      .some(p => p.lessonId === l._id && p.taskId === t._id && p.type === 'task' && p.completed)
                    return (
                      <div key={t._id} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest py-0.5 cursor-pointer hover:text-primary transition-colors" onClick={() => {
                        if (!l.isLocked) {
                          setActiveLessonId(l._id)
                          setTimeout(() => {
                            document.getElementById(`task-${t._id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                          }, 300)
                        }
                      }}>
                        {isTaskDone ? (
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                        ) : (
                          <div className="h-2.5 w-2.5 border border-slate-200 rounded-none shrink-0" />
                        )}
                        <span className={isTaskDone ? 'text-slate-400 line-through' : 'text-slate-500'}>
                          Task {(tIdx + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

      </div>
    </div>
  )
}
