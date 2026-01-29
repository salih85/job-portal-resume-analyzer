import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const Home = () => {
     
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
 <Navbar />
      {/* 🔷 HERO SECTION */}
      <section style={{
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #2563eb, #1e40af)',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '42px', marginBottom: '10px' }}>
          Job Portal & Resume Analyzer
        </h1>
        <p style={{ fontSize: '18px', maxWidth: '700px', margin: 'auto' }}>
          Find the right job, hire the right talent, and analyze resumes using AI-powered matching.
        </p>

        <div style={{ marginTop: '30px' }}>
          <Link to="/login">
            <button style={btnPrimary}>Get Started</button>
          </Link>
          <Link to="/jobs">
            <button style={btnSecondary}>Browse Jobs</button>
          </Link>
        </div>
      </section>

      {/* 🔷 FEATURES */}
      <section style={{ padding: '50px 20px', maxWidth: '1100px', margin: 'auto' }}>
        <h2 style={title}>Platform Features</h2>

        <div style={grid}>
          <Feature
            title="Resume Analyzer"
            desc="Upload resumes and get skill-based matching with job descriptions."
          />
          <Feature
            title="Job Search"
            desc="Search jobs by skills, location, and experience level."
          />
          <Feature
            title="Recruiter Dashboard"
            desc="Post jobs, view applicants, and shortlist candidates."
          />
          <Feature
            title="Admin Control"
            desc="Manage users, recruiters, and platform activities."
          />
        </div>
      </section>

      {/* 🔷 HOW IT WORKS */}
      <section style={{ background: '#f8fafc', padding: '50px 20px' }}>
        <h2 style={title}>How It Works</h2>

        <ol style={{ maxWidth: '800px', margin: 'auto', fontSize: '16px' }}>
          <li>Create an account as Job Seeker or Recruiter</li>
          <li>Upload resume or post job requirements</li>
          <li>AI analyzes skills and experience</li>
          <li>Get best matches instantly</li>
        </ol>
      </section>

      {/* 🔷 CTA */}
      <section style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h2>Start Your Career or Hiring Today 🚀</h2>
        <Link to="/login">
          <button style={btnPrimary}>Login / Register</button>
        </Link>
      </section>

        <Footer />
    </div>
  );
};

/* 🔧 Reusable components */
const Feature = ({ title, desc }) => (
  <div style={card}>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

/* 🎨 Styles */
const btnPrimary = {
  padding: '12px 20px',
  marginRight: '10px',
  background: '#22c55e',
  border: 'none',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '6px',
};

const btnSecondary = {
  ...btnPrimary,
  background: '#e5e7eb',
  color: '#111827',
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
  marginTop: '30px',
};

const card = {
  padding: '20px',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  background: 'white',
};

const title = {
  textAlign: 'center',
  fontSize: '28px',
  marginBottom: '20px',
};

export default Home;
