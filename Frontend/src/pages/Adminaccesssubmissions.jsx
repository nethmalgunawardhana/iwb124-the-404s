import React, { useEffect, useState } from "react";

const AdminAccessSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("http://localhost:9091/admin/access");
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data);
        } else {
          console.error("Failed to fetch submissions");
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Admin Access Submissions</h2>
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id}>
            <p>Name: {submission.name}</p>
            <p>Phone Number: {submission.phone_number}</p>
            <p>Request: {submission.request}</p>
            <p>Description: {submission.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminAccessSubmissions;
