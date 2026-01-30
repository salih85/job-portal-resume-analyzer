import { useEffect, useState } from "react";
import API from "../../utils/axios";
import Navbar from "../../components/common/Navbar";  

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const jobSeekers = users.filter(u => u.role === "jobseeker");
  const recruiters = users.filter(u => u.role === "recruiter");

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        {/* USERS TABLE */}
        <h3>Job Seekers</h3>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {jobSeekers.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* RECRUITERS TABLE */}
        <h3 className="mt-5">Recruiters</h3>
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-secondary">
            <tr>
              <th>#</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>{r.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
