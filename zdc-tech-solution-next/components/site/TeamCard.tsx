'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';
import type { TeamMember } from '@/data/team';

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export function TeamCard({ member, index = 0 }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/40"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b3d]/80 via-[#0b1b3d]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
          {member.socials.linkedin && (
            <a href={member.socials.linkedin} aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0ea5e9] shadow-lg transition-transform hover:scale-110">
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {member.socials.twitter && (
            <a href={member.socials.twitter} aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0ea5e9] shadow-lg transition-transform hover:scale-110">
              <Twitter className="h-4 w-4" />
            </a>
          )}
          {member.socials.github && (
            <a href={member.socials.github} aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0ea5e9] shadow-lg transition-transform hover:scale-110">
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      <div className="p-6 bg-white border-t border-gray-100">
        <h3 className="text-[18px] font-bold text-[#0b1b3d]">{member.name}</h3>
        <p className="text-[13px] font-bold uppercase tracking-wider text-[#0ea5e9] mt-1">{member.position}</p>
        <p className="mt-3 text-[14px] leading-relaxed text-slate-500">{member.description}</p>
      </div>
    </motion.div>
  );
}
