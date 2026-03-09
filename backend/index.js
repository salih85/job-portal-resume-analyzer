require('dotenv').config();
const express = require('express');
const connectdb = require('./confiq/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, 
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // 1. Allow if no origin (like mobile apps/curl)
      if (!origin) return callback(null, true);

      // 2. Normalize origin and allowed list
      const normalizedOrigin = origin.replace(/\/$/, "");
      const normalizedAllowed = allowedOrigins.map(o => o.replace(/\/$/, ""));

      // 3. Check exact match or if it's a Vercel subdomain (very helpful for testing)
      const isAllowed = normalizedAllowed.includes(normalizedOrigin) || 
                        normalizedOrigin.endsWith(".vercel.app");

      if (isAllowed) {
        callback(null, true);
      } else {
        console.error(`CORS Blocked: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Cross-Origin-Opener-Policy (REQUIRED for Google Login Popups)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});


app.get("/", (req, res) => {
  res.send("Job Portal API is running...");
});


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


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
