import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative pt-16 pb-20 px-6 overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

          <div className="container text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8 animate-bounce">
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Unlock Your <br />
              <span className="text-gradient">Career Potential</span>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl mb-12">
              The modern job portal. Upload your resume and find the 
              perfect opportunities instantly. Bridging the gap between talent and ambition.
            </p>

            {/* SEARCH BOX GLASSMORPHISM */}
            <div className="max-w-4xl mx-auto glass-card p-4 md:p-6 mb-12 transform hover:scale-[1.01] transition-transform">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex items-center bg-white/50 border border-gray-200 rounded-xl px-4 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                  <span className="text-gray-400 mr-2 text-xl">🔍</span>
                  <input
                    type="text"
                    placeholder="Job title, keywords, or skills"
                    className="w-full bg-transparent border-none py-4 focus:outline-none"
                  />
                </div>
                <div className="flex-1 flex items-center bg-white/50 border border-gray-200 rounded-xl px-4 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                  <span className="text-gray-400 mr-2 text-xl">📍</span>
                  <input
                    type="text"
                    placeholder="Location or Remote"
                    className="w-full bg-transparent border-none py-4 focus:outline-none"
                  />
                </div>
                <Link to="/jobs">
                  <button className="btn btn-primary w-full md:w-auto px-10 py-4 text-lg font-bold">
                    Find Jobs
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 font-medium">
              <span>Popular Tags:</span>
              <span className="hover:text-indigo-600 cursor-pointer">#SoftwareEngineering</span>
              <span className="hover:text-indigo-600 cursor-pointer">#UI/UXDesign</span>
              <span className="hover:text-indigo-600 cursor-pointer">#DataScience</span>
              <span className="hover:text-indigo-600 cursor-pointer">#ProductManagement</span>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-12 border-y border-gray-100 bg-white/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatItem value="50+" label="Active Jobs" />
              <StatItem value="200+" label="Resumes Analyzed" />
              <StatItem value="25+" label="Top Companies" />
              <StatItem value="95%" label="Matching Score" />
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features for Modern Hiring</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Leveraging advanced technology to simplify the journey from application to hire.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon="🚀"
                title="AI Resume Matching"
                desc="Our proprietary algorithm extracts skills and experiences to match you with jobs that actually fit your profile."
                bgClass="bg-indigo-50"
              />
              <FeatureCard 
                icon="📊"
                title="Recruiter Insights"
                desc="Recruiters get instant shortlists with AI scores, saving hundreds of hours of manual resume screening."
                bgClass="bg-purple-50"
              />
              <FeatureCard 
                icon="🎯"
                title="Smart Applications"
                desc="Apply with a single click. Our AI optimizes your application for each specific job requirement."
                bgClass="bg-blue-50"
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="section-padding bg-gray-50 relative overflow-hidden">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8">How It Works</h2>
                <div className="space-y-8">
                  <StepItem 
                    number="01" 
                    title="Sign Up" 
                    desc="Create your profile as a candidate or employer in seconds." 
                  />
                  <StepItem 
                    number="02" 
                    title="Upload Resume" 
                    desc="Our AI parses your PDF or Doc and understands your career path." 
                  />
                  <StepItem 
                    number="03" 
                    title="Get Suggestions" 
                    desc="Instantly view jobs ranked by their compatibility with your skills." 
                  />
                  <StepItem 
                    number="04" 
                    title="Apply & Succeed" 
                    desc="Apply directly and track your progress in your personal dashboard." 
                  />
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 glass-card p-2 transform rotate-3 shadow-2xl">
                   <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg aspect-square flex items-center justify-center">
                      <span className="text-white text-8xl">🤖</span>
                   </div>
                </div>
                <div className="absolute top-10 -right-10 w-full h-full bg-indigo-100 rounded-lg transform -rotate-3 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 px-6 mb-40">
          <div className="container">
            <div className="bg-white border border-indigo-100 rounded-[2rem] p-6 md:p-24 text-center shadow-2xl relative overflow-hidden">
              {/* Decorative background elements with lower z-index */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32 z-0" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-50/50 rounded-full blur-3xl -ml-24 -mb-24 z-0" />
              
              {/* Content with high z-index to avoid any overlap or dimming */}
              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                  Ready to Transform <br className="sm:hidden" /> Your Career?
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10 font-medium">
                  Join thousands of professionals using our platform to find meaningful work and build world-class teams.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 lg:px-20">
                  <Link to="/register" className="w-full sm:w-auto">
                    <button className="btn btn-primary w-full px-10 py-4 md:py-5 text-lg font-bold shadow-lg shadow-indigo-100">
                      Create Free Account
                    </button>
                  </Link>
                  <Link to="/jobs" className="w-full sm:w-auto">
                    <button className="btn btn-secondary w-full border border-slate-200 hover:bg-slate-50 text-slate-700 px-10 py-4 md:py-5 text-lg font-bold">
                      Browse All Jobs
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXTRA FOOTER SPACER */}
        <div className="h-20 w-full" />
      </main>

      <Footer />
    </div>
  );
};

/* COMPONENTS */

const StatItem = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-indigo-600 mb-1">{value}</div>
    <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, desc, bgClass }) => (
  <div className="premium-card group">
    <div className={`w-14 h-14 rounded-2xl ${bgClass} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const StepItem = ({ number, title, desc }) => (
  <div className="flex gap-6">
    <div className="flex-shrink-0 text-3xl font-black text-indigo-100">{number}</div>
    <div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-500">{desc}</p>
    </div>
  </div>
);

export default Home;
