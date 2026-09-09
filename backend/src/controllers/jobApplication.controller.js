const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");
const { uploadLocalFile } = require("../utils/fileUpload");
const { normalizePublicItem, normalizePublicItems } = require("../utils/publicResponse");
const { notifyAdmin, sendEmail } = require("../utils/sendMail");

const escapeHtml = (value = "") =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

const detailRow = (label, value) =>
    value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "";

exports.create = async (req, res) => {
    try {
        const { jobId, jobSlug, job: jobValue, name, email, phone, portfolioUrl, linkedinUrl, coverLetter } = req.body;

        if (!name || !email) {
            return res.status(400).json({ success: false, message: "Name and email are required" });
        }

        let job = null;
        const requestedJob = jobSlug || jobValue || "";
        if (jobId || (jobValue && /^[a-f\d]{24}$/i.test(jobValue))) {
            job = await Job.findById(jobId || jobValue);
        } else if (requestedJob) {
            job = await Job.findOne({ slug: requestedJob, status: "open" });
        }

        let resume = { public_id: "", url: "" };
        if (req.file) {
            const uploadResult = await uploadLocalFile(req.file.path);
            if (!uploadResult) {
                return res.status(400).json({ success: false, message: "Resume upload failed" });
            }
            resume = { public_id: uploadResult.public_id, url: uploadResult.url };
        }

        const application = await JobApplication.create({
            job: job?._id || null,
            jobSlug: job?.slug || requestedJob,
            position: job?.position || req.body.position || "",
            name,
            email,
            phone,
            portfolioUrl,
            linkedinUrl,
            coverLetter,
            resume,
        });

        const roleName = application.position || application.jobSlug || "General application";
        const adminSubject = `New job application: ${roleName}`;
        const adminHtml = `
            <h2>${escapeHtml(adminSubject)}</h2>
            ${detailRow("Name", name)}
            ${detailRow("Email", email)}
            ${detailRow("Phone", phone)}
            ${detailRow("Position", roleName)}
            ${detailRow("Job slug", application.jobSlug)}
            ${detailRow("Portfolio", portfolioUrl)}
            ${detailRow("LinkedIn", linkedinUrl)}
            ${detailRow("Resume", resume.url)}
            <p><strong>Cover letter:</strong></p>
            <p>${escapeHtml(coverLetter || "").replace(/\n/g, "<br>")}</p>
        `;

        const mailStatus = { careers: "pending", applicant: "pending" };
        try {
            const adminResult = await notifyAdmin({
                to: process.env.CAREERS_EMAIL || process.env.ADMIN_EMAIL || process.env.SMTP_USER,
                subject: adminSubject,
                html: adminHtml,
                text: `${adminSubject}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || ""}\nPosition: ${roleName}\nResume: ${resume.url || ""}\nCover letter: ${coverLetter || ""}`,
                replyTo: email,
            });
            mailStatus.careers = adminResult?.skipped ? "skipped" : "sent";
        } catch (mailError) {
            console.error("Job application admin email failed:", mailError);
            mailStatus.careers = "failed";
        }

        try {
            const applicantResult = await sendEmail({
                to: email,
                subject: "We received your application - ZDC Tech Global Solutions",
                html: `
                    <p>Hi ${escapeHtml(name)},</p>
                    <p>Thank you for applying for <strong>${escapeHtml(roleName)}</strong> at ZDC Tech Global Solutions.</p>
                    <p>Our hiring team will review your application and contact you if your profile matches the role.</p>
                    <p>Regards,<br>ZDC Tech Global Solutions Careers</p>
                `,
                text: `Hi ${name},\n\nThank you for applying for ${roleName} at ZDC Tech Global Solutions. Our hiring team will review your application and contact you if your profile matches the role.\n\nRegards,\nZDC Tech Global Solutions Careers`,
            });
            mailStatus.applicant = applicantResult?.skipped ? "skipped" : "sent";
        } catch (mailError) {
            console.error("Job application confirmation email failed:", mailError);
            mailStatus.applicant = "failed";
        }

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            data: normalizePublicItem(application),
            mailStatus,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const applications = await JobApplication.find()
            .populate("job", "slug position department location type")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: normalizePublicItems(applications) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id)
            .populate("job", "slug position department location type");

        if (!application) return res.status(404).json({ success: false, message: "Not found" });
        res.status(200).json({ success: true, data: normalizePublicItem(application) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const application = await JobApplication.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true },
        );

        if (!application) return res.status(404).json({ success: false, message: "Not found" });
        res.status(200).json({ success: true, data: normalizePublicItem(application) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const application = await JobApplication.findByIdAndDelete(req.params.id);
        if (!application) return res.status(404).json({ success: false, message: "Not found" });
        res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
