import { useState } from 'react';
import API from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/forgot-password', { email });
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
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
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '25px',
              color: '#1e3a8a',
            }}
          >
            Forgot Password
          </h2>

          <form
            onSubmit={submit}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '15px',
                outline: 'none',
                transition: '0.2s',
              }}
            />

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
              Send OTP
            </button>
          </form>

          <p
            style={{
              textAlign: 'center',
              marginTop: '20px',
              color: '#4b5563',
              fontSize: '14px',
            }}
          >
            Remember your password?{' '}
            <span
              onClick={() => navigate('/login')}
              style={{
                color: '#2563eb',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Login
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
