const mongoose = require("mongoose");

const siteContentSchema = new mongoose.Schema(
    {
        name: { type: String, default: "ZDC Tech Global Solutions" },
        logo: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" }
        },
        logoText: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" }
        },
        tagline: { type: String, default: "Build Digital Solutions That Move Your Business Forward" },
        email: { type: String, default: "info@zdctechglobalsolutions.com" },
        phone: { type: String, default: "+91 7073551862" },
        headOffice: { type: String, default: "Jaipur, Rajasthan, India" },
        branchOffice: { type: String, default: "D. P. Road, Near New Nagar Parishad Office, Deulgaon Raja, Tq. Deulgaon Raja, Dist. Buldhana, Maharashtra - 443204" },
        hours: { type: String, default: "Monday - Friday: 9:00 AM - 6:00 PM (IST)" },
        socials: {
            facebook: { type: String, default: "#" },
            linkedin: { type: String, default: "#" },
            twitter: { type: String, default: "#" },
            github: { type: String, default: "#" },
            instagram: { type: String, default: "#" },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("SiteContent", siteContentSchema);
