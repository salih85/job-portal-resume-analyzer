import { useEffect, useState } from "react";
import API from "../../utils/axios";
import Navbar from "../../components/common/Navbar";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const jobSeekers = users.filter((u) => u.role === "jobseeker");
  const recruiters = users.filter((u) => u.role === "recruiter");

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto">

          {/* PAGE TITLE */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-800">
              Users Management
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage all platform users
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            
            <div className="bg-white rounded-xl shadow p-6 border">
              <p className="text-gray-500 text-sm">Total Job Seekers</p>
              <h2 className="text-3xl font-bold text-blue-600">
                {jobSeekers.length}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-6 border">
              <p className="text-gray-500 text-sm">Total Recruiters</p>
              <h2 className="text-3xl font-bold text-green-600">
                {recruiters.length}
              </h2>
            </div>

          </div>

          {/* JOB SEEKERS TABLE */}
          <div className="bg-white rounded-xl shadow border mb-10">
            <div className="px-6 py-4 border-b">
              <h3 className="font-semibold text-gray-700">
                Job Seekers
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left">#</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Role</th>
                  </tr>
                </thead>

                <tbody>
                  {jobSeekers.map((u, i) => (
                    <tr
                      key={u._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-3">{i + 1}</td>
                      <td className="px-6 py-3">{u.email}</td>

                      <td className="px-6 py-3">
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                          Job Seeker
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RECRUITERS TABLE */}
          <div className="bg-white rounded-xl shadow border">
            <div className="px-6 py-4 border-b">
              <h3 className="font-semibold text-gray-700">
                Recruiters
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left">#</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Role</th>
                  </tr>
                </thead>

                <tbody>
                  {recruiters.map((r, i) => (
                    <tr
                      key={r._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-3">{i + 1}</td>
                      <td className="px-6 py-3">{r.email}</td>

                      <td className="px-6 py-3">
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                          Recruiter
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Users;
