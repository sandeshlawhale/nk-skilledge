import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Briefcase, Loader2, Plus, Trash2, Pencil } from 'lucide-react'
import { ServiceCard } from '@/components/admin/ServiceCard'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth/admin/services/')({
  component: AdminServicesIndex,
})

function AdminServicesIndex() {
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newService, setNewService] = useState({ name: '', description: '', category: 'other' })
  const navigate = useNavigate()

  const fetchServices = async () => {
    try {
      const response = await authFetch(`${API_BASE_URL}/services`)
      const data = await response.json()
      if (data.success) {
        setServices(data.data)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
      toast.error('Failed to load services')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleCreateService = async (e) => {
    e.preventDefault()
    if (!newService.name || !newService.description) {
      toast.error('Name and description are required')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await authFetch(`${API_BASE_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService)
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Service created successfully')
        setIsCreateDialogOpen(false)
        setNewService({ name: '', description: '', category: 'other' })
        // Redirect to detail page to fill more details
        navigate({ to: '/admin/services/$serviceId', params: { serviceId: data.data._id } })
      } else {
        toast.error(data.message || 'Failed to create service')
      }
    } catch (error) {
      console.error('Error creating service:', error)
      toast.error('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteService = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const response = await authFetch(`${API_BASE_URL}/services/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Service deleted')
        fetchServices()
      }
    } catch (error) {
      toast.error('Failed to delete service')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary/20" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-full px-6 mx-auto font-geist">
      <DashboardHeader
        title="Admin Services"
        subtitle="Manage and oversee the professional services offered by NK SkillEdge."
      >
        <div className="flex flex-col items-end gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size='xl' className="bg-slate-900 rounded-none h-12 px-8 font-black uppercase tracking-widest text-[10px]">
                <Plus className="mr-2 h-4 w-4" /> Add New Service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-none border-2 border-slate-900">
              <DialogHeader>
                <DialogTitle className="text-xl font-black uppercase italic tracking-tight">Create New Service</DialogTitle>
                <DialogDescription className="text-xs font-bold uppercase text-slate-400 tracking-widest">
                  Enter basic details to start. You can add images and more details later.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateService} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Service Name</Label>
                  <Input
                    id="name"
                    placeholder="E.g. Full-Stack Development"
                    className="rounded-none border-slate-200 focus:border-slate-900 transition-colors"
                    value={newService.name}
                    onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Short Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Briefly describe what this service is about..."
                    className="rounded-none border-slate-200 focus:border-slate-900 transition-colors min-h-[100px]"
                    value={newService.description}
                    onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Category</Label>
                  <Select
                    value={newService.category}
                    onValueChange={(value) => setNewService(prev => ({ ...prev, category: value }))}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="category" className="rounded-none border-slate-200 focus:border-slate-900 h-10 font-bold uppercase text-[10px] tracking-wider">
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
                <DialogFooter className="pt-4">
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 rounded-none h-12 font-black uppercase tracking-widest text-[10px]">
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                    Create Draft Service
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
          />
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-20 bg-slate-50/50 rounded-none border border-dashed border-slate-200 px-4">
          <div className="h-16 w-16 bg-white rounded-none flex items-center justify-center text-slate-200 shadow-sm mx-auto mb-6">
            <Briefcase className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">No Services Found</h3>
          <p className="text-slate-500 font-medium mt-2 italic text-sm">Start by adding your first professional service above.</p>
        </div>
      )}
    </div>
  )
}
