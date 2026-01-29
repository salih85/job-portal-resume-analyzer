const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>© {new Date().getFullYear()} Job Portal & Resume Analyzer</p>
      <p>Built with MERN Stack</p>
    </footer>
  );
};

const footerStyle = {
  marginTop: '50px',
  padding: '20px',
  textAlign: 'center',
  background: '#111827',
  color: '#9ca3af',
};

export default Footer;
