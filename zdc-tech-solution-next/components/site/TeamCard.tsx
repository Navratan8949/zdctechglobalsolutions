'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { normalizeCategory, type TeamMember } from '@/data/team';

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

function formatDescription(desc?: string): string {
  if (!desc) return '';
  const trimmed = desc.trim();
  if (/<(p|br|div|ul|ol|li|span|strong|em)[^>]*>/i.test(trimmed)) {
    return trimmed;
  }
  return trimmed
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br />')}</p>`)
    .join('');
}

export function TeamCard({ member, index = 0 }: TeamCardProps) {
  const displayCategory = normalizeCategory(member.category, member.position);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#0ea5e9]/40 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Pill Tag on Image */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center rounded-full bg-slate-950/70 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white border border-white/20 shadow-sm">
            {displayCategory}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b3d]/85 via-[#0b1b3d]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
          {member.socials?.linkedin && member.socials.linkedin !== "#" ? (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={`${member.name}'s LinkedIn`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0ea5e9] shadow-lg transition-transform hover:scale-110"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">{member.name}&apos;s LinkedIn</span>
            </a>
          ) : member.socials?.linkedin ? (
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0ea5e9] shadow-lg">
              <Linkedin className="h-4 w-4" />
            </span>
          ) : null}
          {member.socials?.twitter && member.socials.twitter !== "#" ? (
            <a
              href={member.socials.twitter}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={`${member.name}'s Twitter`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0ea5e9] shadow-lg transition-transform hover:scale-110"
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">{member.name}&apos;s Twitter</span>
            </a>
          ) : member.socials?.twitter ? (
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0ea5e9] shadow-lg">
              <Twitter className="h-4 w-4" />
            </span>
          ) : null}
          {member.socials?.github && member.socials.github !== "#" ? (
            <a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={`${member.name}'s GitHub`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0ea5e9] shadow-lg transition-transform hover:scale-110"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">{member.name}&apos;s GitHub</span>
            </a>
          ) : member.socials?.github ? (
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0ea5e9] shadow-lg">
              <Github className="h-4 w-4" />
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 bg-white border-t border-gray-100">
        <h3 className="text-[18px] font-bold text-[#0b1b3d] leading-snug">{member.name}</h3>
        <p className="text-[12px] font-bold uppercase tracking-wider text-[#0ea5e9] mt-1.5">{member.position}</p>
        <div 
          className="mt-3 text-[14px] leading-relaxed text-slate-600 flex-1 [&>p]:mb-2.5 [&>p:last-child]:mb-0 [&>strong]:text-[#0b1b3d] [&>strong]:font-semibold [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
          dangerouslySetInnerHTML={{ __html: formatDescription(member.description) }}
        />
      </div>
    </motion.div>
  );
}
