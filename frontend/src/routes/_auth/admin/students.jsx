import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/utils/api'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Search, UserPlus, Mail, Calendar, BookOpen, ChevronRight, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'

export const Route = createFileRoute('/_auth/admin/students')({
  component: AdminStudents,
})

function AdminStudents() {
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState('')
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/users`),
          fetch(`${API_BASE_URL}/courses`)
        ])
        const usersData = await usersRes.json()
        const coursesData = await coursesRes.json()

        if (usersData.success) setUsers(usersData.data)
        if (coursesData.success) setCourses(coursesData.data)
      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleEnroll = async () => {
    if (!selectedUser || !selectedCourse) return

    try {
      const response = await fetch(`${API_BASE_URL}/enrollments/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser._id, courseId: selectedCourse })
      })
      const data = await response.json()
      if (data.success) {
        // Success feedback
        setIsEnrollDialogOpen(false)
        setSelectedUser(null)
        setSelectedCourse('')
        // Optionally refresh user data to show updated enrollment count
      }
    } catch (error) {
      console.error('Error enrolling user:', error)
    }
  }

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-geist">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Management</h1>
          <p className="text-slate-500 mt-1 italic">View all registered users and manage their course access.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold h-11 px-6 text-slate-600">
             Export Data
          </Button>
          <Button className="bg-slate-900 hover:bg-primary rounded-xl font-bold h-11 px-6 shadow-lg shadow-indigo-100">
             <UserPlus className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/30">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              className="pl-10 h-10 rounded-xl border-slate-200 shadow-none focus:ring-primary" 
              placeholder="Search by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Badge variant="outline" className="h-10 px-4 rounded-xl border-slate-200 text-slate-500 font-bold bg-white cursor-pointer hover:bg-slate-50 uppercase tracking-tight">
               Role: All
            </Badge>
            <Badge variant="outline" className="h-10 px-4 rounded-xl border-slate-200 text-slate-500 font-bold bg-white cursor-pointer hover:bg-slate-50 uppercase tracking-tight">
               Sort: Recent
            </Badge>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="font-bold text-slate-700 h-14 px-6 uppercase tracking-wider text-[10px]">User Profile</TableHead>
                <TableHead className="font-bold text-slate-700 h-14 px-6 uppercase tracking-wider text-[10px]">Access Level</TableHead>
                <TableHead className="font-bold text-slate-700 h-14 px-6 uppercase tracking-wider text-[10px]">Activity</TableHead>
                <TableHead className="font-bold text-slate-700 h-14 px-6 uppercase tracking-wider text-[10px]">Joined</TableHead>
                <TableHead className="w-[100px] h-14 px-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id} className="group hover:bg-slate-50/50 transition-colors border-slate-50">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-4">
                       <Avatar className="h-10 w-10 border-2 border-slate-100 group-hover:border-primary/20 transition-colors">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-primary/5 text-primary font-bold">{user.fullName[0]}</AvatarFallback>
                       </Avatar>
                       <div className="flex flex-col">
                          <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">{user.fullName}</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                             <Mail className="h-3 w-3 opacity-60" /> {user.email}
                          </span>
                       </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6">
                    <Badge variant="secondary" className={`font-bold uppercase tracking-tight text-[10px] px-2.5 py-1 ${
                      user.role === 'admin' ? 'bg-indigo-100 text-indigo-700 border-0' : 'bg-slate-100 text-slate-700 border-0'
                    }`}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                      <BookOpen className="h-4 w-4 text-primary opacity-70" /> 0 Courses
                    </div>
                  </TableCell>
                  <TableCell className="px-6">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="h-4 w-4 opacity-40" /> {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="px-6">
                     <div className="flex items-center justify-end">
                        <Dialog open={isEnrollDialogOpen && selectedUser?._id === user._id} onOpenChange={(open) => {
                          if (!open) {
                            setIsEnrollDialogOpen(false)
                            setSelectedUser(null)
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="rounded-xl font-bold text-xs h-8 px-3 border-slate-200 hover:bg-slate-900 hover:text-white transition-all"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsEnrollDialogOpen(true)
                              }}
                            >
                               ENROLL
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="rounded-3xl border-0 shadow-2xl p-0 overflow-hidden max-w-md font-geist">
                             <div className="bg-slate-900 p-8 text-white">
                                <UserCheck className="h-10 w-10 text-primary mb-4" />
                                <DialogTitle className="text-2xl font-bold">Enroll Student</DialogTitle>
                                <DialogDescription className="text-slate-400 mt-2 font-medium">
                                  You are enrolling <span className="text-white font-bold">{user.fullName}</span> in a new course.
                                </DialogDescription>
                             </div>
                             
                             <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Course</label>
                                   <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                                      <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-slate-50 font-bold focus:ring-primary">
                                        <SelectValue placeholder="Choose a course to assign..." />
                                      </SelectTrigger>
                                      <SelectContent className="rounded-2xl border-slate-200 shadow-xl p-2">
                                        {courses.map(course => (
                                          <SelectItem key={course._id} value={course._id} className="rounded-xl h-10 font-medium">
                                            {course.title}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                   </Select>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex items-start gap-3">
                                   <div className="mt-0.5">
                                      <div className="h-4 w-4 bg-indigo-600 rounded-full flex items-center justify-center text-[8px] text-white">i</div>
                                   </div>
                                   <p className="text-xs text-indigo-800 leading-relaxed font-medium">
                                      Enrolling a student will grant them immediate access to all lessons and materials in this course.
                                   </p>
                                </div>
                             </div>

                             <DialogFooter className="p-8 pt-0 gap-3">
                                <Button variant="ghost" onClick={() => setIsEnrollDialogOpen(false)} className="rounded-xl font-bold text-slate-500 hover:bg-slate-100 uppercase tracking-tight">
                                   Cancel
                                </Button>
                                <Button onClick={handleEnroll} disabled={!selectedCourse} className="rounded-xl font-bold bg-slate-900 hover:bg-primary shadow-lg shadow-indigo-100 uppercase tracking-tight flex-1 h-12">
                                   Confirm Enrollment
                                </Button>
                             </DialogFooter>
                          </DialogContent>
                        </Dialog>
                     </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-6 border-t font-bold text-[10px] uppercase tracking-widest text-slate-400 flex justify-between items-center bg-slate-50/20">
          <div>Showing {filteredUsers.length} of {users.length} registered accounts</div>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" className="h-8 rounded-lg uppercase bg-white border-slate-200" disabled>prev</Button>
             <Button variant="outline" size="sm" className="h-8 rounded-lg uppercase bg-white border-slate-200" disabled>next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
