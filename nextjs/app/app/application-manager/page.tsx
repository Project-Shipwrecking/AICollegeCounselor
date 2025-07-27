"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Essay, Extracurriculars, Honors } from "@/types/user";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [essays, setEssays] = useState<Essay[]>([]);
  const [extracurriculars, setExtracurriculars] = useState<Extracurriculars[]>(
    []
  );
  const [honors, setHonors] = useState<Honors[]>([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchEssays = () =>
      fetch("/api/application/essay").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch essays");
        return res.json();
      });

    const fetchExtracurriculars = () =>
      fetch("/api/application/extracurriculars").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch extracurriculars");
        return res.json();
      });

    const fetchHonors = () =>
      fetch("/api/application/honors").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch honors");
        return res.json();
      });

    const fetchUserData = () =>
      fetch("/api/profile").then((res) => {
        if (!res.ok) {
          console.error("Failed to fetch profile");
          return null;
        }
        return res.json();
      });

    setLoading(true);

    Promise.all([
      fetchEssays(),
      fetchExtracurriculars(),
      fetchHonors(),
      fetchUserData(),
    ])
      .then(([essays, extracurriculars, honors, userData]) => {
        setEssays(essays);
        setExtracurriculars(extracurriculars);
        setHonors(honors);
        if (userData) setUserData(userData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="container mx-auto py-4 rounded bg-white shadow-md mb-3">
      <h1 className="text-2xl font-bold mb-4">Application Manager</h1>
      <h2>Essays</h2>
      {loading && essays.length === 0 ? (
        <ul>
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className="animate-pulse h-6 bg-gray-200 rounded my-2 w-3/4"
            ></li>
          ))}
        </ul>
      ) : (
        <ul>
          {essays.length > 0 ? essays.map((essay, index) => (
            <div key={index}>
              <li>{essay.name}</li>
              <p>{essay.content}</p>
            </div>
          )) : (
            <li>No essays available.</li>
          )}
        </ul>
      )}

      <h2>Extracurriculars</h2>
      {loading && extracurriculars.length === 0 ? (
        <ul>
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className="animate-pulse h-6 bg-gray-200 rounded my-2 w-3/4"
            ></li>
          ))}
        </ul>
      ) : (
        <ul>
          {extracurriculars.length > 0 ? extracurriculars.map((extracurricular, index) => (
            <div key={index}>
              <li>{extracurricular.name}</li>
              <sub>Type: {extracurricular.type}</sub>
              <sub>Hours: {extracurricular.hoursPerYear}</sub>
              <sub>Years: {extracurricular.years}</sub>
            </div>
          )) : (
            <li>No extracurriculars available.</li>
          )}
        </ul>
      )}

      <h2>Honors</h2>
      {loading && honors.length === 0 ? (
        <ul>
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className="animate-pulse h-6 bg-gray-200 rounded my-2 w-3/4"
            ></li>
          ))}
        </ul>
      ) : (
        <ul>
          {honors.length > 0 ? honors.map((honor, index) => (
            <div key={index}>
              <li>{honor.name}</li>
              <sub>Recognition: {honor.recognition}</sub>
            </div>
          )) : (
            <li>No honors available.</li>
          )}
        </ul>
      )}
    </section>
  );
}
