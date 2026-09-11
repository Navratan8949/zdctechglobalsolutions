require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./src/models/Service');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zdc_tech";

const imageUpdates = [
  { slug: 'google-ads', url: '/service-icons/ads.png' },
  { slug: 'meta-ads', url: '/service-icons/meta.png' },
  { slug: 'mobile-app', url: '/service-icons/app-development.png' },
  { slug: 'social-media', url: '/service-icons/bullhorn.png' },
  { slug: 'crm-development', url: '/service-icons/crm.png' },
  { slug: 'web-design', url: '/service-icons/digital-services.png' },
  { slug: 'software', url: '/service-icons/business.png' },
  { slug: 'it-consulting', url: '/service-icons/training.png' }
];

async function updateServiceImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const update of imageUpdates) {
      await Service.findOneAndUpdate(
        { slug: update.slug },
        { 'image.url': update.url, 'image.public_id': '' }
      );
      console.log(`Updated image for ${update.slug}`);
    }
    
    console.log('Successfully updated all 8 service images!');
  } catch (error) {
    console.error('Error updating images:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

updateServiceImages();
