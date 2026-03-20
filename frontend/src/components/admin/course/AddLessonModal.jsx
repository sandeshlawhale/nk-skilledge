import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { X, Loader2 } from 'lucide-react'

const AddLessonModal = ({
  showAddLesson,
  setShowAddLesson,
  newLesson,
  setNewLesson,
  handleCreateLesson,
  isCreatingLesson,
  lessonError
}) => {
  if (!showAddLesson) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
        <CardHeader className="bg-slate-900 text-white p-8">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-black uppercase italic tracking-tight">Add New Module</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowAddLesson(false)} className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <p className="text-slate-400 text-sm font-medium mt-1">Expanding the curriculum with deep-dive technical insights.</p>
        </CardHeader>
        <form onSubmit={handleCreateLesson}>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Lesson Title</label>
              <Input
                required
                placeholder="e.g. Introduction to Advanced Paradigms"
                className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold"
                value={newLesson.title}
                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Video URL</label>
                <Input
                  placeholder="Paste video URL..."
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 font-bold"
                  value={newLesson.videoUrl}
                  onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">PDF URL</label>
                <Input
                  placeholder="Reference doc URL..."
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 font-bold"
                  value={newLesson.pdfUrl}
                  onChange={(e) => setNewLesson({ ...newLesson, pdfUrl: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Module Summary</label>
              <Textarea
                placeholder="What will students master in this lesson?"
                className="rounded-xl border-slate-200 bg-slate-50 min-h-[100px] font-medium"
                value={newLesson.content}
                onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
              />
            </div>
            {lessonError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 font-medium">
                {lessonError}
              </div>
            )}
          </CardContent>
          <CardFooter className="p-8 pt-0 flex gap-3">
            <Button type="button" variant="outline" onClick={() => setShowAddLesson(false)} className="flex-1 rounded-xl h-12 font-bold border-slate-200 uppercase tracking-tight">Cancel</Button>
            <Button type="submit" disabled={isCreatingLesson} className="flex-1 bg-slate-900 hover:bg-primary rounded-xl h-12 font-black uppercase tracking-tight shadow-xl shadow-slate-200">
              {isCreatingLesson ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : 'Deploy Lesson'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default AddLessonModal
