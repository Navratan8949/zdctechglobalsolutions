const nodemailer = require("nodemailer");

let transporter;

const isMailConfigured = () =>
    Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

const getTransporter = () => {
    if (!isMailConfigured()) return null;
    if (transporter) return transporter;

    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE || "false") === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    return transporter;
};

const defaultFrom = () =>
    process.env.MAIL_FROM || `"ZDC Tech Global Solutions" <${process.env.SMTP_USER || "no-reply@zdctechglobalsolutions.com"}>`;

const sendEmail = async ({ to, cc, bcc, subject, text, html, attachments = [], replyTo }) => {
    const mailer = getTransporter();
    if (!mailer) {
        console.warn("Email skipped: SMTP_HOST, SMTP_USER, and SMTP_PASS are required.");
        return { skipped: true };
    }

    return mailer.sendMail({
        from: defaultFrom(),
        to,
        cc,
        bcc,
        subject,
        text,
        html,
        attachments,
        replyTo,
    });
};

const notifyAdmin = async ({ subject, text, html, replyTo, attachments = [], to }) =>
    sendEmail({
        to: to || process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject,
        text,
        html,
        replyTo,
        attachments,
    });

const SendVerificationCode = async (email, html, subject, text) => {
    try {
        return await sendEmail({ to: email, subject, text, html });
    } catch (error) {
        console.error("Error sending verification email:", error);
        return null;
    }
};

const SendMassEmail = async (bccEmails, subject, html) => {
    try {
        return await sendEmail({ bcc: bccEmails, subject, html });
    } catch (error) {
        console.error("Error sending mass email:", error);
        throw error;
    }
};

module.exports = {
    sendEmail,
    notifyAdmin,
    SendVerificationCode,
    SendMassEmail,
};
