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

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You must be logged in to view this page.</p>;

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
  }, [essays]);

  useEffect(() => {
    const fetchEssays = async () => {
      const response = await fetch("/api/application/essay");
      const data = await response.json();
      setEssays(data);
      console.log(data);
      setLoading(false);
    };
    fetchEssays();
  }, []);

  return (
    <>
      <div className="container bg-white py-1 rounded">
        <h1 className="text-2xl font-bold mb-4">Essay Templates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div key={String(template.id)} className="border p-4 rounded">
              <h2 className="text-xl font-bold">{template.name}</h2>
              <p>{template.prompt}</p>
              <sub>{String(template.wordCount)} words </sub>
            </div>
          ))}
        </div>
      </div>

      <div className="container bg-white py-1 rounded">
        <h1 className="text-2xl font-bold mb-4">Your Essays</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {essays.map((essay) => (
              <div key={String(essay.id)} className="border p-4 rounded">
                <h2 className="text-xl font-bold">{essay.name}</h2>
                <textarea
                  className="w-full border rounded p-2 mb-2"
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
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={async () => {
                    await fetch("/api/application/essay/", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(essay),
                    }).catch((error) => {
                      alert("Error saving essay " + essay.name + ": " + error);
                    });
                  }}
                >
                  Save
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
