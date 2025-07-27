"use client";

import { Essay } from "@/types/user";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SimpleMarkdown } from "@/components/SimpleMarkdown";

export default function Page() {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
  const [selectedEssayIndex, setSelectedEssayIndex] = useState<number | null>(null);
  const [analysisType, setAnalysisType] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchEssays = async () => {
      const response = await fetch("/api/application/essay");
      if (!response.ok) {
        console.error("Failed to fetch essays");
        setLoading(false);
        setEssays([]);
        return;
      }
      const data = await response.json();
      setEssays(data);
      setLoading(false);
    };
    fetchEssays();
  }, []);

  const handleAnalysis = async () => {
    if (!selectedEssay || !analysisType) {
      alert("Please select an essay and analysis type.");
      return;
    }

    setIsAnalyzing(true);
    setAiResponse("");

    try {
      let prompt = "";
      
      switch (analysisType) {
        case "grammar":
          prompt = `You are a writing tutor. Please review this college essay for grammar, spelling, punctuation, and overall writing quality. Provide specific suggestions for improvement:

Essay: "${selectedEssay.name}"
Prompt: "${selectedEssay.prompt}"
Content: "${selectedEssay.content}"`;
          break;
        case "structure":
          prompt = `You are a college admissions expert. Please analyze the structure and flow of this college essay. Comment on the introduction, body paragraphs, transitions, and conclusion. Suggest improvements for better organization:

Essay: "${selectedEssay.name}"
Prompt: "${selectedEssay.prompt}"
Content: "${selectedEssay.content}"`;
          break;
        case "content":
          prompt = `You are a college admissions counselor. Please analyze the content and storytelling of this college essay. Comment on the narrative, personal voice, authenticity, and how well it showcases the student's personality and experiences:

Essay: "${selectedEssay.name}"
Prompt: "${selectedEssay.prompt}"
Content: "${selectedEssay.content}"`;
          break;
        case "college-fit":
          prompt = `You are a college admissions expert. Please analyze how well this essay responds to the given prompt and demonstrates college fit. Comment on whether the essay answers the question effectively and shows why the student would be a good fit:

Essay: "${selectedEssay.name}"
Prompt: "${selectedEssay.prompt}"
Content: "${selectedEssay.content}"`;
          break;
        case "comprehensive":
          prompt = `You are a college admissions counselor. Please provide a comprehensive review of this college essay, covering grammar, structure, content, storytelling, prompt response, and overall effectiveness. Provide specific suggestions for improvement:

Essay: "${selectedEssay.name}"
Prompt: "${selectedEssay.prompt}"
Content: "${selectedEssay.content}"`;
          break;
        default:
          prompt = `Please analyze this college essay: "${selectedEssay.content}"`;
      }

      const response = await fetch("https://ai.hackclub.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: prompt,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.hasOwnProperty('error')) {
        console.error("Error fetching AI analysis:", data.error);
        alert("Error getting AI analysis: " + data.error);
        return;
      }

      const analysis = data.choices[0].message.content;
      setAiResponse(analysis);
    } catch (error) {
      alert("Error getting AI analysis: " + error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You must be logged in to view this page.</p>;

  return (
    <>
      <div className="container bg-white py-1 rounded">
        <h1 className="text-2xl font-bold mb-4">Essay AI Analysis</h1>
        <p className="text-gray-600 mb-4">
          Get AI-powered feedback and suggestions to improve your college essays.
        </p>

        {loading ? (
          <p>Loading your essays...</p>
        ) : essays.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600">You don't have any essays yet.</p>
            <a href="/app/essays/editing" className="btn btn-primary">
              Create Your First Essay
            </a>
          </div>
        ) : (
          <div className="row">
            {/* Essay Selection */}
            <div className="col-md-6">
              <h3 className="text-lg font-semibold mb-3">Select Essay</h3>
              <div className="d-flex flex-column gap-3">
                {essays.map((essay, index) => (
                  <div
                    key={`essay-${index}-${essay.id}`}
                    className={`p-3 rounded cursor-pointer transition-colors mb-2 ${
                      selectedEssayIndex === index
                        ? "border border-5 border-gray-500 bg-gray-200"
                        : "border border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedEssay(essay);
                      setSelectedEssayIndex(index);
                    }}
                  >
                    <h4 className="font-medium">{essay.name}</h4>
                    <p className="text-sm text-gray-600 truncate">{essay.prompt}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {essay.content ? `${String(essay.content).length} characters` : "No content yet"}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Essay #{index + 1} (ID: {essay.id})
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Options */}
            <div className="col-md-6">
              <h3 className="text-lg font-semibold mb-3">Analysis Type</h3>
              <div className="space-y-2">
                <div>
                  <input
                    type="radio"
                    id="grammar"
                    name="analysisType"
                    value="grammar"
                    checked={analysisType === "grammar"}
                    onChange={(e) => setAnalysisType(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="grammar">Grammar & Writing Quality</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="structure"
                    name="analysisType"
                    value="structure"
                    checked={analysisType === "structure"}
                    onChange={(e) => setAnalysisType(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="structure">Essay Structure & Flow</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="content"
                    name="analysisType"
                    value="content"
                    checked={analysisType === "content"}
                    onChange={(e) => setAnalysisType(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="content">Content & Storytelling</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="college-fit"
                    name="analysisType"
                    value="college-fit"
                    checked={analysisType === "college-fit"}
                    onChange={(e) => setAnalysisType(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="college-fit">College Fit & Prompt Response</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="comprehensive"
                    name="analysisType"
                    value="comprehensive"
                    checked={analysisType === "comprehensive"}
                    onChange={(e) => setAnalysisType(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="comprehensive">Comprehensive Review</label>
                </div>
              </div>

              <button
                className="btn btn-primary mt-4 w-100"
                onClick={handleAnalysis}
                disabled={!selectedEssay || !analysisType || isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Get AI Analysis"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected Essay Display */}
      {selectedEssay && (
        <div className="container bg-white py-1 rounded mt-3">
          <h3 className="text-lg font-semibold mb-3">Selected Essay</h3>
          <div className="border p-4 rounded">
            <h4 className="font-medium mb-2">{selectedEssay.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{selectedEssay.prompt}</p>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm whitespace-pre-wrap">
                {selectedEssay.content || "No content available for this essay."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Results */}
      {aiResponse && (
        <div className="container bg-white py-1 rounded mt-3">
          <h3 className="text-lg font-semibold mb-3">AI Analysis Results</h3>
          <div className="border p-4 rounded bg-blue-50">
            <div className="whitespace-pre-wrap text-gray-800">
              <SimpleMarkdown>{aiResponse}</SimpleMarkdown>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <p>
              <strong>Note:</strong> This analysis is generated by AI and should be used as a guide. 
              Consider getting additional feedback from teachers, counselors, or peers.
            </p>
          </div>
        </div>
      )}

      <div className="container bg-white py-1 rounded mt-3">
        <sub>Thank you to Hack Club for providing a free AI API to use!</sub>
      </div>
    </>
  );
}
