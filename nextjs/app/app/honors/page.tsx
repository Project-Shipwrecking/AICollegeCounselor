"use client";

import { Honors } from "@/types/user";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";

export default function Page() {
  const [honors, setHonors] = React.useState<
    Honors[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({
    name: '',
    grade: '',
    recognition: '',
    otherRecognition: ''
  });

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/application/honors");
      if (!response.ok) {
        console.error("Failed to fetch honors");
        setLoading(false);
        setHonors([]);
        return;
      }
      const data = await response.json();
      setHonors(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You must be logged in to view this page.</p>;

  return (
    <>
      <div className="container bg-white py-1 rounded">
        <h1 className="text-2xl font-bold mb-4">Your Honors</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {honors ? (
              honors.map((honor) => (
                <div
                  key={String(honor.id)}
                  className="border p-4 rounded"
                >
                  <h2 className="text-xl font-bold">{honor.name}</h2>
                  <p><strong>Grade:</strong> {honor.grade}</p>
                  <p><strong>Recognition Level:</strong> {honor.recognition}</p>

                  <button
                    className="btn text-white px-4 py-2 rounded hover:bg-blue-600 btn-primary"
                    onClick={async () => {
                      await fetch("/api/application/honors/", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(honor),
                      }).catch((error) => {
                        alert(
                          "Error saving honor " +
                            honor.name +
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
              <p>No honors found.</p>
            )}
          </div>
        )}
      </div>

      <br></br>
      {/* Add Honors */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Add Honor</h2>
        <form className="border p-4 rounded">
          <div className="mb-3">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="form-control w-full p-2 border rounded"
              placeholder="Honor Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Grade</label>
            <input
              type="text"
              className="form-control w-full p-2 border rounded"
              placeholder="Grade when received (e.g., 9th, 10th, 11th, 12th)"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Recognition Level</label>
            <select
              className="form-control w-full p-2 border rounded"
              value={formData.recognition}
              onChange={(e) => setFormData({ ...formData, recognition: e.target.value })}
            >
              <option value="">Select Recognition Level</option>
              <option value="international">International</option>
              <option value="national">National</option>
              <option value="state">State</option>
              <option value="regional">Regional</option>
              <option value="city">City</option>
              <option value="school">School</option>
              <option value="other">Other</option>
            </select>
            {formData.recognition === "other" && (
              <div className="mt-2">
                <label className="block mb-1">Specify Recognition Level</label>
                <input
                  type="text"
                  className="form-control w-full p-2 border rounded"
                  placeholder="Specify the recognition level"
                  value={formData.otherRecognition}
                  onChange={(e) => setFormData({ ...formData, otherRecognition: e.target.value })}
                />
              </div>
            )}
          </div>
          <button
            type="button"
            className="btn btn-primary text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={async () => {
              if (formData.name.trim()) {
                const newHonor = {
                  id: v4(),
                  name: formData.name,
                  grade: formData.grade,
                  recognition: formData.recognition === 'other' ? formData.otherRecognition : formData.recognition,
                };

                // Update local state immediately
                setHonors([...honors, newHonor]);

                // Save to database
                try {
                  await fetch("/api/application/honors/", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ honors: newHonor }),
                  });
                } catch (error) {
                  alert("Error adding honor: " + error);
                }

                // Clear the form
                setFormData({
                  name: '',
                  grade: '',
                  recognition: '',
                  otherRecognition: ''
                });
              }
            }}
          >
            Add Honor
          </button>
        </form>
      </div>
    </>
  );
}
