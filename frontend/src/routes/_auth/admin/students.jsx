import { createFileRoute } from '@tanstack/react-router'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth/admin/students')({
  component: AdminStudents,
})

const STUDENTS = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', enrolled: 4, status: 'Active', joined: '2023-10-12' },
  { id: 2, name: 'Sarah Miller', email: 'sarah@example.com', enrolled: 2, status: 'Active', joined: '2023-11-05' },
  { id: 3, name: 'Michael Chen', email: 'michael@example.com', enrolled: 5, status: 'Inactive', joined: '2023-08-22' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', enrolled: 1, status: 'Active', joined: '2024-01-15' },
  { id: 5, name: 'James Wilson', email: 'james@example.com', enrolled: 3, status: 'Active', joined: '2023-09-30' },
]

function AdminStudents() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Students</h1>
          <p className="text-slate-500 mt-1">Manage all registered students.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">Add Student</Button>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-xs overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input className="pl-9 h-9" placeholder="Filter emails..." />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9">Status</Button>
            <Button variant="outline" size="sm" className="h-9">Columns</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enrolled Courses</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STUDENTS.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{student.name}</span>
                    <span className="text-xs text-slate-500">{student.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={student.status === 'Active' ? 'default' : 'secondary'} className={student.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}>
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>{student.enrolled}</TableCell>
                <TableCell>{student.joined}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t text-sm text-slate-500 flex justify-between items-center bg-slate-50/50">
          <div>Showing 1 to 5 of 5 entries</div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
