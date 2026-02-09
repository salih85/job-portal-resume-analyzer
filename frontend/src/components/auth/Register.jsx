import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import API from '../../utils/axios';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });


  
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #f0f4f8, #e2e8f0)',
          padding: '20px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#1e3a8a' }}>
            Create Account
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '15px',
                outline: 'none',
                transition: '0.2s',
              }}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '15px',
                outline: 'none',
                transition: '0.2s',
              }}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '15px',
                outline: 'none',
                transition: '0.2s',
              }}
              required
            />

            <select
              name="role"
              onChange={handleChange}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '15px',
                outline: 'none',
                background: 'white',
                color: '#374151',
              }}
              required
            >
              <option value="">Select Role</option>
              <option value="jobseeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              style={{
                padding: '12px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: '0.2s',
              }}
              onMouseOver={(e) => (e.target.style.background = '#1e40af')}
              onMouseOut={(e) => (e.target.style.background = '#2563eb')}
            >
              Register
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', color: '#4b5563' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>
              Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Register;
