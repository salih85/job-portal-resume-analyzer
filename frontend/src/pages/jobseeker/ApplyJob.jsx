import { useParams } from "react-router-dom";
import { applyJob } from "../../api/applicationApi";

const ApplyJob = () => {
  const { jobId } = useParams();

  const apply = async () => {
    await applyJob({ jobId });
    alert("Applied successfully");
  };

  return (
    <div className="container mt-4">
      <h2>Apply Job</h2>
      <button onClick={apply} className="btn btn-success">
        Confirm Apply
      </button>
    </div>
  );
};

export default ApplyJob;
