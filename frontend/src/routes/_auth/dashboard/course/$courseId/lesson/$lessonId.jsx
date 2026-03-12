import { createFileRoute, useParams } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, ChevronRight, FileText, Download, MessageSquare } from 'lucide-react'

export const Route = createFileRoute('/_auth/dashboard/course/$courseId/lesson/$lessonId')({
  component: LessonPlayer,
})

function LessonPlayer() {
  const { courseId, lessonId } = useParams({ from: '/_auth/dashboard/course/$courseId/lesson/$lessonId' })

  return (
    <div className="flex flex-col h-full w-full">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center border-b border-slate-800">
        {/* Placeholder for Video Player */}
        <div className="text-center space-y-4 max-w-md px-6">
          <div className="h-20 w-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto ring-4 ring-slate-800/50">
            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
          </div>
          <p className="text-slate-400 font-medium">Video Player Placeholder (ID: {lessonId})</p>
        </div>
        
        {/* Mock Controls */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end px-4 pb-4">
          <div className="w-full bg-slate-600/50 h-1 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-indigo-500" />
          </div>
        </div>
      </div>

      {/* Lesson Details & Interactions */}
      <div className="flex-1 bg-white p-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Understanding the Component Tree</h1>
              <p className="text-slate-500 mt-2">Lesson 3 • 18:30 • Module 2: Core Architecture</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="text-slate-600">
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Complete & Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 border-b w-full justify-start rounded-none bg-transparent h-auto p-0">
              <TabsTrigger value="overview" className="data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 border-b-2 border-transparent rounded-none px-4 py-3 font-semibold h-full shadow-none">
                Overview
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 border-b-2 border-transparent rounded-none px-4 py-3 font-semibold h-full shadow-none">
                Resources & Downloads
              </TabsTrigger>
              <TabsTrigger value="assignment" className="data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 border-b-2 border-transparent rounded-none px-4 py-3 font-semibold h-full shadow-none relative pr-8">
                Assignment
                <div className="absolute top-3 right-2 h-2 w-2 rounded-full bg-indigo-500" />
              </TabsTrigger>
              <TabsTrigger value="discussion" className="data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 border-b-2 border-transparent rounded-none px-4 py-3 font-semibold h-full shadow-none">
                Discussion
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed">
                In this lesson, we dive deep into how React evaluates and maintains the component tree. We will understand the reconciliation process and identify common pitfalls leading to unnecessary re-renders.
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Key Takeaways</h3>
              <ul className="space-y-2 text-slate-700">
                <li>Differences between virtual DOM and actual DOM structures.</li>
                <li>How React Fiber alters the rendering lifecycle.</li>
                <li>When and why reconciliation forces full sub-tree re-renders.</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="assignment" className="space-y-6">
              <div className="p-6 border rounded-xl bg-slate-50 border-slate-200">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Knowledge Check</h3>
                    <p className="text-slate-500 text-sm mt-1">Answer the following questions to complete this lesson.</p>
                  </div>
                  <div className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-bold rounded-full">
                    3 Questions
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="bg-white p-5 rounded-lg border shadow-xs">
                     <h4 className="font-semibold text-slate-900 mb-4">1. What triggers a React component to re-render naturally?</h4>
                     <div className="space-y-3">
                       {['State or props change', 'Parent re-renders', 'Calling forceUpdate()', 'All of the above'].map((opt, i) => (
                         <label key={i} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${i === 3 ? 'border-indigo-600 bg-indigo-50' : 'hover:bg-slate-50 border-slate-200'}`}>
                           <input type="radio" name="q1" className="h-4 w-4 text-indigo-600 mr-3" defaultChecked={i === 3} />
                           <span className={i === 3 ? 'font-medium text-indigo-900' : 'text-slate-700'}>{opt}</span>
                         </label>
                       ))}
                     </div>
                   </div>

                   <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Submit Answers & Continue</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
              <div className="rounded-lg border bg-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900">Lesson Slides (PDF)</h4>
                    <p className="text-xs text-slate-500">2.4 MB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-indigo-600">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="discussion">
              <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-xl bg-slate-50 text-slate-500 flex-col text-center">
                <MessageSquare className="h-12 w-12 mb-4 text-slate-400" />
                <h3 className="font-bold text-slate-900 mb-2">Join the Discussion</h3>
                <p className="text-sm max-w-md">Connect with other students taking this course and ask questions to our expert mentors.</p>
                <Button className="mt-6 bg-slate-900 text-white">Join Discord Community</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
