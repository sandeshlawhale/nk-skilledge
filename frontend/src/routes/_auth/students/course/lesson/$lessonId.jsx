import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { useAuthStore } from '@/store/auth'
import {
  ArrowLeft, Video, FileText, CheckSquare, Code2, ClipboardList,
  ChevronDown, ChevronUp, ExternalLink, Loader2, CheckCircle2,
  PlayCircle, AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/_auth/students/course/lesson/$lessonId')({
  component: StudentLessonView,
})

const TASK_TYPES = {
  mcq: { label: 'MCQ', icon: CheckSquare, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  coding: { label: 'Coding', icon: Code2, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  assignment: { label: 'Assignment', icon: ClipboardList, color: 'bg-amber-100 text-amber-700 border-amber-200' },
}

function getVideoEmbed(url) {
  if (!url) return null
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
  // Vimeo
  const vmMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vmMatch) return `https://player.vimeo.com/video/${vmMatch[1]}`
  // Google Drive
  const gdMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  if (gdMatch) return `https://drive.google.com/file/d/${gdMatch[1]}/preview`
  return null
}

// MCQ task component
function MCQTask({ task, courseId, lessonId, userId }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!selected) return
    setIsSubmitting(true)
    const correct = selected === task.correctAnswer
    setIsCorrect(correct)
    setSubmitted(true)

    if (correct) {
      try {
        await authFetch(`${API_BASE_URL}/progress/complete-task`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId, lessonId, taskId: task._id }),
        })
      } catch (err) {
        console.error('Progress update failed:', err)
      }
    }
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-3">
      {task.description && (
        <p className="text-slate-600 leading-relaxed text-sm">{task.description}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {task.options?.map((opt, i) => {
          let cls = 'p-3.5 rounded-xl border-2 text-sm font-medium cursor-pointer transition-all text-left w-full '
          if (submitted) {
            if (opt === task.correctAnswer) cls += 'bg-green-50 border-green-400 text-green-800 font-bold'
            else if (opt === selected && !isCorrect) cls += 'bg-red-50 border-red-300 text-red-700'
            else cls += 'bg-slate-50 border-slate-200 text-slate-500'
          } else {
            cls += selected === opt
              ? 'bg-indigo-50 border-indigo-400 text-indigo-800 font-bold'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50'
          }
          return (
            <button key={i} className={cls} onClick={() => !submitted && setSelected(opt)}>
              <span className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 text-[10px] font-black
                  border-current">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </span>
            </button>
          )
        })}
      </div>

      {!submitted ? (
        <Button
          onClick={handleSubmit}
          disabled={!selected || isSubmitting}
          className="w-full bg-slate-900 hover:bg-primary rounded-xl h-11 font-bold"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          Submit Answer
        </Button>
      ) : (
        <div className={`flex items-center gap-3 p-4 rounded-xl border-2 font-bold text-sm
          ${isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
          {isCorrect
            ? <><CheckCircle2 className="h-5 w-5 shrink-0" /> Correct! Well done.</>
            : <><AlertCircle className="h-5 w-5 shrink-0" /> Incorrect. The correct answer is: <span className="underline">{task.correctAnswer}</span></>
          }
        </div>
      )}
    </div>
  )
}

// Coding task component
function CodingTask({ task }) {
  return (
    <div className="space-y-3">
      {task.description && (
        <p className="text-slate-600 leading-relaxed text-sm">{task.description}</p>
      )}
      <div className="flex items-center gap-2">
        <Badge className="bg-emerald-100 text-emerald-700 border-0 font-bold text-xs uppercase">
          {task.language || 'javascript'}
        </Badge>
      </div>
      {task.starterCode && (
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Starter Code</p>
          <pre className="bg-slate-900 text-green-400 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed">
            {task.starterCode}
          </pre>
        </div>
      )}
      {task.testCases?.filter(tc => !tc.isHidden).length > 0 && (
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Visible Test Cases</p>
          <div className="space-y-1.5">
            {task.testCases.filter(tc => !tc.isHidden).map((tc, i) => (
              <div key={i} className="flex gap-3 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="text-slate-400 font-bold">Input:</span>
                <span className="text-slate-700">{tc.input || "—"}</span>
                <span className="text-slate-400 font-bold">→</span>
                <span className="text-slate-700">{tc.expectedOutput || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 font-medium">
        💡 Write your solution and submit to your instructor for review.
      </div>
    </div>
  )
}

// Assignment task component
function AssignmentTask({ task, courseId, lessonId }) {
  const handleComplete = async () => {
    try {
      await authFetch(`${API_BASE_URL}/progress/complete-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, lessonId, taskId: task._id }),
      })
    } catch (err) {
      console.error('Progress update failed:', err)
    }
  }

  return (
    <div className="space-y-3">
      {task.description && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-amber-900 leading-relaxed text-sm font-medium">{task.description}</p>
        </div>
      )}
      <p className="text-xs text-slate-500 italic">
        📋 Submit your assignment to your instructor to have it reviewed and marked complete.
      </p>
      <Button
        variant="outline"
        onClick={handleComplete}
        className="rounded-xl border-slate-200 font-bold text-sm h-10"
      >
        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Mark as Submitted
      </Button>
    </div>
  )
}

function StudentLessonView() {
  const { courseId, lessonId } = Route.useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [lesson, setLesson] = useState(null)
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedTask, setExpandedTask] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [lessonRes, tasksRes] = await Promise.all([
          authFetch(`${API_BASE_URL}/lessons/${lessonId}`),
          authFetch(`${API_BASE_URL}/tasks/lesson/${lessonId}`),
        ])
        const lessonData = await lessonRes.json()
        const tasksData = await tasksRes.json()

        if (lessonData.success) setLesson(lessonData.data)
        if (tasksData.success) setTasks(tasksData.data)
      } catch (err) {
        console.error('Error loading lesson:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [lessonId])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        <p className="text-slate-500 font-medium animate-pulse text-sm">Loading lesson...</p>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3 text-center">
        <AlertCircle className="h-10 w-10 text-slate-300" />
        <p className="text-slate-600 font-bold">Lesson not found</p>
        <Button variant="outline" onClick={() => navigate({ to: "/students/course/${courseId}" })}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Course
        </Button>
      </div>
    )
  }

  const embedUrl = getVideoEmbed(lesson.videoUrl)

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-geist pb-16">

      {/* Breadcrumb */}
      <button
        onClick={() => navigate({ to: `/students/course/${courseId}` })}
        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-900 transition-colors font-medium"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Course
      </button>

      {/* Lesson Header */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-7 text-white shadow-xl border border-slate-800">
        <div className="absolute top-0 left-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl -ml-28 -mt-28 pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <Badge className="bg-white/10 text-white/70 border-white/20 font-bold px-3 py-1 text-[10px] uppercase tracking-widest">
            Lesson Module
          </Badge>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase italic leading-tight">
            {lesson.title}
          </h1>
          {lesson.content && (
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl pt-1">{lesson.content}</p>
          )}
          <div className="flex items-center gap-4 pt-2">
            {lesson.videoUrl && (
              <a
                href={lesson.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-indigo-300 text-xs font-bold hover:text-white transition-colors"
              >
                <Video className="h-3.5 w-3.5" /> Open Video <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            )}
            {lesson.pdfUrl && (
              <a
                href={lesson.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-amber-300 text-xs font-bold hover:text-white transition-colors"
              >
                <FileText className="h-3.5 w-3.5" /> Open PDF <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Video Player */}
      {lesson.videoUrl && (
        <div className="rounded-3xl overflow-hidden bg-black shadow-xl border border-slate-800">
          {embedUrl ? (
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={lesson.title}
              />
            </div>
          ) : (
            <div className="aspect-video flex flex-col items-center justify-center bg-slate-900 text-white gap-4">
              <PlayCircle className="h-16 w-16 text-slate-600" />
              <div className="text-center space-y-2">
                <p className="text-sm font-bold text-slate-400">Embedded preview not available</p>
                <a
                  href={lesson.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-400 text-sm font-bold hover:text-indigo-300 underline"
                >
                  <ExternalLink className="h-4 w-4" /> Watch Video
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PDF Section */}
      {lesson.pdfUrl && (
        <Card className="border border-slate-100 rounded-2xl shadow-sm bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6 text-amber-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900 text-sm">Lesson PDF / Reference</p>
              <p className="text-xs text-slate-500 truncate">{lesson.pdfUrl}</p>
            </div>
            <a href={lesson.pdfUrl} target="_blank" rel="noreferrer">
              <Button variant="outline" className="rounded-xl border-slate-200 h-9 text-xs font-bold shrink-0">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Open
              </Button>
            </a>
          </CardContent>
        </Card>
      )}

      {/* Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
            <div className="h-2 w-7 bg-primary rounded-full" />
            Tasks
          </h2>
          <Badge variant="outline" className="border-slate-200 text-slate-500 font-bold bg-white text-xs">
            {tasks.length} Tasks
          </Badge>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-3xl p-16 flex flex-col items-center text-center space-y-3">
            <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm">
              <CheckSquare className="h-7 w-7" />
            </div>
            <p className="font-bold text-slate-600">No tasks for this lesson yet</p>
            <p className="text-slate-400 text-sm">Check back later — the instructor may add tasks soon.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task, idx) => {
              const typeInfo = TASK_TYPES[task.taskType] || TASK_TYPES.assignment
              const Icon = typeInfo.icon
              const isExpanded = expandedTask === task._id

              return (
                <Card key={task._id} className="border border-slate-100 rounded-2xl shadow-sm bg-white overflow-hidden">
                  {/* Task Header */}
                  <button
                    className="w-full flex items-center p-4 gap-4 text-left hover:bg-slate-50/50 transition-colors"
                    onClick={() => setExpandedTask(isExpanded ? null : task._id)}
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-black text-sm shrink-0">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-sm">{task.title}</h3>
                        <Badge className={`text-[10px] font-black uppercase border ${typeInfo.color}`}>
                          <Icon className="h-2.5 w-2.5 mr-1" />
                          {typeInfo.label}
                        </Badge>
                      </div>
                      {task.description && !isExpanded && (
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{task.description}</p>
                      )}
                    </div>
                    <div className="shrink-0 text-slate-400">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>

                  {/* Task Body */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/30 p-5">
                      {task.taskType === 'mcq' && (
                        <MCQTask
                          task={task}
                          courseId={courseId}
                          lessonId={lessonId}
                          userId={user?._id}
                        />
                      )}
                      {task.taskType === 'coding' && (
                        <CodingTask task={task} />
                      )}
                      {task.taskType === 'assignment' && (
                        <AssignmentTask task={task} courseId={courseId} lessonId={lessonId} />
                      )}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
