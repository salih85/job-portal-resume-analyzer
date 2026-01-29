import { BrowserRouter, Routes, Route } from "react-router-dom";

// PUBLIC
import Home from "./pages/public/Home";
import Jobs from "./pages/public/Jobs";

// AUTH
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import VerifyOtp from "./components/auth/VerifyOtp";

// JOB SEEKER
import ApplyJob from "./pages/jobseeker/ApplyJob";
import Applications from "./pages/jobseeker/Applications";
import Dashboard from "./pages/jobseeker/Dashboard";
import Profile from "./pages/jobseeker/Profile";
import ResumeUpload from "./components/resume/ResumeUpload";
// RECRUITER
import PostJob from "./pages/recruiter/PostJob";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import RecruiterProfile from "./pages/recruiter/Applicants";
import Applicants from "./pages/recruiter/Applicants";
import JobList from "./pages/recruiter/JobList";

// ADMIN
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";

// GUARDS
import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* JOB SEEKER */}
        <Route
          path="/apply/:jobId"
          element={
            <PrivateRoute>
              <ApplyJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <PrivateRoute>
              <RoleRoute role="jobseeker">
                <Applications />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <RoleRoute role="jobseeker">
                <Dashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <RoleRoute role="jobseeker">
                <Profile />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/resume-upload"
          element={
            <PrivateRoute>
              <RoleRoute role="jobseeker">
                <ResumeUpload />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* RECRUITER */}
        <Route
          path="/recruiter/post-job"
          element={
            <PrivateRoute>
              <RoleRoute role="recruiter">
                <PostJob />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/dashboard"
          element={
            <PrivateRoute>
              <RoleRoute role="recruiter">
                <RecruiterDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/profile"
          element={
            <PrivateRoute>
              <RoleRoute role="recruiter">
                <RecruiterProfile />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/applicants"
          element={
            <PrivateRoute>
              <RoleRoute role="recruiter">
                <Applicants />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/jobs"
          element={
            <PrivateRoute>
              <RoleRoute role="recruiter">
                <JobList />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <RoleRoute role="admin">
                <AdminDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <RoleRoute role="admin">
                <Users />
              </RoleRoute>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
