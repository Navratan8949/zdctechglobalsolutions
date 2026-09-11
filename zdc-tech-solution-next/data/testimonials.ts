export interface Testimonial {
  _id?: string;
  name: string;
  position: string;
  company: string;
  quote: string;
  avatar: string | { url: string; public_id?: string };
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Rajesh Kumar',
    position: 'CEO',
    company: 'MediCare Hospitals',
    quote:
      'ZDC Tech Global Solutions transformed our hospital operations. The system they built reduced patient wait times by 60 percent and eliminated nearly all billing errors. They understood healthcare deeply and delivered beyond expectations.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    name: 'Sarah Williams',
    position: 'Founder',
    company: 'ShopWave',
    quote:
      'Our e-commerce platform was rebuilt from the ground up. Page load times dropped 80 percent, checkout abandonment fell by 45 percent, and our revenue tripled in six months. The team is exceptional.',
    avatar: 'https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    name: 'Michael Brown',
    position: 'Director',
    company: 'EduPrime Schools',
    quote:
      'Managing 12 schools used to be chaotic. Now everything from attendance to report cards to fee collection is in one platform. The parent app alone changed how we communicate with families.',
    avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    name: 'Aisha Patel',
    position: 'VP of Sales',
    company: 'SalesForge',
    quote:
      'The CRM ZDC Tech Global Solutions built matches our exact sales process. No more manual data entry, no more missed follow-ups. Our close rate doubled. They did not just build software, they understood our business.',
    avatar: 'https://images.pexels.com/photos/3760261/pexels-photo-3760261.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
  },
];
