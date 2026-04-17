import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, PlusCircle, Search, Edit, Trash2, Upload, Image, BookOpen, Users, X, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TrainingCard } from '@/components/shared/TrainingCard'
import { PageHeader } from '@/components/shared/PageHeader'

export const Route = createFileRoute('/_auth/admin/training/')({
  component: AdminTraining,
})

function AdminTraining() {
  const [trainingList, setTrainingList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: [''],
    price: '',
    category: '',
    levels: 'Beginner',
    instructorName: '',
    duration: '',
    tags: '',
    whatYouWillLearn: [''],
    requirements: ['']
  })
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const fileInputRef = useRef(null)

  const navigate = useNavigate()

  const fetchCourses = async () => {
    try {
      const response = await authFetch(`${API_BASE_URL}/courses?status=all`)
      const data = await response.json()
      if (data.success) {
        setTrainingList(data.data)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const filteredCourses = trainingList.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setThumbnailFile(file)
    setThumbnailPreview(URL.createObjectURL(file))
  }

  const handleCreateCourse = async (e) => {
    e.preventDefault()
    setCreateError('')

    if (!newCourse.title.trim() || newCourse.description.every(d => !d.trim())) {
      setCreateError('Title and description are required.')
      return
    }
    if (!thumbnailFile) {
      setCreateError('Please select a thumbnail image.')
      return
    }

    setIsCreating(true)
    try {
      const formData = new FormData()
      formData.append('title', newCourse.title)

      const descParas = newCourse.description.map(t => t.trim()).filter(t => t)
      descParas.forEach(para => formData.append('description[]', para))

      formData.append('price', newCourse.price || '0')
      formData.append('category', newCourse.category)
      formData.append('levels', newCourse.levels)
      formData.append('instructorName', newCourse.instructorName)
      formData.append('duration', newCourse.duration)

      const tagsArray = newCourse.tags.split(',').map(t => t.trim()).filter(t => t)
      tagsArray.forEach(tag => formData.append('tags[]', tag))

      const goals = newCourse.whatYouWillLearn.map(t => t.trim()).filter(t => t)
      goals.forEach(goal => formData.append('whatYouWillLearn[]', goal))

      const reqs = newCourse.requirements.map(t => t.trim()).filter(t => t)
      reqs.forEach(req => formData.append('requirements[]', req))

      formData.append('thumbnail', thumbnailFile)

      const res = await authFetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        // No Content-Type header — browser sets multipart boundary automatically
        body: formData,
      })
      const data = await res.json()

      if (data.success) {
        setShowCreateModal(false)
        resetForm()
        navigate({ to: `/admin/training/manage/${data.data._id}` })
      } else {
        setCreateError(data.message || 'Failed to create course.')
      }
    } catch (err) {
      setCreateError('Something went wrong. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteCourse = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return
    try {
      await authFetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: 'DELETE',
      })
      setTrainingList(prev => prev.filter(c => c._id !== courseId))
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  const resetForm = () => {
    setNewCourse({
      title: '',
      description: [''],
      price: '',
      category: '',
      levels: 'Beginner',
      instructorName: '',
      duration: '',
      tags: '',
      whatYouWillLearn: [''],
      requirements: ['']
    })
    setThumbnailFile(null)
    setThumbnailPreview(null)
    setCreateError('')
  }


  const handleListUpdate = (field, index, value) => {
    setNewCourse(prev => {
      const newList = [...prev[field]]
      newList[index] = value
      return { ...prev, [field]: newList }
    })
  }

  const handleAddListItem = (field) => {
    setNewCourse(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const handleRemoveListItem = (field, index) => {
    if (newCourse[field].length <= 1) return;
    setNewCourse(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const openModal = () => {
    resetForm()
    setShowCreateModal(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-geist">
      <PageHeader
        title="Training Management"
        subtitle="Create, edit, and organize your educational content."
      >
        <Button onClick={openModal} size='xl' variant='outline' className="">
          <Plus className="mr-2 h-4 w-4" /> Create New Training
        </Button>
      </PageHeader>

      <div className="bg-white p-3 rounded-none border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center px-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <Input
            className="pl-9 h-9 rounded-none border-slate-200 focus:ring-slate-900 shadow-none text-xs font-bold"
            placeholder="Search curricula..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Badge variant="outline" className="h-9 px-3 rounded-none border-slate-200 text-slate-500 font-black uppercase tracking-widest text-[9px]">
            {trainingList.length} Units
          </Badge>
          <Badge variant="outline" className="h-9 px-3 rounded-none border-slate-200 text-green-600 font-black uppercase tracking-widest text-[9px]">
            {trainingList.filter(c => c.status === 'published').length} Active
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <TrainingCard
            key={course._id}
            training={course}
            linkTo={`/admin/training/manage/${course._id}`}
            metadata={course.status === 'published' ? 'Active' : 'Draft'}
            extraActions={
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteCourse(course._id);
                }}
                className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 mt-1"
              >
                <Trash2 className="h-3 w-3" /> Remove Unit
              </button>
            }
          />
        ))}

        {/* Dashed "New Course" card */}
        <div
          onClick={openModal}
          className="border border-dashed border-slate-200 bg-slate-50/30 hover:bg-white hover:border-slate-900 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center aspect-video cursor-pointer group rounded-none"
        >
          <div className="h-10 w-10 bg-white flex items-center justify-center text-slate-300 group-hover:text-slate-900 transition-all duration-300 rounded-none border border-slate-100 group-hover:border-slate-900">
            <Plus className="h-5 w-5" />
          </div>
          <h3 className="font-black text-xs text-slate-900 mt-4 uppercase tracking-widest leading-none">Initialize Unit</h3>
        </div>
      </div>

      {/* Create Course Modal — horizontal layout */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-3xl border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">

            {/* Header */}
            <div className="bg-slate-900 text-white px-8 py-5 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black uppercase italic tracking-tight">Create New Training</h2>
                <p className="text-slate-400 text-xs font-medium mt-0.5">A draft will be created — you can publish later.</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleCreateCourse}>
              {/* Two-column body */}
              <div className="flex">

                {/* Left — Thumbnail */}
                <div className="w-64 shrink-0 p-6 border-r border-slate-100 bg-slate-50/50 flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Thumbnail</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-white hover:border-primary/50 hover:bg-slate-50 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden relative group"
                  >
                    {thumbnailPreview ? (
                      <>
                        <img src={thumbnailPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-bold uppercase tracking-wide">Change</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Image className="h-7 w-7 text-slate-300 mb-1.5" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Click to upload</span>
                        <span className="text-[10px] text-slate-300 mt-0.5">JPG, PNG, WEBP</span>
                      </>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    This image will be the training cover on the student portal.
                  </p>
                </div>

                {/* Right — Form fields */}
                <div className="flex-1 p-6 flex flex-col max-h-[70vh]">
                  <div className="overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Training Title</label>
                      <Input
                        required
                        placeholder="e.g. Advanced JavaScript Mastery"
                        className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold text-sm"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Description (Multi-Paragraph)</label>
                      <div className="space-y-2">
                        {newCourse.description.map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <Textarea
                              value={item}
                              onChange={(e) => handleListUpdate('description', index, e.target.value)}
                              className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white min-h-[60px] font-medium resize-none text-sm"
                              placeholder={`Paragraph #${index + 1}`}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveListItem('description', index)}
                              className="h-10 w-10 shrink-0 text-slate-300 hover:text-red-500 mt-2"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleAddListItem('description')}
                          className="w-full h-10 rounded-xl border-dashed border-slate-200 text-slate-400 hover:text-primary text-[10px] font-black uppercase tracking-widest bg-slate-50/10"
                        >
                          <PlusCircle className="h-3 w-3 mr-2" /> Add Paragraph
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category</label>
                        <Input
                          placeholder="e.g. Development"
                          className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold text-xs"
                          value={newCourse.category}
                          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Level</label>
                        <select
                          className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                          value={newCourse.levels}
                          onChange={(e) => setNewCourse({ ...newCourse, levels: e.target.value })}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Instructor Name</label>
                        <Input
                          placeholder="e.g. Narendra Modi"
                          className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold text-xs"
                          value={newCourse.instructorName}
                          onChange={(e) => setNewCourse({ ...newCourse, instructorName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Duration</label>
                        <Input
                          placeholder="e.g. 10 Hours"
                          className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold text-xs"
                          value={newCourse.duration}
                          onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Price (₹)</label>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold text-xs"
                          value={newCourse.price}
                          onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tags (Separated by ",")</label>
                        <Input
                          placeholder="React, Nextjs..."
                          className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold text-xs"
                          value={newCourse.tags}
                          onChange={(e) => setNewCourse({ ...newCourse, tags: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">What You Will Learn</label>
                      <div className="space-y-2">
                        {newCourse.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={item}
                              onChange={(e) => handleListUpdate('whatYouWillLearn', index, e.target.value)}
                              className="h-10 rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-xs font-medium"
                              placeholder={`Objective #${index + 1}`}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveListItem('whatYouWillLearn', index)}
                              className="h-10 w-10 shrink-0 text-slate-300 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleAddListItem('whatYouWillLearn')}
                          className="w-full h-10 rounded-xl border-dashed border-slate-200 text-slate-400 hover:text-primary text-[10px] font-black uppercase tracking-widest bg-slate-50/10"
                        >
                          <PlusCircle className="h-3 w-3 mr-2" /> Add Objective
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Requirements</label>
                      <div className="space-y-2">
                        {newCourse.requirements.map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={item}
                              onChange={(e) => handleListUpdate('requirements', index, e.target.value)}
                              className="h-10 rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-xs font-medium"
                              placeholder={`Requirement #${index + 1}`}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveListItem('requirements', index)}
                              className="h-10 w-10 shrink-0 text-slate-300 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleAddListItem('requirements')}
                          className="w-full h-10 rounded-xl border-dashed border-slate-200 text-slate-400 hover:text-primary text-[10px] font-black uppercase tracking-widest bg-slate-50/10"
                        >
                          <PlusCircle className="h-3 w-3 mr-2" /> Add Requirement
                        </Button>
                      </div>
                    </div>

                    {createError && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 font-medium">
                        {createError}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 bg-white mt-auto border-t border-slate-100">
                    <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1 rounded-xl h-11 font-bold border-slate-200 uppercase tracking-tight">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isCreating} className="flex-1 bg-slate-900 hover:bg-primary rounded-xl h-11 font-black uppercase tracking-tight shadow-lg">
                      {isCreating ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</>
                      ) : (
                        <><Upload className="mr-2 h-4 w-4" /> Create Draft</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}

