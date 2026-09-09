const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const path = require("path");
app.use("/public", express.static(path.join(__dirname, "..", "public")));

// Routes
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/testimonials", require("./routes/testimonial.routes"));
app.use("/api/v1/contact", require("./routes/contact.routes"));
app.use("/api/v1/team", require("./routes/team.routes"));
app.use("/api/v1/site-content", require("./routes/siteContent.routes"));

// New Dynamic Routes
app.use("/api/v1/blogs", require("./routes/blog.routes"));
app.use("/api/v1/blog", require("./routes/blog.routes"));
app.use("/api/v1/case-studies", require("./routes/caseStudy.routes"));
app.use("/api/v1/services", require("./routes/service.routes"));
app.use("/api/v1/portfolios", require("./routes/portfolio.routes"));
app.use("/api/v1/portfolio", require("./routes/portfolio.routes"));
app.use("/api/v1/jobs", require("./routes/job.routes"));
app.use("/api/v1/careers", require("./routes/job.routes"));
app.use("/api/v1/job-applications", require("./routes/jobApplication.routes"));
app.use("/api/v1/clients", require("./routes/client.routes"));
app.use("/api/v1/industries", require("./routes/industry.routes"));
app.use("/api/v1/technologies", require("./routes/technology.routes"));
app.use("/api/v1/faqs", require("./routes/faq.routes"));
app.use("/api/v1/subscribers", require("./routes/subscriber.routes"));
app.use("/api/v1/upload", require("./routes/upload.routes"));

// Admin — Backup
const isAuthenticated = require("./middleware/auth");
const authorizeRoles = require("./middleware/role");
const { getDatabaseBackup } = require("./controllers/backup.controller");
app.get(
  "/api/v1/admin/backup",
  isAuthenticated,
  authorizeRoles(["admin"]),
  getDatabaseBackup,
);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
