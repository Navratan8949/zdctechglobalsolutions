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
      className="group overflow-hidden rounded-2xl border border-white/10 bg-card/50 transition-all hover:border-primary/40"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {member.socials.linkedin && (
            <a href={member.socials.linkedin} aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-background/60 text-white backdrop-blur-sm hover:bg-primary hover:text-white">
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {member.socials.twitter && (
            <a href={member.socials.twitter} aria-label="Twitter" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-background/60 text-white backdrop-blur-sm hover:bg-primary hover:text-white">
              <Twitter className="h-4 w-4" />
            </a>
          )}
          {member.socials.github && (
            <a href={member.socials.github} aria-label="GitHub" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-background/60 text-white backdrop-blur-sm hover:bg-primary hover:text-white">
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
        <p className="text-sm font-medium text-primary">{member.position}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.description}</p>
      </div>
    </motion.div>
  );
}
