import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Video, Trash2, ChevronRight, BookOpen, PlusCircle } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

const ModulesTab = ({ 
  courseId, 
  lessons, 
  handleDeleteLesson, 
  setShowAddLesson 
}) => {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
          <div className="h-2 w-8 bg-primary rounded-full"></div>
          Lessons &amp; Structure
        </h2>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-slate-200 text-slate-500 font-bold bg-white mr-2">
            {lessons.length} Modules Total
          </Badge>
          <Button 
            className="bg-slate-900 text-white hover:bg-primary rounded-xl px-4 h-10 font-bold uppercase tracking-tight text-xs shadow-none" 
            onClick={() => setShowAddLesson(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Lesson
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {lessons.map((lesson, idx) => (
          <Card key={lesson._id} className="shadow-sm rounded-2xl overflow-hidden group hover:shadow-lg hover:translate-y-[-2px] transition-all bg-white border border-slate-100">
            <div className="flex items-center p-2 min-h-[90px]">
              <div className="w-16 flex flex-col items-center justify-center border-r border-slate-50">
                <span className="text-3xl font-black text-slate-200 group-hover:text-primary/20 transition-colors">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex-1 px-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  {lesson.title}
                  {lesson.videoUrl && <Video className="h-4 w-4 text-indigo-400" />}
                </h3>
                <div className="flex items-center gap-4 mt-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
                    Lesson Module
                  </span>
                  <Badge className={lesson.status === 'published' ? 'bg-green-100 text-green-700 border-0 text-[10px] font-black uppercase' : 'bg-amber-100 text-amber-700 border-0 text-[10px] font-black uppercase'}>
                    {lesson.status || 'draft'}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 pr-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteLesson(lesson._id)}
                  className="h-10 w-10 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div
                  onClick={() => navigate({ to: `/admin/courses/manage/${courseId}/lessons/${lesson._id}` })}
                  className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </Card>
        ))}

        {lessons.length === 0 && (
          <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-3xl p-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm mb-2">
              <BookOpen className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Your curriculum is empty</h3>
            <p className="text-slate-500 max-w-sm">Every great course starts with a single lesson. Click the button above to begin building.</p>
            <Button onClick={() => setShowAddLesson(true)} className="bg-slate-900 rounded-xl px-8 h-12 font-bold uppercase transition-all hover:scale-105">Create First Lesson</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModulesTab
