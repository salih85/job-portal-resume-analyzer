const Loader = () => {
  return (
    <div style={wrapper}>
      <div style={spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

const wrapper = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const spinner = {
  width: '40px',
  height: '40px',
  border: '5px solid #e5e7eb',
  borderTop: '5px solid #2563eb',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

export default Loader;
