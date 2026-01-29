import { useEffect, useState } from "react";
import API from "../../utils/axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Users</h2>

      {users.map(u => (
        <div key={u._id} className="card p-2 mb-2">
          <strong>{u.email}</strong>
          <span className="ms-2">({u.role})</span>
        </div>
      ))}
    </div>
  );
};

export default Users;
