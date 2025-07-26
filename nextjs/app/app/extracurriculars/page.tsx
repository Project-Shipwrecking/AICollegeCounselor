"use client";

import { Extracurriculars } from "@/types/user";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";

export default function Page() {
  const [extracurriculars, setExtracurriculars] = React.useState<
    Extracurriculars[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({
    name: '',
    type: '',
    otherType: '',
    leadershipPosition: '',
    years: '',
    hoursPerYear: '',
    impact: ''
  });

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/application/extracurriculars");
      if (!response.ok) {
        console.error("Failed to fetch extracurriculars");
        setLoading(false);
        setExtracurriculars([]);
        return;
      }
      const data = await response.json();
      setExtracurriculars(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You must be logged in to view this page.</p>;

  return (
    <>
      <div className="container bg-white py-1 rounded">
        <h1 className="text-2xl font-bold mb-4">Your Extracurriculars</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {extracurriculars ? (
              extracurriculars.map((extracurricular) => (
                <div
                  key={String(extracurricular.id)}
                  className="border p-4 rounded"
                >
                  <h2 className="text-xl font-bold">{extracurricular.name}</h2>

                  <button
                    className="btn text-white px-4 py-2 rounded hover:bg-blue-600 btn-primary"
                    onClick={async () => {
                      await fetch("/api/application/extracurriculars/", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(extracurricular),
                      }).catch((error) => {
                        alert(
                          "Error saving extracurricular " +
                            extracurricular.name +
                            ": " +
                            error
                        );
                      });
                    }}
                  >
                    Save
                  </button>
                </div>
              ))
            ) : (
              <p>No extracurriculars found.</p>
            )}
          </div>
        )}
      </div>

      <br></br>
      {/* Add Extracurriculars */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Add Extracurricular</h2>
        <form className="border p-4 rounded">
          <div className="mb-3">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="form-control w-full p-2 border rounded"
              placeholder="Extracurricular Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Type</label>
            <select
              className="form-control w-full p-2 border rounded"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="">Select Type</option>
              <option value="sport">Sport</option>
              <option value="club">Club</option>
              <option value="research">Research</option>
              <option value="hobby">Hobby</option>
              <option value="volunteering">Volunteering</option>
              <option value="summer program">Summer Program</option>
              <option value="job">Job</option>
              <option value="intern">Internship</option>
              <option value="other">Other</option>
            </select>
            {formData.type === "other" && (
              <div className="mt-2">
                <label className="block mb-1">Specify Type</label>
                <input
                  type="text"
                  className="form-control w-full p-2 border rounded"
                  placeholder="Specify the activity type"
                  value={formData.otherType}
                  onChange={(e) => setFormData({ ...formData, otherType: e.target.value })}
                />
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="block mb-1">Leadership Position</label>
            <input
              type="text"
              className="form-control w-full p-2 border rounded"
              placeholder="e.g., President, Captain, Member"
              value={formData.leadershipPosition}
              onChange={(e) => setFormData({ ...formData, leadershipPosition: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Years</label>
            <input
              type="number"
              min="0"
              max="4"
              className="form-control w-full p-2 border rounded"
              placeholder="Number of years"
              value={formData.years}
              onChange={(e) => setFormData({ ...formData, years: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Hours Per Year</label>
            <input
              type="number"
              min="0"
              className="form-control w-full p-2 border rounded"
              placeholder="Hours spent per year"
              value={formData.hoursPerYear}
              onChange={(e) => setFormData({ ...formData, hoursPerYear: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Impact</label>
            <textarea
              className="form-control w-full p-2 border rounded"
              placeholder="Describe the impact of this activity"
              rows={3}
              value={formData.impact}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-primary text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={async () => {
              if (formData.name.trim()) {
                const newExtracurricular = {
                  id: v4(),
                  name: formData.name,
                  type: formData.type === 'other' ? formData.otherType : formData.type,
                  leadershipPosition: formData.leadershipPosition,
                  years: formData.years ? parseInt(formData.years) : 0,
                  hoursPerYear: formData.hoursPerYear ? parseInt(formData.hoursPerYear) : 0,
                  impact: formData.impact,
                };

                // Update local state immediately
                setExtracurriculars([...extracurriculars, newExtracurricular]);

                // Save to database
                try {
                  await fetch("/api/application/extracurriculars/", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ extracurriculars: newExtracurricular }),
                  });
                } catch (error) {
                  alert("Error adding extracurricular: " + error);
                }

                // Clear the form
                setFormData({
                  name: '',
                  type: '',
                  otherType: '',
                  leadershipPosition: '',
                  years: '',
                  hoursPerYear: '',
                  impact: ''
                });
              }
            }}
          >
            Add Extracurricular
          </button>
        </form>
      </div>
    </>
  );
}
