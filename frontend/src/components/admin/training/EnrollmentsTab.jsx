import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
  Users, Search, Loader2, UserX, MoreVertical
} from 'lucide-react'

const EnrollmentsTab = ({
  courseId,
  enrollments,
  isLoadingEnrollments,
  emailQuery,
  handleEmailSearch,
  searchResults,
  isSearching,
  showDropdown,
  setShowDropdown,
  confirmStudent,
  setConfirmStudent,
  isEnrolling,
  handleConfirmEnroll,
  enrollError,
  setEnrollError,
  handleSelectStudent,
  handleUnenroll,
  dropdownRef
}) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
          <div className="h-2 w-8 bg-amber-500 rounded-full"></div>
          Student Enrollments
        </h2>

        {/* Search Box */}
        <div className="relative w-full md:w-80 group" ref={dropdownRef}>
          <div className="relative overflow-hidden rounded-none border border-slate-200 focus-within:border-slate-400 transition-all bg-white flex items-center px-3 h-10">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Invite student by email..."
              className="bg-transparent border-0 outline-0 w-full font-bold text-xs text-slate-700 placeholder:text-slate-300"
              value={emailQuery}
              onChange={(e) => handleEmailSearch(e.target.value)}
              onFocus={() => emailQuery.trim().length >= 2 && searchResults.length > 0 && setShowDropdown(true)}
            />
            {isSearching && <Loader2 className="w-3 h-3 animate-spin text-slate-400 ml-2" />}
          </div>

          {/* Dropdown Results / Confirmation Dialog */}
          {showDropdown && (searchResults.length > 0 || confirmStudent) && (
            <div className="absolute top-full mt-1 left-0 right-0 z-50 bg-white rounded-none shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              {confirmStudent ? (
                <div className="p-3 bg-slate-50/50">
                  <div className="space-y-1 mb-3">
                    <p className="text-[10px] font-black tracking-widest text-slate-300 uppercase">Confirm Access</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-200 flex items-center justify-center text-slate-500 font-black text-[12px]">
                        {confirmStudent.name?.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-slate-900 truncate uppercase tracking-tight">{confirmStudent.name}</p>
                        <p className="text-[9px] text-slate-400 truncate lowercase">{confirmStudent.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Button
                      onClick={handleConfirmEnroll}
                      disabled={isEnrolling}
                      size="sm"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-none h-8 text-[10px] font-black uppercase tracking-widest shadow-none"
                    >
                      {isEnrolling ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Confirm'}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setConfirmStudent(null)}
                      disabled={isEnrolling}
                      size="sm"
                      className="w-full rounded-none h-7 text-[9px] font-bold text-slate-400 hover:text-slate-600 hover:bg-white uppercase tracking-tight"
                    >
                      Cancel
                    </Button>
                  </div>

                  {enrollError && (
                    <p className="mt-2 text-[8px] text-red-500 font-black uppercase tracking-widest text-center">{enrollError}</p>
                  )}
                </div>
              ) : (
                <div className="p-1 max-h-60 overflow-y-auto">
                  {searchResults.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-2 hover:bg-slate-50 cursor-pointer group transition-colors"
                      onClick={() => handleSelectStudent(user)}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <div className="flex flex-col text-left">
                          <span className="text-[11px] font-bold text-slate-900 leading-none mb-0.5">{user.name}</span>
                          <span className="text-[10px] text-slate-400 leading-none">{user.email}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[8px] h-4 rounded-none border-slate-200 px-1 font-black uppercase text-slate-400">{user.role}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Enrolled Students Table */}
      <div className="bg-white rounded-none border border-slate-200 overflow-hidden">
        {isLoadingEnrollments && enrollments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Loader2 className="h-6 w-6 animate-spin text-slate-200" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Querying Registry...</p>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center space-y-3 bg-slate-50/20">
            <Users className="h-8 w-8 text-slate-200 mb-1" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Zero enrollments</h3>
            <p className="text-slate-400 text-[11px] max-w-xs font-medium uppercase tracking-tighter">Invite students using the search utility above.</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50/80 border-b border-slate-200">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="h-10 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Student Identity</TableHead>
                <TableHead className="h-10 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Date</TableHead>
                <TableHead className="h-10 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Access</TableHead>
                <TableHead className="h-10 px-6 text-right text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.map((enroll) => (
                <TableRow key={enroll._id} className="hover:bg-slate-50/50 border-slate-100 transition-colors">
                  <TableCell className="px-6 py-3">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-slate-800 leading-tight">{enroll.userId?.name || 'Unknown User'}</span>
                      <span className="text-[10px] text-slate-400 font-medium leading-tight lowercase">{enroll.userId?.email || 'N/A'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-3">
                    <span className="text-[11px] font-bold text-slate-500">
                      {new Date(enroll.enrolledAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-3">
                    <Badge className="bg-transparent text-slate-500 border border-slate-200 rounded-none px-1.5 py-0 text-[8px] font-black uppercase tracking-widest shadow-none">
                      {enroll.accessType}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none text-slate-400">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-none border-slate-200 min-w-[150px] shadow-xl p-1">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2 py-1.5">Action Menu</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-100" />
                          <DropdownMenuItem
                            className="text-red-600 text-[11px] font-bold px-2 py-2 cursor-pointer focus:bg-red-50 focus:text-red-700 bg-red-50/20 whitespace-nowrap"
                            onClick={(e) => handleUnenroll(enroll._id)}
                          >
                            <UserX className="w-3.5 h-3.5 mr-2" />
                            Unenroll Student
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default EnrollmentsTab
