require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./src/models/Service');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zdc_tech";

async function updateSEOService() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const updatedData = {
      shortDescription: "Boost your organic visibility and drive high-quality traffic to your website with our data-driven Search Engine Optimization (SEO) strategies.",
      heroHeadline: "Dominate Search Rankings with Expert SEO Services",
      heroSubheadline: "Turn your website into a lead-generating machine by ranking on the first page of Google.",
      introduction: "In today's competitive digital landscape, having a beautiful website isn't enough; your customers need to find it. Our expert SEO services focus on driving targeted, organic traffic to your business. We don't just chase rankings—we focus on optimizing for the keywords that actually bring in revenue. From deep technical audits and on-page optimization to authoritative link-building, we ensure your brand stands out on search engines.",
      whatWeOffer: [
        { title: "Technical SEO Audits", description: "We analyze and fix underlying technical issues like site speed, mobile-friendliness, and crawl errors that hold your rankings back." },
        { title: "On-Page Optimization", description: "Optimizing your website's content, meta tags, headers, and internal linking structure for maximum relevance." },
        { title: "Off-Page SEO & Link Building", description: "Acquiring high-quality, authoritative backlinks to build your domain authority and trust with Google." },
        { title: "Local SEO", description: "Optimizing your Google My Business profile and local citations to dominate local search results and maps." }
      ],
      keyFeatures: [
        "In-depth Keyword Research",
        "Competitor Gap Analysis",
        "Content Strategy & Optimization",
        "Monthly Performance Reporting"
      ],
      technologies: [
        "Google Analytics 4",
        "Google Search Console",
        "Ahrefs",
        "SEMrush",
        "Screaming Frog"
      ],
      benefits: [
        { title: "Long-Term Traffic", description: "Unlike paid ads, organic traffic continues to deliver leads long after the initial optimization." },
        { title: "Higher Trust & Credibility", description: "Users inherently trust websites that rank at the top of Google's organic search results." },
        { title: "Cost-Effective Growth", description: "SEO provides one of the highest Returns on Investment (ROI) in digital marketing." }
      ],
      whyChooseUs: [
        "White-hat SEO practices only",
        "Transparent reporting with no hidden metrics",
        "Dedicated SEO specialists for your campaign",
        "Proven track record of ranking in competitive niches"
      ],
      faqs: [
        { question: "How long does it take to see results from SEO?", answer: "SEO is a long-term strategy. While some technical fixes can yield quick wins, significant ranking improvements and traffic growth typically take 3 to 6 months depending on competition." },
        { question: "Do you guarantee #1 rankings on Google?", answer: "No reputable agency can guarantee a #1 spot due to Google's ever-changing algorithm. However, we guarantee that our proven strategies will significantly improve your rankings, visibility, and organic traffic." },
        { question: "What is the difference between On-Page and Off-Page SEO?", answer: "On-Page SEO involves optimizing elements on your own website (content, tags, speed), while Off-Page SEO focuses on building authority from external sources, primarily through backlinks." }
      ]
    };

    const result = await Service.findOneAndUpdate(
      { slug: 'seo' },
      { $set: updatedData },
      { new: true }
    );

    if (result) {
      console.log('Successfully updated SEO Service!');
    } else {
      console.log('SEO Service not found in database.');
    }

  } catch (error) {
    console.error('Error updating SEO service:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

updateSEOService();
