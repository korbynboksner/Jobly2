import React, { useContext, useState, useEffect } from "react";
import UserContext from "./userContext";
import JoblyApi from "./api";

function JobCard({ id, title, salary, equity }) {
  const { currentUser } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setApplied(currentUser.applications.includes(id));
    }
  }, [id, currentUser]);

  async function handleApply() {
    if (applied) return;

    try {
      await JoblyApi.applyToJob(currentUser.username, id);
      setApplied(true);
    } catch (err) {
      console.error("Failed to apply to job:", err);
    }
  }

  return (
    <div className="JobCard">
      <h4>{title}</h4>
      <p>Salary: {salary}</p>
      <p>Equity: {equity}</p>
      <button
        onClick={handleApply}
        disabled={applied}
      >
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;