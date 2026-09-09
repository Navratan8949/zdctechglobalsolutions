export interface TechGroup {
  category: string;
  icon: string;
  technologies: string[];
}

export const technologyStack: TechGroup[] = [
  {
    category: 'Frontend',
    icon: 'Layout',
    technologies: ['React', 'Next.js', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'Backend',
    icon: 'Server',
    technologies: ['Node.js', 'Express', 'PHP', 'Laravel', 'Python'],
  },
  {
    category: 'Mobile',
    icon: 'Smartphone',
    technologies: ['React Native', 'Flutter'],
  },
  {
    category: 'Database',
    icon: 'Database',
    technologies: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'],
  },
  {
    category: 'Cloud & Tools',
    icon: 'Cloud',
    technologies: ['AWS', 'Google Cloud', 'Git', 'GitHub', 'Docker', 'Figma'],
  },
];

export const allTechnologies: string[] = technologyStack.flatMap((g) => g.technologies);
