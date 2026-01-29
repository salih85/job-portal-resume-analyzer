import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>{job.title}</h5>
        <p>{job.description}</p>
        <small>{job.location}</small>
        <div className="mt-2">
          <Link to={`/apply/${job._id}`} className="btn btn-sm btn-primary">
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
