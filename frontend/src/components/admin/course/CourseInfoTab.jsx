import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Plus, Edit, Save, X, Loader2, Video, PlusCircle
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"


const CourseInfoTab = ({
  course,
  editData,
  setEditData,
  isEditingInfo,
  setIsEditingInfo,
  isSaving,
  handleUpdateCourse,
  handleListUpdate,
  handleAddListItem,
  handleRemoveListItem,
  handlePublishToggle
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
          <div className="h-2 w-8 bg-indigo-500 rounded-full"></div>
          Identity &amp; Information
        </h2>
        {!isEditingInfo ? (
          <Button onClick={() => setIsEditingInfo(true)} variant="outline" className="rounded-xl font-bold border-slate-200 bg-white">
            <Edit className="w-4 h-4 mr-2" /> Edit Details
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => setIsEditingInfo(false)} variant="ghost" className="rounded-xl font-bold text-slate-500 hover:bg-slate-100">
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleUpdateCourse} disabled={isSaving} className="bg-primary rounded-xl font-bold shadow-lg shadow-primary/20">
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm rounded-3xl bg-white p-8 border border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16"></div>
            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Course Title</label>
                {isEditingInfo ? (
                  <Input
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="text-2xl font-black h-16 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white transition-all shadow-none placeholder:text-slate-300"
                    placeholder="Mastering the Craft..."
                  />
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 min-h-[64px] flex items-center group cursor-pointer hover:border-indigo-200 transition-all">
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">{course?.title}</h3>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Long Description (Multi-Paragraph)</label>
                {isEditingInfo ? (
                  <div className="space-y-3">
                    {editData.description.map((item, index) => (
                      <div key={index} className="flex gap-2 group">
                        <Textarea
                          value={item}
                          onChange={(e) => handleListUpdate('description', index, e.target.value)}
                          className="min-h-[100px] rounded-2xl border-slate-200 bg-slate-50 focus:bg-white transition-all shadow-none p-4 text-base leading-relaxed"
                          placeholder={`Paragraph #${index + 1}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveListItem('description', index)}
                          className="h-10 w-10 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 mt-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddListItem('description')}
                      className="w-full border-dashed border-slate-200 text-slate-400 hover:text-primary hover:border-primary rounded-xl"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Paragraph
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Array.isArray(course?.description) ? (
                      course.description.map((para, i) => (
                        <p key={i} className="font-medium text-slate-600 italic leading-relaxed">
                          {para}
                        </p>
                      ))
                    ) : (
                      <p className="font-medium text-slate-600 italic leading-relaxed">
                        {course?.description}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">What You Will Learn</label>
                  {isEditingInfo ? (
                    <div className="space-y-2">
                      {editData.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex gap-2 group">
                          <Input
                            value={item}
                            onChange={(e) => handleListUpdate('whatYouWillLearn', index, e.target.value)}
                            className="h-10 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all shadow-none px-4 text-sm"
                            placeholder={`Goal #${index + 1}`}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveListItem('whatYouWillLearn', index)}
                            className="h-10 w-10 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleAddListItem('whatYouWillLearn')}
                        className="w-full h-10 rounded-xl border-dashed border-slate-200 text-slate-400 hover:text-primary hover:border-primary/50 text-[10px] font-black uppercase tracking-widest bg-slate-50/50"
                      >
                        <PlusCircle className="h-3 w-3 mr-2" /> Add Objective
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 min-h-[80px]">
                      <ul className="space-y-2">
                        {course?.whatYouWillLearn?.map((item, i) => (
                          <li key={i} className="text-sm text-slate-600 font-medium flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                            {item}
                          </li>
                        ))}
                        {(!course?.whatYouWillLearn || course.whatYouWillLearn.length === 0) && <li className="text-sm text-slate-400 italic">No points added yet.</li>}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Requirements</label>
                  {isEditingInfo ? (
                    <div className="space-y-2">
                      {editData.requirements.map((item, index) => (
                        <div key={index} className="flex gap-2 group">
                          <Input
                            value={item}
                            onChange={(e) => handleListUpdate('requirements', index, e.target.value)}
                            className="h-10 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all shadow-none px-4 text-sm"
                            placeholder={`Requirement #${index + 1}`}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveListItem('requirements', index)}
                            className="h-10 w-10 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleAddListItem('requirements')}
                        className="w-full h-10 rounded-xl border-dashed border-slate-200 text-slate-400 hover:text-primary hover:border-primary/50 text-[10px] font-black uppercase tracking-widest bg-slate-50/50"
                      >
                        <PlusCircle className="h-3 w-3 mr-2" /> Add Requirement
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 min-h-[80px]">
                      <ul className="space-y-2">
                        {course?.requirements?.map((item, i) => (
                          <li key={i} className="text-sm text-slate-600 font-medium flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></div>
                            {item}
                          </li>
                        ))}
                        {(!course?.requirements || course.requirements.length === 0) && <li className="text-sm text-slate-400 italic">No requirements specified.</li>}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Advanced Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm rounded-3xl bg-white p-6 border border-slate-100">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Instructor Name</label>
                  {isEditingInfo ? (
                    <Input
                      value={editData.instructorName}
                      onChange={(e) => setEditData({ ...editData, instructorName: e.target.value })}
                      className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold"
                    />
                  ) : (
                    <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{course?.instructorName || 'Not Set'}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Duration</label>
                  {isEditingInfo ? (
                    <Input
                      value={editData.duration}
                      onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                      placeholder="e.g. 5 Hours, 10 Weeks"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold"
                    />
                  ) : (
                    <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{course?.duration || 'Not Set'}</div>
                  )}
                </div>
              </div>
            </Card>

            <Card className="shadow-sm rounded-3xl bg-white p-6 border border-slate-100">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Pricing Model</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="askForPrice"
                        checked={editData.askForPrice}
                        disabled={!isEditingInfo}
                        onChange={(e) => setEditData({ ...editData, askForPrice: e.target.checked })}
                        className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="askForPrice" className="text-xs font-bold text-slate-700 cursor-pointer">Ask for Price (Contact Admin)</label>
                    </div>
                  </div>
                  {!editData.askForPrice && (
                    <div className="w-32">
                      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Price (₹) <span className="text-[7px] italic text-slate-400">(0 = Free)</span></label>
                      <Input
                        type="number"
                        disabled={!isEditingInfo}
                        value={editData.price}
                        onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                        className="h-9 rounded-lg border-slate-200 bg-slate-50 font-black text-xs"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2 pt-2 border-t border-slate-50">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Featured Course</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={editData.featured}
                      disabled={!isEditingInfo}
                      onChange={(e) => setEditData({ ...editData, featured: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="featured" className="text-xs font-bold text-slate-700 cursor-pointer">Show this course on Homepage</label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Tags (Comma Separated)</label>
                  {isEditingInfo ? (
                    <Input
                      value={editData.tags}
                      onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
                      placeholder="JS, React, Web Dev"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {course?.tags?.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-[9px] font-black uppercase tracking-widest border-slate-200">{tag}</Badge>
                      ))}
                      {(!course?.tags || course.tags.length === 0) && <span className="text-xs text-slate-400">None</span>}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm rounded-3xl bg-white overflow-hidden border border-slate-100">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 flex items-center justify-between">
                Identity Card
                <Badge variant="outline" className="font-bold border-slate-200 text-[10px] h-5">JPG/PNG/WEBP</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-2 space-y-4">
              <div className="aspect-video rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative group">
                {course?.thumbnail ? (
                  <img src={course.thumbnail} className="w-full h-full object-cover" alt="Thumbnail" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-300">
                    <Video className="h-10 w-10 mb-2 opacity-20" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">No Media Set</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</span>
                  {isEditingInfo ? (
                    <Input
                      value={editData.category}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      className="h-8 w-32 rounded-lg border-slate-200 bg-slate-50 text-[11px] font-bold"
                    />
                  ) : (
                    <span className="text-[11px] font-black text-slate-900 uppercase italic">{course?.category || 'General'}</span>
                  )}
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expertise Level</span>
                  {isEditingInfo ? (
                    <select
                      className="h-8 w-32 rounded-lg border-slate-200 bg-slate-50 text-[11px] font-bold outline-none"
                      value={editData.levels}
                      onChange={(e) => setEditData({ ...editData, levels: e.target.value })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  ) : (
                    <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 font-black text-[9px] uppercase tracking-widest">
                      {course?.levels || 'Beginner'}
                    </Badge>
                  )}
                </div>
                <div className="flex justify-between items-center px-1 border-t border-slate-50 pt-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visibility</span>
                  <Badge className={course?.status === 'published' ? 'bg-green-500 text-white font-black border-0 rounded-none italic' : 'bg-amber-500 text-white font-black border-0 rounded-none italic'}>
                    {course?.status?.toUpperCase() || 'DRAFT'}
                  </Badge>
                </div>
                {course?.featured && (
                  <div className="flex justify-between items-center px-1 border-t border-slate-50 pt-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Featured</span>
                    <Badge className="bg-indigo-500 text-white font-black border-0 rounded-none italic">
                      YES
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full">
              <Button
                variant="outline"
                className="w-full"
                size="xl"
              >
                {course?.status === 'published' ? 'Unpublish Course' : 'Publish Course'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px] rounded-2xl border-slate-200 p-2 shadow-2xl">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 p-3">Confirm Transition</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={`p-3 rounded-xl cursor-not-allowed opacity-50 font-bold text-xs mb-1`}
                >
                  Current Status: <span className="ml-1 uppercase">{course?.status}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handlePublishToggle}
                  className={`p-4 rounded-xl cursor-pointer font-black text-xs uppercase tracking-widest transition-all ${course?.status === 'published'
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                >
                  {course?.status === 'published' ? 'Confirm Unpublish' : 'Confirm & Publish'}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </div>
  )
}

export default CourseInfoTab
