export interface TeamMember {
  name: string;
  position: string;
  description: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export const team: TeamMember[] = [
  {
    name: 'Arjun Mehta',
    position: 'Founder & CEO',
    description:
      '15 years in software architecture and product strategy. Leads ZDC Tech Global Solutions with a vision for engineering excellence.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Sofia Ramirez',
    position: 'Chief Technology Officer',
    description:
      'Cloud architecture and DevOps specialist with deep experience scaling systems for high-growth companies.',
    image: 'https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'David Chen',
    position: 'Head of Engineering',
    description:
      'Full-stack engineer turned leader. Oversees code quality, architecture standards and technical mentorship.',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Priya Sharma',
    position: 'Lead UI/UX Designer',
    description:
      'Award-winning designer focused on human-centered experiences. Translates research into beautiful, usable interfaces.',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Marcus Johnson',
    position: 'Mobile Development Lead',
    description:
      'Cross-platform mobile expert in React Native and Flutter. Shipped 30+ apps to the App Store and Play Store.',
    image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Elena Volkov',
    position: 'Digital Marketing Director',
    description:
      'Growth strategist with expertise in SEO, paid media and content marketing for B2B and B2C brands.',
    image: 'https://images.pexels.com/photos/3760261/pexels-photo-3760261.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'James Okafor',
    position: 'Senior Backend Engineer',
    description:
      'Distributed systems engineer specializing in Node.js and Python. Builds APIs that handle millions of requests.',
    image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Yuki Tanaka',
    position: 'QA & Automation Lead',
    description:
      'Champion of quality. Designs test strategies and automation pipelines that catch bugs before users do.',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    socials: { linkedin: '#', github: '#' },
  },
];
