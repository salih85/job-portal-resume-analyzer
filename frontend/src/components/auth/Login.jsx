import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import API from '../../utils/axios';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await API.post('/auth/google-login', {
        token: credentialResponse.credential
      });
      login(res.data);
      redirectByRole(res.data.user);
    } catch {
      alert('Google login failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', form);
      login(response.data);
      redirectByRole(response.data.user);
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };


  const redirectByRole = (user) => {
    if (user.role === "jobseeker") {
      navigate("/dashboard");
    } else if (user.role === "recruiter") {
      navigate("/recruiter/dashboard");
    } else if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />

      <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
        <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-4" style={{ color: '#1e3a8a' }}>
            Login
          </h2>
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="d-flex justify-content-end mb-3">
              <Link to="/forgot-password" style={{ color: '#2563eb', textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn btn-success w-100">
              Login
            </button>
          </form>

          <div className="text-center my-3">OR</div>

          <div className="d-flex justify-content-center w-100 my-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert('Google Login Failed')}
              theme="outline"
              size="large"
              
            />
          </div>

          <p className="text-center small">
            Don’t have an account?{' '}
            <Link to="/register" style={{ color: '#2563eb', textDecoration: 'none' }}>
              Register
            </Link>
          </p>
        </div>
      </main>


    </>
  );
};

export default Login;
