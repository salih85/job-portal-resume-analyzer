import Navbar from "../common/Navbar";

const JobSeekerLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-8 flex-grow">
        {children}
      </main>
      <footer className="py-6 border-t mt-auto">
        <div className="container text-center text-muted text-sm">
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default JobSeekerLayout;

