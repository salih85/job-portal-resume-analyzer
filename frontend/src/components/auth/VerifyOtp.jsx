import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../utils/axios';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/verify-otp', { email, otp });
      navigate('/reset-password', { state: { email, otp } });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
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
            Verify OTP
          </h2>

          <form
            onSubmit={submit}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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

            {error && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '-10px' }}>
                {error}
              </p>
            )}

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
              Verify OTP
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
            Didn’t receive OTP?{' '}
            <span
              onClick={() => navigate('/forgot-password')}
              style={{
                color: '#2563eb',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Resend
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyOtp;
