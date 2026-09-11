require('dotenv').config();
const mongoose = require('mongoose');
const Testimonial = require('./src/models/Testimonial');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zdc_tech";

const fallbackTestimonials = [
  {
    name: 'Rajesh Kumar',
    position: 'CEO',
    company: 'MediCare Hospitals',
    quote:
      'ZDC Tech Global Solutions transformed our hospital operations. The system they built reduced patient wait times by 60 percent and eliminated nearly all billing errors. They understood healthcare deeply and delivered beyond expectations.',
    avatar: { url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', public_id: '' },
    rating: 5,
    status: 'active'
  },
  {
    name: 'Sarah Williams',
    position: 'Founder',
    company: 'ShopWave',
    quote:
      'Our e-commerce platform was rebuilt from the ground up. Page load times dropped 80 percent, checkout abandonment fell by 45 percent, and our revenue tripled in six months. The team is exceptional.',
    avatar: { url: 'https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', public_id: '' },
    rating: 5,
    status: 'active'
  },
  {
    name: 'Michael Brown',
    position: 'Director',
    company: 'EduPrime Schools',
    quote:
      'Managing 12 schools used to be chaotic. Now everything from attendance to report cards to fee collection is in one platform. The parent app alone changed how we communicate with families.',
    avatar: { url: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', public_id: '' },
    rating: 5,
    status: 'active'
  },
  {
    name: 'Aisha Patel',
    position: 'VP of Sales',
    company: 'SalesForge',
    quote:
      'The CRM ZDC Tech Global Solutions built matches our exact sales process. No more manual data entry, no more missed follow-ups. Our close rate doubled. They did not just build software, they understood our business.',
    avatar: { url: 'https://images.pexels.com/photos/3760261/pexels-photo-3760261.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', public_id: '' },
    rating: 5,
    status: 'active'
  },
];

async function seedTestimonials() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const count = await Testimonial.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} testimonials. Skipping seed.`);
    } else {
      console.log('Seeding testimonials...');
      await Testimonial.insertMany(fallbackTestimonials);
      console.log('Successfully seeded testimonials!');
    }
  } catch (error) {
    console.error('Error seeding testimonials:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedTestimonials();
