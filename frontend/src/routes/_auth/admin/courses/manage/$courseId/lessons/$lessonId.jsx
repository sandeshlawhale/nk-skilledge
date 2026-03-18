import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import {
  ArrowLeft, Video, FileText, Plus, Trash2, X, Loader2, Edit, Save,
  CheckSquare, Code2, ClipboardList, ChevronDown, ChevronUp
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_auth/admin/courses/manage/$courseId/lessons/$lessonId')({
  component: LessonManager,
})

const TASK_TYPES = [
  { value: 'mcq', label: 'MCQ', icon: CheckSquare, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { value: 'coding', label: 'Coding', icon: Code2, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'assignment', label: 'Assignment', icon: ClipboardList, color: 'bg-amber-100 text-amber-700 border-amber-200' },
]

function LessonManager() {
  const { courseId, lessonId } = Route.useParams()
  const navigate = useNavigate()

  const [lesson, setLesson] = useState(null)
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditingLesson, setIsEditingLesson] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editData, setEditData] = useState({ title: '', content: '', videoUrl: '', pdfUrl: '' })

  // Task modal
  const [showAddTask, setShowAddTask] = useState(false)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [taskError, setTaskError] = useState('')
  const [taskType, setTaskType] = useState('mcq')

  // Task form data
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    // MCQ
    options: ['', '', '', ''],
    correctAnswer: '',
    // Coding
    language: 'javascript',
    starterCode: '',
    testCases: [{ input: '', expectedOutput: '', isHidden: false }],
  })

  // Expanded task detail
  const [expandedTask, setExpandedTask] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [lessonRes, tasksRes] = await Promise.all([
        authFetch(`${API_BASE_URL}/lessons/${lessonId}`),
        authFetch(`${API_BASE_URL}/tasks/lesson/${lessonId}`),
      ])
      const lessonData = await lessonRes.json()
      const tasksData = await tasksRes.json()

      if (lessonData.success) {
        setLesson(lessonData.data)
        setEditData({
          title: lessonData.data.title,
          content: lessonData.data.content || '',
          videoUrl: lessonData.data.videoUrl || '',
          pdfUrl: lessonData.data.pdfUrl || '',
        })
      }
      if (tasksData.success) setTasks(tasksData.data)
    } catch (err) {
      console.error('Error loading lesson:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [lessonId])

  const handleUpdateLesson = async () => {
    setIsSaving(true)
    try {
      const res = await authFetch(`${API_BASE_URL}/lessons/${lessonId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      })
      const data = await res.json()
      if (data.success) {
        setLesson(data.data)
        setIsEditingLesson(false)
      }
    } catch (err) {
      console.error('Update lesson failed:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    setTaskError('')
    if (!taskForm.title.trim()) {
      setTaskError('Task title is required.')
      return
    }

    const payload = {
      lessonId,
      courseId,
      title: taskForm.title,
      description: taskForm.description,
      taskType,
    }

    if (taskType === 'mcq') {
      const filledOptions = taskForm.options.filter(o => o.trim())
      if (filledOptions.length < 2) { setTaskError('Add at least 2 options.'); return }
      if (!taskForm.correctAnswer.trim()) { setTaskError('Correct answer is required.'); return }
      payload.options = filledOptions
      payload.correctAnswer = taskForm.correctAnswer
    }

    if (taskType === 'coding') {
      payload.language = taskForm.language
      payload.starterCode = taskForm.starterCode
      payload.testCases = taskForm.testCases.filter(tc => tc.input.trim() || tc.expectedOutput.trim())
    }

    setIsCreatingTask(true)
    try {
      const res = await authFetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setTasks(prev => [...prev, data.data])
        setShowAddTask(false)
        resetTaskForm()
      } else {
        setTaskError(data.message || 'Failed to create task.')
      }
    } catch (err) {
      setTaskError('Something went wrong.')
    } finally {
      setIsCreatingTask(false)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Delete this task?')) return
    try {
      await authFetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      })
      setTasks(prev => prev.filter(t => t._id !== taskId))
    } catch (err) {
      console.error('Delete task failed:', err)
    }
  }

  const resetTaskForm = () => {
    setTaskForm({
      title: '',
      description: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      language: 'javascript',
      starterCode: '',
      testCases: [{ input: '', expectedOutput: '', isHidden: false }],
    })
    setTaskType('mcq')
    setTaskError('')
  }

  const updateOption = (idx, val) => {
    const updated = [...taskForm.options]
    updated[idx] = val
    setTaskForm({ ...taskForm, options: updated })
  }

  const addTestCase = () => {
    setTaskForm({ ...taskForm, testCases: [...taskForm.testCases, { input: '', expectedOutput: '', isHidden: false }] })
  }

  const updateTestCase = (idx, field, val) => {
    const updated = [...taskForm.testCases]
    updated[idx] = { ...updated[idx], [field]: field === 'isHidden' ? val : val }
    setTaskForm({ ...taskForm, testCases: updated })
  }

  const removeTestCase = (idx) => {
    setTaskForm({ ...taskForm, testCases: taskForm.testCases.filter((_, i) => i !== idx) })
  }

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-slate-500 font-medium animate-pulse">Loading lesson...</p>
    </div>
  )

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-geist pb-20">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
        <button
          onClick={() => navigate({ to: `/admin/courses/manage/${courseId}` })}
          className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Course
        </button>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate max-w-xs">{lesson?.title}</span>
      </div>

      {/* Lesson Header */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -ml-24 -mt-24"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 flex-1">
            <Badge className="bg-white/10 text-white/70 border-white/20 font-bold px-3 py-1 text-xs uppercase tracking-widest">Lesson Module</Badge>
            {isEditingLesson ? (
              <Input
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="text-3xl font-black bg-white/10 border-white/20 text-white placeholder:text-white/40 h-auto py-2 rounded-xl"
              />
            ) : (
              <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase italic">{lesson?.title}</h1>
            )}
            <div className="flex items-center gap-4 mt-2">
              {lesson?.videoUrl && (
                <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-indigo-300 text-sm font-bold hover:text-white transition-colors">
                  <Video className="h-3.5 w-3.5" /> Video Link
                </a>
              )}
              {lesson?.pdfUrl && (
                <a href={lesson.pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-amber-300 text-sm font-bold hover:text-white transition-colors">
                  <FileText className="h-3.5 w-3.5" /> PDF Link
                </a>
              )}
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            {isEditingLesson ? (
              <>
                <Button variant="ghost" onClick={() => setIsEditingLesson(false)} className="border-slate-700 text-white hover:bg-white/10 rounded-xl px-5 h-11 font-bold">
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
                <Button onClick={handleUpdateLesson} disabled={isSaving} className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl px-5 h-11 font-bold">
                  {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />} Save
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditingLesson(true)} className="border-slate-700 text-white hover:bg-white/10 rounded-xl px-5 h-11 font-bold">
                  <Edit className="h-4 w-4 mr-2" /> Edit Lesson
                </Button>
                <Button onClick={() => setShowAddTask(true)} className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl px-5 h-11 font-bold shadow-xl">
                  <Plus className="h-4 w-4 mr-2" /> Add Task
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Editable fields when editing */}
        {isEditingLesson && (
          <div className="relative z-10 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Video URL</label>
              <Input
                placeholder="https://..."
                value={editData.videoUrl}
                onChange={(e) => setEditData({ ...editData, videoUrl: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/50">PDF URL</label>
              <Input
                placeholder="https://..."
                value={editData.pdfUrl}
                onChange={(e) => setEditData({ ...editData, pdfUrl: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-xl"
              />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Lesson Summary / Content</label>
              <Textarea
                placeholder="Describe what students will learn..."
                value={editData.content}
                onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-xl min-h-[90px]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Lesson Description */}
      {!isEditingLesson && lesson?.content && (
        <Card className="border border-slate-100 rounded-2xl shadow-sm bg-white">
          <CardContent className="p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Lesson Overview</p>
            <p className="text-slate-600 leading-relaxed font-medium">{lesson.content}</p>
          </CardContent>
        </Card>
      )}

      {/* Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
            <div className="h-2 w-8 bg-indigo-500 rounded-full"></div>
            Tasks
          </h2>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-slate-200 text-slate-500 font-bold bg-white">
              {tasks.length} Tasks
            </Badge>
            <Button onClick={() => setShowAddTask(true)} className="bg-slate-900 hover:bg-primary rounded-xl px-5 h-10 font-bold uppercase tracking-tight">
              <Plus className="h-4 w-4 mr-2" /> Add Task
            </Button>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-3xl p-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm">
              <CheckSquare className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No tasks yet</h3>
            <p className="text-slate-500 max-w-sm">Add MCQ, coding challenges, or assignments to test student understanding.</p>
            <Button onClick={() => setShowAddTask(true)} className="bg-slate-900 rounded-xl px-8 h-12 font-bold uppercase hover:scale-105 transition-all">
              Create First Task
            </Button>
          </div>
        ) : (
          <div className="grid gap-3">
            {tasks.map((task, idx) => {
              const typeInfo = TASK_TYPES.find(t => t.value === task.taskType) || TASK_TYPES[0]
              const Icon = typeInfo.icon
              const isExpanded = expandedTask === task._id

              return (
                <Card key={task._id} className="border border-slate-100 rounded-2xl shadow-sm bg-white overflow-hidden">
                  <div className="flex items-center p-4 gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-lg shrink-0">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-base">{task.title}</h3>
                        <Badge className={`text-[10px] font-black uppercase border ${typeInfo.color}`}>
                          <Icon className="h-2.5 w-2.5 mr-1" />
                          {typeInfo.label}
                        </Badge>
                      </div>
                      {task.description && (
                        <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{task.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTask(task._id)}
                        className="h-9 w-9 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setExpandedTask(isExpanded ? null : task._id)}
                        className="h-9 w-9 rounded-xl hover:bg-slate-50 text-slate-400"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Expanded task details */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-3">
                      {task.taskType === 'mcq' && task.options?.length > 0 && (
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Options</p>
                          <div className="grid grid-cols-2 gap-2">
                            {task.options.map((opt, oi) => (
                              <div key={oi} className={`p-2.5 rounded-xl text-sm font-medium border ${opt === task.correctAnswer ? 'bg-green-50 border-green-200 text-green-700 font-bold' : 'bg-white border-slate-200 text-slate-600'}`}>
                                {opt === task.correctAnswer && <span className="text-[10px] font-black uppercase tracking-wider text-green-500 mr-2">✓</span>}
                                {opt}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {task.taskType === 'coding' && (
                        <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Language: <span className="text-slate-700">{task.language}</span></p>
                          {task.starterCode && (
                            <pre className="bg-slate-900 text-green-400 rounded-xl p-4 text-xs overflow-x-auto font-mono">{task.starterCode}</pre>
                          )}
                          {task.testCases?.length > 0 && (
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Test Cases</p>
                              {task.testCases.map((tc, ti) => (
                                <div key={ti} className="flex gap-3 text-xs font-mono bg-white border border-slate-200 rounded-xl p-2.5 mb-1.5">
                                  <span className="text-slate-400 font-bold">Input:</span>
                                  <span className="text-slate-700">{tc.input || '—'}</span>
                                  <span className="text-slate-400 font-bold">→</span>
                                  <span className="text-slate-700">{tc.expectedOutput || '—'}</span>
                                  {tc.isHidden && <Badge className="text-[10px] bg-slate-100 text-slate-500 border-0 ml-auto">Hidden</Badge>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      {task.taskType === 'assignment' && task.description && (
                        <p className="text-sm text-slate-600 leading-relaxed">{task.description}</p>
                      )}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-xl border-0 shadow-2xl rounded-3xl overflow-hidden bg-white max-h-[90vh] flex flex-col">
            <CardHeader className="bg-slate-900 text-white p-8 shrink-0">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-black uppercase italic tracking-tight">Create Task</CardTitle>
                  <p className="text-slate-400 text-sm mt-1">Add an assessment to this lesson.</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => { setShowAddTask(false); resetTaskForm() }} className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Task Type Selector */}
              <div className="flex gap-2 mt-6">
                {TASK_TYPES.map(t => {
                  const Icon = t.icon
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setTaskType(t.value)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold uppercase tracking-tight transition-all border ${
                        taskType === t.value
                          ? 'bg-white text-slate-900 border-white shadow-lg'
                          : 'bg-white/10 text-white/60 border-white/10 hover:bg-white/20'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" /> {t.label}
                    </button>
                  )
                })}
              </div>
            </CardHeader>

            <form onSubmit={handleCreateTask} className="flex flex-col min-h-0 flex-1">
              <CardContent className="p-8 space-y-5 overflow-y-auto flex-1">

                {/* Common Fields */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Task Title</label>
                  <Input
                    required
                    placeholder="e.g. What is a closure in JavaScript?"
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Description / Instructions</label>
                  <Textarea
                    placeholder="Describe the task or provide additional context..."
                    className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white min-h-[80px] font-medium"
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  />
                </div>

                {/* MCQ Fields */}
                {taskType === 'mcq' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Answer Options</label>
                      <div className="grid grid-cols-2 gap-2">
                        {taskForm.options.map((opt, idx) => (
                          <Input
                            key={idx}
                            placeholder={`Option ${idx + 1}`}
                            className="h-11 rounded-xl border-slate-200 bg-slate-50 font-medium"
                            value={opt}
                            onChange={(e) => updateOption(idx, e.target.value)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Correct Answer (must match an option above)</label>
                      <Input
                        placeholder="e.g. Option 1 text..."
                        className="h-11 rounded-xl border-slate-200 bg-slate-50 font-bold text-green-700"
                        value={taskForm.correctAnswer}
                        onChange={(e) => setTaskForm({ ...taskForm, correctAnswer: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {/* Coding Fields */}
                {taskType === 'coding' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Language</label>
                      <select
                        className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={taskForm.language}
                        onChange={(e) => setTaskForm({ ...taskForm, language: e.target.value })}
                      >
                        {['javascript', 'python', 'java', 'cpp', 'typescript'].map(lang => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Starter Code</label>
                      <Textarea
                        placeholder="// Write your starter code here..."
                        className="rounded-xl border-slate-200 bg-slate-900 text-green-400 font-mono text-sm min-h-[120px] focus:bg-slate-900 focus:ring-primary"
                        value={taskForm.starterCode}
                        onChange={(e) => setTaskForm({ ...taskForm, starterCode: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Test Cases</label>
                        <Button type="button" variant="outline" size="sm" onClick={addTestCase} className="h-7 text-xs rounded-lg border-slate-200 font-bold">
                          + Add Case
                        </Button>
                      </div>
                      {taskForm.testCases.map((tc, ti) => (
                        <div key={ti} className="flex items-center gap-2 bg-slate-50 rounded-xl p-2 border border-slate-200">
                          <Input
                            placeholder="Input"
                            value={tc.input}
                            onChange={(e) => updateTestCase(ti, 'input', e.target.value)}
                            className="h-9 rounded-lg border-slate-200 bg-white text-xs font-mono flex-1"
                          />
                          <span className="text-slate-400 font-bold text-sm">→</span>
                          <Input
                            placeholder="Expected output"
                            value={tc.expectedOutput}
                            onChange={(e) => updateTestCase(ti, 'expectedOutput', e.target.value)}
                            className="h-9 rounded-lg border-slate-200 bg-white text-xs font-mono flex-1"
                          />
                          <label className="flex items-center gap-1 text-xs text-slate-500 font-bold cursor-pointer whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={tc.isHidden}
                              onChange={(e) => updateTestCase(ti, 'isHidden', e.target.checked)}
                              className="rounded"
                            />
                            Hidden
                          </label>
                          {taskForm.testCases.length > 1 && (
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeTestCase(ti)} className="h-8 w-8 rounded-lg text-red-400 hover:bg-red-50 shrink-0">
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Assignment — description is sufficient, already in common fields */}
                {taskType === 'assignment' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 font-medium">
                    📋 Assignment tasks use the description above as the assignment prompt. Students will submit their work manually.
                  </div>
                )}

                {taskError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 font-medium">
                    {taskError}
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-8 pt-0 flex gap-3 shrink-0">
                <Button type="button" variant="outline" onClick={() => { setShowAddTask(false); resetTaskForm() }} className="flex-1 rounded-xl h-12 font-bold border-slate-200 uppercase">
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreatingTask} className="flex-1 bg-slate-900 hover:bg-primary rounded-xl h-12 font-black uppercase shadow-xl shadow-slate-200">
                  {isCreatingTask ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : 'Create Task'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
