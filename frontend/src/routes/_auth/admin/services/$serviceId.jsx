import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useEffect, useState, useRef } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import {
  Loader2,
  ArrowLeft,
  Save,
  Plus,
  X,
  Upload,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth/admin/services/$serviceId')({
  component: AdminServiceDetail,
})

function AdminServiceDetail() {
  const { serviceId } = Route.useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [service, setService] = useState(null)

  // Local state for list inputs
  const [newTag, setNewTag] = useState('')
  const [newProvides, setNewProvides] = useState('')
  const [newFeature, setNewFeature] = useState('')
  const [newTech, setNewTech] = useState('')
  const [newStep, setNewStep] = useState('')
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' })

  const logoRef = useRef(null)
  const coverRef = useRef(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)

  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [pendingStatus, setPendingStatus] = useState(null)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await authFetch(`${API_BASE_URL}/services/${serviceId}`)
        const data = await response.json()
        if (data.success) {
          setService(data.data)
        } else {
          toast.error('Service not found')
          navigate({ to: '/admin/services' })
        }
      } catch (error) {
        console.error('Error fetching service:', error)
        toast.error('Failed to load service')
      } finally {
        setIsLoading(false)
      }
    }
    fetchService()
  }, [serviceId, navigate])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const formData = new FormData()

      // Append basic fields
      formData.append('name', service.name)
      formData.append('description', service.description)
      formData.append('price', service.price)
      formData.append('category', service.category || '')
      formData.append('isActive', service.isActive)
      formData.append('isFeatured', service.isFeatured)

      // Append arrays
      service.tags.forEach(t => formData.append('tags[]', t))
      service.whatItProvides.forEach(p => formData.append('whatItProvides[]', p))
      service.features.forEach(f => formData.append('features[]', f))
      service.technologies.forEach(t => formData.append('technologies[]', t))
      service.process.forEach(p => formData.append('process[]', p))

      // Append FAQ as JSON string
      formData.append('faq', JSON.stringify(service.faq))

      // Append files
      if (logoRef.current?.files[0]) {
        formData.append('logo', logoRef.current.files[0])
      }
      if (coverRef.current?.files[0]) {
        formData.append('coverImage', coverRef.current.files[0])
      }

      const response = await authFetch(`${API_BASE_URL}/services/${serviceId}`, {
        method: 'PUT',
        body: formData, // authFetch handles multipart/form-data when body is FormData
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Service updated successfully')
        setService(data.data)
        setLogoPreview(null)
        setCoverPreview(null)
      } else {
        toast.error(data.message || 'Update failed')
      }
    } catch (error) {
      console.error('Update error:', error)
      toast.error('Failed to save changes')
    } finally {
      setIsSaving(false)
    }
  }

  const addItem = (field, value, setInput) => {
    if (!value.trim()) return
    setService(prev => ({
      ...prev,
      [field]: [...prev[field], value.trim()]
    }))
    setInput('')
  }

  const removeItem = (field, index) => {
    setService(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const addFAQ = () => {
    if (!newFAQ.question.trim() || !newFAQ.answer.trim()) return
    setService(prev => ({
      ...prev,
      faq: [...prev.faq, newFAQ]
    }))
    setNewFAQ({ question: '', answer: '' })
  }

  const removeFAQ = (index) => {
    setService(prev => ({
      ...prev,
      faq: prev.faq.filter((_, i) => i !== index)
    }))
  }

  const handleDeleteService = async () => {
    try {
      const response = await authFetch(`${API_BASE_URL}/services/${serviceId}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Service deleted successfully')
        navigate({ to: '/admin/services' })
      } else {
        toast.error(data.message || 'Deletion failed')
      }
    } catch (error) {
      toast.error('Failed to delete service')
    } finally {
      setIsDeleteDialogOpen(false)
    }
  }

  const handleStatusChange = (newStatus) => {
    const isActive = newStatus === 'active'
    if (isActive === service.isActive) return

    setPendingStatus(isActive)
    setIsStatusDialogOpen(true)
  }

  const confirmStatusChange = () => {
    setService(prev => ({ ...prev, isActive: pendingStatus }))
    setIsStatusDialogOpen(false)
    toast.info(`Status will be saved as ${pendingStatus ? 'Active' : 'Draft'} when you save changes.`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary/20" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-full px-6 mx-auto font-geist pb-20">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="rounded-none gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link to="/admin/services" className='flex items-center gap-1'>
            <ArrowLeft className="h-3 w-3" /> Back to List
          </Link>
        </Button>
        <div className="flex gap-4">
          <Button
            onClick={handleUpdate}
            disabled={isSaving}
            className="rounded-none bg-slate-900 h-10 px-8 text-xs font-bold uppercase tracking-widest"
          >
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Service
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info */}
          <Card className="rounded-none border-2 border-slate-900 shadow-none overflow-hidden">
            <CardHeader className="bg-slate-900 text-white py-4">
              <CardTitle className="text-sm font-black uppercase italic tracking-widest">Base Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Service Name</Label>
                <Input
                  value={service.name}
                  onChange={(e) => setService(p => ({ ...p, name: e.target.value }))}
                  className="rounded-none border-slate-200 focus:border-slate-900 font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Description</Label>
                <Textarea
                  value={service.description}
                  onChange={(e) => setService(p => ({ ...p, description: e.target.value }))}
                  className="rounded-none border-slate-200 focus:border-slate-900 min-h-[120px] leading-relaxed"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Price (₹)</Label>
                  <Input
                    type="number"
                    value={service.price}
                    onChange={(e) => setService(p => ({ ...p, price: e.target.value }))}
                    className="rounded-none border-slate-200 focus:border-slate-900 font-black"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Category</Label>
                  <Select
                    value={service.category || 'other'}
                    onValueChange={(val) => setService(p => ({ ...p, category: val }))}
                  >
                    <SelectTrigger className="rounded-none border-slate-200 focus:border-slate-900 font-bold h-10 uppercase text-[10px] tracking-wider">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-2 border-slate-900">
                      <SelectItem value="development" className="text-[10px] font-bold uppercase tracking-wider">Development</SelectItem>
                      <SelectItem value="design" className="text-[10px] font-bold uppercase tracking-wider">Design</SelectItem>
                      <SelectItem value="digital_marketing" className="text-[10px] font-bold uppercase tracking-wider">Digital Marketing</SelectItem>
                      <SelectItem value="other" className="text-[10px] font-bold uppercase tracking-wider">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* List Sections */}
          {[
            { label: 'What this service provides', field: 'whatItProvides', input: newProvides, setInput: setNewProvides, icon: CheckCircle2 },
            { label: 'Key Features', field: 'features', input: newFeature, setInput: setNewFeature, icon: Plus },
            { label: 'Technologies Used', field: 'technologies', input: newTech, setInput: setNewTech, icon: Plus, isGrid: true },
            { label: 'Our Process Steps', field: 'process', input: newStep, setInput: setNewStep, icon: Plus },
          ].map((sec) => (
            <Card key={sec.field} className="p-6 rounded-none border border-slate-200 shadow-none gap-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-900">{sec.label}</CardTitle>
              </CardHeader>
              <CardContent className="">
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder={sec.isGrid && service[sec.field].length >= 15 ? "Limit of 15 reached" : "Add new item..."}
                    value={sec.input}
                    onChange={(e) => sec.setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (sec.isGrid && service[sec.field].length >= 15) {
                          toast.error('Limit of 15 technologies reached')
                          return
                        }
                        addItem(sec.field, sec.input, sec.setInput)
                      }
                    }}
                    disabled={sec.isGrid && service[sec.field].length >= 15}
                    className="rounded-none border-slate-200"
                  />
                  <Button
                    variant="outline"
                    className="rounded-none border-slate-900 border-2 max-h-10 max-w-10 px-4"
                    onClick={() => {
                      if (sec.isGrid && service[sec.field].length >= 15) {
                        toast.error('Limit of 15 technologies reached')
                        return
                      }
                      addItem(sec.field, sec.input, sec.setInput)
                    }}
                    disabled={sec.isGrid && service[sec.field].length >= 15}
                  >
                    <sec.icon className="h-4 w-4" />
                  </Button>
                </div>

                {sec.isGrid ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {service[sec.field].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 border border-slate-100 group">
                        <span className="text-[11px] font-bold uppercase tracking-tight truncate mr-2">{item}</span>
                        <button onClick={() => removeItem(sec.field, idx)} className="text-slate-300 hover:text-red-600 transition-colors cursor-pointer">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {service[sec.field].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 border border-slate-100 group">
                        <div className="flex items-center gap-3">
                          {sec.field == 'process' ?
                            <span className="text-[11px] font-bold uppercase tracking-tight">{idx + 1}</span>
                            : <div className="h-1.5 w-1.5 bg-slate-900 rounded-full" />}
                          <span className="text-[11px] font-bold uppercase tracking-tight">{item}</span>
                        </div>
                        <button onClick={() => removeItem(sec.field, idx)} className="cursor-pointer text-slate-300 hover:text-red-600 transition-colors">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {service[sec.field].length === 0 && <span className="text-[10px] uppercase font-bold text-slate-300 italic">No items added yet.</span>}
              </CardContent>
            </Card>
          ))}

          {/* FAQ Section */}
          <Card className="rounded-none border border-slate-200 shadow-none">
            <CardHeader className="py-3 px-6 border-b border-slate-100">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-900">FAQ Section</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4 bg-slate-50 p-4 border border-slate-100">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-slate-500">Question</Label>
                  <Input
                    placeholder="e.g. How long does it take?"
                    value={newFAQ.question}
                    onChange={(e) => setNewFAQ(p => ({ ...p, question: e.target.value }))}
                    className="rounded-none bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-slate-500">Answer</Label>
                  <Textarea
                    placeholder="Provide a detailed answer..."
                    value={newFAQ.answer}
                    onChange={(e) => setNewFAQ(p => ({ ...p, answer: e.target.value }))}
                    className="rounded-none bg-white min-h-[80px]"
                  />
                </div>
                <Button onClick={addFAQ} className="w-full rounded-none bg-primary text-[10px] font-black uppercase tracking-widest h-10">
                  Add FAQ Item
                </Button>
              </div>

              <div className="space-y-3">
                {service.faq.map((item, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 relative group">
                    <button
                      onClick={() => removeFAQ(idx)}
                      className="cursor-pointer absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-tight italic">Q: {item.question}</div>
                    <div className="text-xs text-slate-500 leading-relaxed font-medium">A: {item.answer}</div>
                  </div>
                ))}
                {service.faq.length === 0 && <div className="text-center py-4 text-slate-300 font-bold uppercase text-[10px] italic">No FAQs added yet.</div>}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Cover Image Upload (Now on Top) */}
          <Card className="rounded-none border-2 border-slate-900 shadow-none overflow-hidden">
            <CardHeader className="bg-slate-900 text-white py-3 px-6 flex flex-row items-center justify-between">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest">Cover Image</CardTitle>
              <ImageIcon className="h-4 w-4 opacity-50" />
            </CardHeader>
            <CardContent className="p-6">
              <div
                onClick={() => coverRef.current.click()}
                className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-slate-100 transition-all group relative overflow-hidden"
              >
                {coverPreview || service.coverImage ? (
                  <>
                    <img src={coverPreview || service.coverImage} alt="Cover" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/10">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-900 bg-white px-3 py-1.5 shadow-xl">Change Cover</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-slate-300 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Cover</span>
                  </>
                )}
                <input
                  type="file"
                  ref={coverRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setCoverPreview(URL.createObjectURL(e.target.files[0]))
                    }
                  }}
                />
              </div>

              {(coverPreview || service.coverImage) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 rounded-none border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 text-[10px] font-black uppercase tracking-widest h-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to remove the cover image?')) {
                      setService(p => ({ ...p, coverImage: null }));
                      setCoverPreview(null);
                      if (coverRef.current) coverRef.current.value = '';
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Remove Image
                </Button>
              )}

              <p className="text-[9px] text-slate-400 mt-4 font-bold uppercase tracking-widest leading-relaxed">Display background for the service page. Ratio 16:9 recommended.</p>
            </CardContent>
          </Card>

          {/* Status & Settings (Now below Cover Image) */}
          <Card className="rounded-none border border-slate-200 shadow-none">
            <CardHeader className="py-3 px-6 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-900">Visibility & Tags</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Active Toggle with Select and Dialog */}
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Service Status</Label>
                <Select
                  value={service.isActive ? 'active' : 'draft'}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-full rounded-none h-12 border-2 border-slate-900 font-bold uppercase text-[11px] tracking-wider">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-slate-900">
                    <SelectItem value="active" className="text-[11px] font-bold uppercase tracking-wider">Active</SelectItem>
                    <SelectItem value="draft" className="text-[11px] font-bold uppercase tracking-wider">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <div className="space-y-1.5 pt-1 px-1">
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-1 shrink-0" />
                    <p className="text-[10px] font-medium text-slate-500 leading-tight">
                      <span className="font-black text-slate-900 uppercase italic">Active:</span> Visible & live on the public website for all users.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-1 shrink-0" />
                    <p className="text-[10px] font-medium text-slate-500 leading-tight">
                      <span className="font-black text-slate-900 uppercase italic">Draft:</span> Private catalog item. Hidden from external users.
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-100" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Featured Service</span>
                  <Button
                    variant="outline"
                    onClick={() => setService(p => ({ ...p, isFeatured: !p.isFeatured }))}
                    className={`h-8 rounded-none px-4 text-[9px] font-black uppercase tracking-widest transition-all ${service.isFeatured ? 'bg-primary text-white border-primary border-2' : 'border-slate-200'}`}
                  >
                    {service.isFeatured ? 'YES' : 'NO'}
                  </Button>
                </div>
                <div className="px-1">
                  <p className="text-[10px] font-medium text-slate-500 leading-tight">
                    <span className="font-black text-slate-900 uppercase italic">{service.isFeatured ? 'YES:' : 'NO:'}</span> {service.isFeatured ? 'Highlighted prominently on the home page spotlight section.' : 'Visible only in the main services catalog.'}
                  </p>
                </div>
              </div>

              <Separator className="bg-slate-100" />

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Display Icon (Homepage)</Label>
                <Select
                  value={service.icon || 'globe'}
                  onValueChange={(val) => setService(p => ({ ...p, icon: val }))}
                >
                  <SelectTrigger className="w-full rounded-none h-12 border-2 border-slate-900 font-bold uppercase text-[11px] tracking-wider">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-slate-900">
                    <SelectItem value="globe" className="text-[11px] font-bold uppercase tracking-wider">Default (Globe)</SelectItem>
                    <SelectItem value="mobile" className="text-[11px] font-bold uppercase tracking-wider">Mobile App</SelectItem>
                    <SelectItem value="megaphone" className="text-[11px] font-bold uppercase tracking-wider">Marketing</SelectItem>
                    <SelectItem value="code" className="text-[11px] font-bold uppercase tracking-wider">Development</SelectItem>
                    <SelectItem value="brain" className="text-[11px] font-bold uppercase tracking-wider">AI / Brain</SelectItem>
                    <SelectItem value="play" className="text-[11px] font-bold uppercase tracking-wider">Tutorial / Play</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[9px] text-slate-400 px-1 font-bold uppercase tracking-widest leading-relaxed">Choose the icon shown on the homepage service cards.</p>
              </div>

              <Separator className="bg-slate-100" />

              <div className="space-y-4 pt-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Service Tags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addItem('tags', newTag, setNewTag)}
                    className="rounded-none h-10 text-[11px] font-bold"
                  />
                  <Button
                    variant="outline"
                    className="rounded-none border-slate-900 border-2 h-10 w-10 p-0"
                    onClick={() => addItem('tags', newTag, setNewTag)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, idx) => (
                    <Badge key={idx} className="rounded-none bg-slate-900 text-white text-[8px] h-6 font-black uppercase tracking-tighter px-2 flex items-center gap-1.5">
                      {tag}
                      <button onClick={() => removeItem('tags', idx)} className="hover:text-red-300 transition-colors">
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delete Action */}
          <div className="pt-4">
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <Button
                variant="outline"
                className="w-full rounded-none border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 text-[10px] font-black uppercase tracking-widest h-12"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete Service Permanently
              </Button>
              <DialogContent className="rounded-none border-2 border-slate-900">
                <DialogHeader>
                  <DialogTitle className="text-xl font-black uppercase italic tracking-tight">Confirm Deletion</DialogTitle>
                  <DialogDescription className="text-sm font-medium text-slate-500 pt-2">
                    Are you sure you want to delete <span className="font-black text-slate-900 italic">"{service.name}"</span>?
                    This action is irreversible and will remove all associated data including images and settings.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2 sm:gap-0">
                  <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} className="rounded-none font-bold uppercase text-[10px] tracking-widest">Cancel</Button>
                  <Button onClick={handleDeleteService} className="rounded-none bg-red-600 hover:bg-red-700 text-white font-black uppercase text-[10px] tracking-widest px-8 h-10">Delete Forever</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Status Confirmation Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="rounded-none border-2 border-slate-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase italic tracking-tight">Update Visibility</DialogTitle>
            <DialogDescription className="text-sm font-medium text-slate-500 pt-2">
              You are about to change the status to <span className="font-black text-slate-900 uppercase italic">{pendingStatus ? 'Active' : 'Draft'}</span>.
              {pendingStatus
                ? ' This will make the service live and visible to all users on the website.'
                : ' This will hide the service from all public galleries.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsStatusDialogOpen(false)} className="rounded-none font-bold uppercase text-[10px] tracking-widest">No, Keep current</Button>
            <Button onClick={confirmStatusChange} className="rounded-none bg-slate-900 font-black uppercase text-[10px] tracking-widest px-8 h-10">Yes, Change Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
