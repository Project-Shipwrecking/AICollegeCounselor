"use client";

import React from "react";
import { useEffect, useState } from "react";
import type { CommonDataSetFormat, CollegeBasicData } from "@/types/college";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  // const searchParams = useSearchParams();

  const [colleges, setColleges] = useState<CollegeBasicData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/college-database/colleges?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [limit, page]);

  if (loading)
    return (
      <div className="container bg-white py-1 rounded centered">
        Loading colleges...
      </div>
    );

  return (
    <>
      <div className="container bg-white py-1 rounded">
        <div className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search colleges..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const value = (e.target as HTMLInputElement).value;
                  setLoading(true);
                  setPage(1);
                  fetch(
                    `/api/college-database/colleges?search=${encodeURIComponent(
                      value
                    )}&page=1&limit=${limit}`
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      setColleges(data);
                      setLoading(false);
                    })
                    .catch(() => setLoading(false));
                }
              }}
              id="college-search-input"
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                const input = document.getElementById(
                  "college-search-input"
                ) as HTMLInputElement | null;
                const value = input?.value ?? "";
                setLoading(true);
                setPage(1);
                fetch(
                  `/api/college-database/colleges?search=${encodeURIComponent(
                    value
                  )}&page=1&limit=${limit}`
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setColleges(data);
                    setLoading(false);
                  })
                  .catch(() => setLoading(false));
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <br />

      <div className="container bg-white py-1 rounded">
        {colleges.map((college, idx) => (
          <div
            key={idx}
            className="rounded m-3 p-3"
            style={{
              backgroundColor: "lightblue",
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
              <strong>Acceptance Rate:</strong>{" "}
              {college.acceptanceRate != null
                ? `${college.acceptanceRate}%`
                : "N/A"}
            </p>
          </div>
        ))}
        <div className="d-flex justify-content-center my-4">
          <div className="d-flex align-items-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn btn-secondary"
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={colleges.length < limit}
              className="btn btn-secondary"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
