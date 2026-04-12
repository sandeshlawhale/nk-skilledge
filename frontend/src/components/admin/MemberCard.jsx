import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Pencil, Trash2, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react'

export function MemberCard({ member, onEdit, onDelete }) {
  return (
    <Card className="rounded-none border-2 border-slate-900 group flex flex-col h-full bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-slate-100 border-b-2 border-slate-900">
        <img
          src={member.profileImage?.url}
          alt={member.name}
          className="w-full h-full object-cover grayscale transition-all duration-500 scale-100 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {member.socialLinks?.linkedin && (
            <a href={member.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-white border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {member.socialLinks?.github && (
            <a href={member.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 bg-white border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-colors">
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <p className="text-primary font-black text-[10px] uppercase tracking-widest">{member.role}</p>
          <div className="flex gap-2">
            {member.isFeatured && <Badge className="bg-amber-100 text-amber-600 border-amber-200 rounded-none text-[8px] font-black uppercase tracking-widest">Featured</Badge>}
            {!member.isActive && <Badge variant="outline" className="border-slate-200 text-slate-400 rounded-none text-[8px] font-black uppercase tracking-widest">Inactive</Badge>}
          </div>
        </div>
        <h4 className="text-xl font-black text-slate-900 mb-2">{member.name}</h4>
        <p className="text-slate-500 text-xs font-semibold leading-relaxed line-clamp-3 mb-4">{member.bio}</p>
        
        {member.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {member.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="bg-slate-50 text-[9px] font-bold text-slate-600 px-2 py-0.5 border border-slate-100">
                {skill}
              </span>
            ))}
            {member.skills.length > 3 && <span className="text-[9px] font-bold text-slate-400">+{member.skills.length - 3} more</span>}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 bg-slate-50 border-t-2 border-slate-900 grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={() => onEdit(member)}
          className="rounded-none border-2 border-slate-900 hover:bg-slate-900 hover:text-white font-black uppercase tracking-widest text-[10px] h-10"
        >
          <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onDelete(member._id)}
          className="rounded-none border-2 border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 font-black uppercase tracking-widest text-[10px] h-10 shadow-none"
        >
          <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
