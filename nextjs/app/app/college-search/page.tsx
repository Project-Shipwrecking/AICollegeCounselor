"use client"

import React from "react";
import { useEffect, useState } from "react";
import type { CommonDataSetFormat, CollegeBasicData } from "@/types/college";

export default function Page() {
  const [colleges, setColleges] = useState<CollegeBasicData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/college-database/colleges")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading colleges...</div>;

  return (
    <div className="container bg-white py-1 rounded">
      {colleges.map((college, idx) => (
      <div
        key={idx}
        className="rounded m-3 p-3"
        style={{
          // border: "1px solid #ccc",
          // margin: "1rem 0",
          // padding: "1rem",
          backgroundColor: "lightblue"
        }}
      >
        <h2>{college.name}</h2>
        <p>
          <strong>Location:</strong> {college.location}
        </p>
        <p>
          <strong>Type:</strong> {college.type}
        </p>
        <p>
          <strong>Tuition:</strong> ${college.tuition ?? "N/A"}
        </p>
        <p>
          <strong>Enrollment:</strong> {college.enrollment ?? "N/A"}
        </p>
        <p>
          <strong>Acceptance Rate:</strong> {college.acceptanceRate != null ? `${college.acceptanceRate}%` : "N/A"}
        </p>
      </div>
      ))}
    </div>
  );
}
