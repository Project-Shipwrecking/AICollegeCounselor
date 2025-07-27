"use client";

import { Essay } from "@/types/user";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
  const [templates, setTemplates] = React.useState<Essay[]>([]);
  const [essays, setEssays] = React.useState<Essay[]>([]);
  const [loading, setLoading] = React.useState(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/application/essay/templates");
      const data = await response.json();
      const filteredTemplates = data.filter(
        (template: Essay) =>
          !essays.some(
            (essay) => essay.id === template.id && essay.year === template.year
          )
      );
      setTemplates(filteredTemplates);
      setTemplates(data);
      console.log(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchEssays = async () => {
      const response = await fetch("/api/application/essay");
      if (!response.ok) {
        console.error("Failed to fetch essays");
        setLoading(false);
        setEssays([]);
        // alert("Failed to fetch essays. Please try again later.");
        return;
      }
      const data = await response.json();
      setEssays(data);
      console.log(data);
      setLoading(false);
    };
    fetchEssays();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You must be logged in to view this page.</p>;

  return (
    <>
      <div className="container bg-white py-1 rounded">
        <h1 className="text-2xl font-bold mb-4">Your Essays</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {essays ? (
              essays.map((essay) => (
                <div key={String(essay.id)} className="border p-4 rounded">
                  <h2 className="text-xl font-bold">{essay.name}</h2>
                  <p className="text-gray-600">{essay.prompt}</p>
                  <textarea
                    className="w-100 cols border p-2 my-2"
                    value={String(essay.content)}
                    onChange={(e) => {
                      const updatedEssays = essays.map((eItem) =>
                        eItem.id === essay.id
                          ? { ...eItem, content: e.target.value }
                          : eItem
                      );
                      setEssays(updatedEssays);
                    }}
                    rows={6}
                  />
                  <button
                    className="btn text-white px-4 py-2 rounded hover:bg-blue-600 btn-primary"
                    onClick={async () => {
                      await fetch("/api/application/essay/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({essay}),
                      }).catch((error) => {
                        alert(
                          "Error saving essay " + essay.name + ": " + error
                        );
                      });
                    }}
                  >
                    Save
                  </button>
                </div>
              ))
            ) : (
              <p>No essays found.</p>
            )}
          </div>
        )}
      </div>

      <br />

      <div className="container bg-white py-1 rounded">
        <h1 className="text-2xl font-bold mb-4">Essay Templates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            // Turn into cards
            <div key={String(template.id)} className="mb-4">
              <div className="card h-100 shadow-sm border-0 rounded-lg">
                <div className="card-body">
                  {/* Card Title for template.name */}
                  <h5 className="card-title h4 text-dark mb-2">
                    {template.name}
                  </h5>
                  {/* Card Text for template.prompt */}
                  <p className="card-text text-muted mb-2">{template.prompt}</p>
                  {/* Card Subtitle for template.wordCount, using a small muted text */}
                  <h6 className="card-subtitle mb-0 text-secondary">
                    {String(template.wordCount)} words
                  </h6>
                  {/* Button to add this template to your essays */}
                  <button
                    className="btn btn-primary mt-3"
                    onClick={async () => {
                      const newEssay = {
                        ...template,
                        content: "",
                      };
                      // check whether the essay already exists
                      if (essays.some((essay) => essay.id === newEssay.id)) {
                        alert("You already have an essay with this template.");
                        return;
                      }
                      setEssays([...essays, newEssay]);
                      await fetch("/api/application/essay/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          essay: newEssay,
                        }),
                      }).catch((error) => {
                        alert(
                          "Error adding essay template " +
                            template.name +
                            ": " +
                            error
                        );
                      });
                    }}
                  >
                    Add to My Essays
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
