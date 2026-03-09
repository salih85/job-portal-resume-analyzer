import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-32 px-6 border-t border-white/5">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white mb-6 block">
              Job<span className="text-indigo-500">Portal</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Empowering careers through AI-driven intelligence. Find your next opportunity with the most advanced job matching platform.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon="fb" />
              <SocialIcon icon="tw" />
              <SocialIcon icon="ln" />
              <SocialIcon icon="ig" />
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-semibold mb-6">For Candidates</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/jobs" className="hover:text-indigo-400 transition-colors">Browse Jobs</Link></li>
              <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Create Profile</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">AI Resume Analysis</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Career Blog</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-6">For Employers</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Post a Job</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Hiring Solutions</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Recruiter Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest job trends.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 w-full"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} JobPortal AI. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-indigo-600 hover:text-white transition-all">
    <span className="text-xs uppercase font-bold">{icon}</span>
  </div>
);

export default Footer;

