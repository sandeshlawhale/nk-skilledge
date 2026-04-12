import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL, authFetch } from '@/utils/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, Users, X, Image as ImageIcon } from 'lucide-react'
import { MemberCard } from '@/components/admin/MemberCard'
import { PageHeader } from '@/components/shared/PageHeader'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from 'sonner'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const Route = createFileRoute('/_auth/admin/members/')({
  component: AdminMembersPage,
})

function AdminMembersPage() {
  const [members, setMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [formData, setFormData] = useState({
    prefix: '',
    name: '',
    role: '',
    bio: '',
    skills: '',
    exp: '',
    isActive: true,
    isFeatured: false,
    linkedin: '',
    github: '',
    profileImage: null
  })

  const fetchMembers = async () => {
    try {
      const response = await authFetch(`${API_BASE_URL}/members`)
      const data = await response.json()
      if (data.success) {
        setMembers(data.data)
      }
    } catch (error) {
      console.error('Error fetching members:', error)
      toast.error('Failed to load team members')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleOpenSheet = (member = null) => {
    if (member) {
      setEditingMember(member)
      setFormData({
        prefix: member.prefix || '',
        name: member.name || '',
        role: member.role || '',
        bio: member.bio || '',
        skills: member.skills?.join(', ') || '',
        exp: member.exp || '',
        isActive: member.isActive ?? true,
        isFeatured: member.isFeatured ?? false,
        linkedin: member.socialLinks?.linkedin || '',
        github: member.socialLinks?.github || '',
        profileImage: null
      })
      setImagePreview(member.profileImage?.url || null)
    } else {
      setEditingMember(null)
      setFormData({
        prefix: '',
        name: '',
        role: '',
        bio: '',
        skills: '',
        exp: '',
        isActive: true,
        isFeatured: false,
        linkedin: '',
        github: '',
        profileImage: null
      })
      setImagePreview(null)
    }
    setIsSheetOpen(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.role) {
      toast.error('Name and role are required')
      return
    }

    if (!editingMember && !formData.profileImage) {
      toast.error('Profile image is required')
      return
    }

    setIsSubmitting(true)
    try {
      const data = new FormData()
      data.append('prefix', formData.prefix)
      data.append('name', formData.name)
      data.append('role', formData.role)
      data.append('bio', formData.bio)
      data.append('exp', formData.exp)
      data.append('isActive', formData.isActive)
      data.append('isFeatured', formData.isFeatured)

      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      skillsArray.forEach(skill => data.append('skills[]', skill))

      const socialLinks = {
        linkedin: formData.linkedin,
        github: formData.github
      }
      data.append('socialLinks', JSON.stringify(socialLinks))

      if (formData.profileImage) {
        data.append('profileImage', formData.profileImage)
      }

      const url = editingMember
        ? `${API_BASE_URL}/members/${editingMember._id}`
        : `${API_BASE_URL}/members`

      const method = editingMember ? 'PUT' : 'POST'

      const response = await authFetch(url, {
        method,
        body: data
      })

      const result = await response.json()
      if (result.success) {
        toast.success(editingMember ? 'Member updated' : 'Member added')
        setIsSheetOpen(false)
        fetchMembers()
      } else {
        toast.error(result.message || 'Action failed')
      }
    } catch (error) {
      console.error('Error saving member:', error)
      toast.error('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return

    try {
      const response = await authFetch(`${API_BASE_URL}/members/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Member removed')
        fetchMembers()
      }
    } catch (error) {
      toast.error('Failed to delete member')
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
      <PageHeader
        title="Team Directory"
        subtitle="Manage your powerhouse - Add, edit or remove team members."
      >
        <Button
          size='xl'
          onClick={() => handleOpenSheet()}
          className="bg-slate-900 rounded-none h-12 px-8 font-black uppercase tracking-widest text-[10px]"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member) => (
          <MemberCard
            key={member._id}
            member={member}
            onEdit={handleOpenSheet}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-20 bg-slate-50/50 rounded-none border border-dashed border-slate-200 px-4">
          <div className="h-16 w-16 bg-white rounded-none flex items-center justify-center text-slate-200 shadow-sm mx-auto mb-6">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Team is Empty</h3>
          <p className="text-slate-500 font-medium mt-2 italic text-sm">Start by adding your first team member.</p>
        </div>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl p-0 border-l-2 border-slate-900">
          <ScrollArea className="h-full w-full">
            <div className="p-8">
              <SheetHeader className="mb-8">
                <SheetTitle className="text-2xl font-black uppercase italic tracking-tight">
                  {editingMember ? 'Edit Team Member' : 'Add New Powerhouse'}
                </SheetTitle>
                <SheetDescription className="text-xs font-bold uppercase text-slate-400 tracking-widest">
                  Fill in the details to showcase your team member on the website.
                </SheetDescription>
              </SheetHeader>

              <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Prefix</Label>
                        <Select
                          value={formData.prefix}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, prefix: value }))}
                        >
                          <SelectTrigger className="rounded-none border-slate-200 focus:border-slate-900 h-12">
                            <SelectValue placeholder="Prefix" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none border-2 border-slate-900">
                            <SelectItem value="Mr">Mr.</SelectItem>
                            <SelectItem value="Ms">Ms.</SelectItem>
                            <SelectItem value="Mrs">Mrs.</SelectItem>
                            <SelectItem value="Dr">Dr.</SelectItem>
                            <SelectItem value="Prof">Prof.</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-3 space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Name</Label>
                        <Input
                          placeholder="E.g. John Doe"
                          className="rounded-none border-slate-200 focus:border-slate-900 h-12"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Role / Designation</Label>
                      <Input
                        placeholder="E.g. Lead Web Developer"
                        className="rounded-none border-slate-200 focus:border-slate-900 h-12"
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="w-40 space-y-2 shrink-0">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Profile Photo</Label>
                    <div
                      className="relative aspect-[4/5] border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center cursor-pointer hover:border-slate-400 transition-colors overflow-hidden group"
                      onClick={() => document.getElementById('photo-upload').click()}
                    >
                      {imagePreview ? (
                        <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-slate-200" />
                      )}
                      <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="h-6 w-6 text-white mb-1" />
                        <p className="text-[8px] font-black text-white uppercase tracking-widest">Upload Image</p>
                      </div>
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Biography / Short Intro</Label>
                  <Textarea
                    placeholder="Briefly describe their expertise and contribution..."
                    className="rounded-none border-slate-200 focus:border-slate-900 min-h-[120px]"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Skills (Comma separated)</Label>
                    <Input
                      placeholder="React, Node.js, Design..."
                      className="rounded-none border-slate-200 focus:border-slate-900 h-12"
                      value={formData.skills}
                      onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Experience / Info</Label>
                    <Input
                      placeholder="E.g. 5+ Years"
                      className="rounded-none border-slate-200 focus:border-slate-900 h-12"
                      value={formData.exp}
                      onChange={(e) => setFormData(prev => ({ ...prev, exp: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">LinkedIn Profile URL</Label>
                    <Input
                      placeholder="https://linkedin.com/in/..."
                      className="rounded-none border-slate-200 focus:border-slate-900 h-12"
                      value={formData.linkedin}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">GitHub Profile URL</Label>
                    <Input
                      placeholder="https://github.com/..."
                      className="rounded-none border-slate-200 focus:border-slate-900 h-12"
                      value={formData.github}
                      onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex gap-10 py-4 border-y border-slate-100">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="isActive"
                      className="rounded-none border-2 border-slate-900 data-[state=checked]:bg-slate-900"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                    />
                    <Label htmlFor="isActive" className="text-[11px] font-black uppercase tracking-widest text-slate-600 cursor-pointer">Active Member</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="isFeatured"
                      className="rounded-none border-2 border-slate-900 data-[state=checked]:bg-slate-900"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                    />
                    <Label htmlFor="isFeatured" className="text-[11px] font-black uppercase tracking-widest text-slate-600 cursor-pointer">Featured (Top Section)</Label>
                  </div>
                </div>
              </form>
              <Button
                form="member-form"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-none h-16 font-black uppercase tracking-[0.2em] text-sm shadow-[8px_8px_0px_0px_rgba(15,23,42,0.1)] active:shadow-none transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-3" /> Processing...
                  </>
                ) : editingMember ? 'Update Profile' : 'Add to Directory'}
              </Button>
            </div>
          </ScrollArea>

          {/* <div className="absolute bottom-0 left-0 right-0 p-8 bg-white border-t-2 border-slate-900">
            <SheetFooter>
              
            </SheetFooter>
          </div> */}
        </SheetContent>
      </Sheet>
    </div>
  )
}
