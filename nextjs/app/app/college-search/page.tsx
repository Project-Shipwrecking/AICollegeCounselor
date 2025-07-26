"use client";

import React from "react";
import { useEffect, useState } from "react";
import type { CollegeBasicData } from "@/types/college";
import Image from "next/image";

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
        <div className="m-3">
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
                if (typeof document !== "undefined") {
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
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <br />

      <div className="container bg-white py-1 rounded">
        <div className="row">
          {colleges.map((college, idx) => (
            // Turn into a grid of cards
            // Use Bootstrap classes for responsive design
            <div key={idx} className="col-md-4 col-sm-6 col-xs-12">
              {/* Card for each college */}
              <div className="card m-3">
                <div className="card-body">
                  <h5 className="card-title">{college.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {college.location}
                  </h6>
                  <p className="card-text mb-2">
                    <strong>Type:</strong>{" "}
                    {college.type
                      ?.toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ") || "N/A"}
                    <br />
                    <strong>Tuition:</strong>
                    {" $"}
                    {college.tuition?.toLocaleString() ?? "N/A"}
                    <br />
                    <strong>Enrollment:</strong>{" "}
                    {college.enrollment?.toLocaleString() ?? "N/A"}
                    <br />
                    <strong>Acceptance Rate:</strong>{" "}
                    {college.acceptanceRate != null
                      ? `${college.acceptanceRate}%`
                      : "N/A"}
                  </p>
                  {/* add image */}
                  {college.photos?.medium && (
                    <Image
                      src={String(college.photos.large)}
                      className="card-img-top"
                      alt={`${college.name} image`}
                      width={400} // Adjust width as needed
                      height={200} // Adjust height as needed
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
