interface TechnologyBadgeProps {
  name: string;
}

export const getIconSlug = (name: string) => {
  const map: Record<string, string> = {
    'React': 'react/61DAFB',
    'Next.js': 'nextdotjs/000000',
    'HTML5': 'html5/E34F26',
    'CSS3': 'css3/1572B6',
    'JavaScript': 'javascript/F7DF1E',
    'TypeScript': 'typescript/3178C6',
    'Node.js': 'nodedotjs/339933',
    'Express': 'express/000000',
    'PHP': 'php/777BB4',
    'Laravel': 'laravel/FF2D20',
    'Python': 'python/3776AB',
    'React Native': 'react/61DAFB',
    'Flutter': 'flutter/02569B',
    'MongoDB': 'mongodb/47A248',
    'MySQL': 'mysql/4479A1',
    'PostgreSQL': 'postgresql/4169E1',
    'Firebase': 'firebase/FFCA28',
    'AWS': 'amazonaws/232F3E',
    'Google Cloud': 'googlecloud/4285F4',
    'Git': 'git/F05032',
    'GitHub': 'github/181717',
    'Docker': 'docker/2496ED',
    'Figma': 'figma/F24E1E',
  };
  return map[name] || null;
}

export function TechnologyBadge({ name }: TechnologyBadgeProps) {
  const iconSlug = getIconSlug(name);

  return (
    <span className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card shadow-sm px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:border-primary/30 hover:bg-muted hover:text-foreground">
      {iconSlug && (
        <img 
          src={`https://cdn.simpleicons.org/${iconSlug}`} 
          alt={`${name} icon`}
          className="h-4 w-4 object-contain transition-transform group-hover:scale-110"
        />
      )}
      {name}
    </span>
  );
}
