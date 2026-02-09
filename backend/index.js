require('dotenv').config();
const express = require('express');
const connectdb = require('./confiq/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// ✅ CORS CONFIG (IMPORTANT)
app.use(
  cors({
     origin: "http://localhost:5173",
     credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Body parsers
app.use(express.json()); // 🔥 REQUIRED
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));


app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/jobseeker", require("./routes/jobSeekerRoutes"));
app.use("/api/recruiter", require("./routes/recruiterRoutes"));

const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/resume", require("./routes/resumeRoutes"));



const PORT = process.env.PORT || 5000;


app.listen(PORT, async () => {
  await connectdb();
  console.log(`Server running on port ${PORT}`);
});
