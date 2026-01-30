import Navbar from "../common/Navbar";

const JobSeekerLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="jobseeker-layout">
        {children}
      </main>
    </>
  );
};

export default JobSeekerLayout;
