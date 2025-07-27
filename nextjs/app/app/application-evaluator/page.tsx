"use client";
import { Essay, Extracurriculars, Honors, user, Profile } from "@/types/user";
import React, { useEffect } from "react";
import { SimpleMarkdown } from "@/components/SimpleMarkdown";

export default function Page() {
  const [essays, setEssays] = React.useState<Essay[]>([]);
  const [extracurriculars, setExtracurriculars] = React.useState<
    Extracurriculars[]
  >([]);
  const [honors, setHonors] = React.useState<Honors[]>([]);
  const [profile, setProfile] = React.useState<Profile>({
    graduationYear: "",
    gender: "",
    race: "",
    state: "",
    country: "",
    unweightedGPA: "",
    weightedGPA: "",
    classRank: "",
    classSize: "",
    school: {
      name: "",
      id: "",
    },
    schoolType: "",
    schoolLocation: "",
    schoolSize: "",
    satScore: "",
    actScore: "",
    apScores: [],
  });
  const [userData, setUserData] = React.useState<user>({} as user);
  const [loading, setLoading] = React.useState(true);

  // AI Suggestions
  const [suggestion, setSuggestion] = React.useState<string>("");

  useEffect(() => {
    const fetchEssays = async () => {
      const response = await fetch("/api/application/essay");
      if (!response.ok) {
        console.error("Failed to fetch essays");
        setEssays([]);
        return;
      }
      const data = await response.json();
      setEssays(data);
      setLoading(false);
    };
    const fetchExtracurriculars = async () => {
      const response = await fetch("/api/application/extracurriculars");
      if (!response.ok) {
        console.error("Failed to fetch extracurriculars");
        setExtracurriculars([]);
        return;
      }
      const data = await response.json();
      setExtracurriculars(data);
    };
    const fetchHonors = async () => {
      const response = await fetch("/api/application/honors");
      if (!response.ok) {
        console.error("Failed to fetch honors");
        setHonors([]);
        return;
      }
      const data = await response.json();
      setHonors(data);
    };
    const fetchProfile = async () => {
      const response = await fetch("/api/profile");
      if (!response.ok) {
        console.error("Failed to fetch profile");
        return;
      }
      const data = await response.json();
      setProfile(data.profile);
      setUserData(data);
    };
    Promise.all([
      fetchEssays(),
      fetchExtracurriculars(),
      fetchHonors(),
      fetchProfile(),
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 rounded bg-white shadow-md mb-3">
      <h1 className="text-2xl font-bold mb-4">Application Evaluator</h1>

      <div id="profile">
        <h2 className="text-xl font-bold mb-2">Profile</h2>
        <sub className="text-gray-500">
          To edit, go to{" "}
          <a href="/app/profile" className="text-blue-500">
            Profile
          </a>
        </sub>
        <div className="mb-4">
          <p>
            <strong>Graduation Year:</strong> {profile.graduationYear || ""}
          </p>
          <p>
            <strong>Gender:</strong> {profile.gender || ""}
          </p>
          <p>
            <strong>Race:</strong> {profile.race || ""}
          </p>
          <p>
            <strong>State:</strong> {profile.state || ""}
          </p>
          <p>
            <strong>Country:</strong> {profile.country || ""}
          </p>
          <p>
            <strong>Unweighted GPA:</strong> {profile.unweightedGPA || ""}
          </p>
          <p>
            <strong>Weighted GPA:</strong> {profile.weightedGPA || ""}
          </p>
          <p>
            <strong>Class Rank:</strong> {profile.classRank || ""}
          </p>
          <p>
            <strong>Class Size:</strong> {profile.classSize || ""}
          </p>
          <p>
            <strong>School Name:</strong> {profile.school.name || ""}
          </p>
          <p>
            <strong>School ID:</strong> {profile.school.id || ""}
          </p>
          <p>
            <strong>School Type:</strong> {profile.schoolType || ""}
          </p>
          <p>
            <strong>School Location:</strong> {profile.schoolLocation || ""}
          </p>
          <p>
            <strong>School Size:</strong> {profile.schoolSize || ""}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <strong>SAT Score:</strong> {profile.satScore || ""}
          </p>
          <p>
            <strong>ACT Score:</strong> {profile.actScore || ""}
          </p>
          <h3 className="text-lg font-bold">AP Scores</h3>
          {profile.apScores && profile.apScores.length > 0 ? (
            profile.apScores.map((score, index) => (
              <div key={index}>
                <p>
                  <strong>Subject:</strong> {score.subject || ""}
                </p>
                <p>
                  <strong>Score:</strong> {score.score || ""}
                </p>
                <p>
                  <strong>Year:</strong> {score.year || ""}
                </p>
              </div>
            ))
          ) : (
            <p>No AP scores available.</p>
          )}
        </div>
      </div>
      {/* Put a checkbox for each Essay, Extracurricular, and Honor, with a select all button for each. */}
      <div id="essays">
        <h2 className="text-xl font-bold mb-2">Essays</h2>
        <button
          className="mb-2 btn btn-primary"
          onClick={(e) => {
            // get all checkboxes that are children of this button's parent
            e.preventDefault();
            if (typeof document === "undefined") return;
            const checkboxes = document
              .getElementById("essays")
              ?.querySelectorAll("input[type='checkbox']");
            if (!checkboxes) return;
            checkboxes.forEach((checkbox) => {
              (checkbox as HTMLInputElement).checked = true;
            });
          }}
        >
          Select All
        </button>
        {essays.length > 0 ? (
          essays.map((essay: Essay, key) => (
            <div key={key} className="mb-2">
              <input type="checkbox" id={`essay-${essay.id}`} />
              <label htmlFor={`essay-${essay.id}`}>{essay.name}</label>
            </div>
          ))
        ) : (
          <p>No essays found.</p>
        )}
      </div>
      <div id="extracurriculars">
        <h2 className="text-xl font-bold mb-2">Extracurriculars</h2>
        <button
          className="mb-2 btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            if (typeof document === "undefined") return;
            const checkboxes = document
              .getElementById("extracurriculars")
              ?.querySelectorAll("input[type='checkbox']");
            if (!checkboxes) return;
            checkboxes.forEach((checkbox) => {
              (checkbox as HTMLInputElement).checked = true;
            });
          }}
        >
          Select All
        </button>
        {extracurriculars.length > 0 ? (
          extracurriculars.map((extracurricular: Extracurriculars, key) => (
            <div key={key} className="mb-2">
              <input
                type="checkbox"
                id={`extracurricular-${extracurricular.id}`}
              />
              <label htmlFor={`extracurricular-${extracurricular.id}`}>
                {extracurricular.name}
              </label>
            </div>
          ))
        ) : (
          <p>No extracurriculars found.</p>
        )}
      </div>
      <div id="honors">
        <h2 className="text-xl font-bold mb-2">Honors</h2>
        <button
          className="mb-2 btn btn-primary"
          onClick={(e) => {
        e.preventDefault();
        if (typeof document === "undefined") return;
        const checkboxes = document
          .getElementById("honors")
          ?.querySelectorAll("input[type='checkbox']");
        if (!checkboxes) return;
        checkboxes.forEach((checkbox) => {
          (checkbox as HTMLInputElement).checked = true;
        });
          }}
        >
          Select All
        </button>
        {honors.length > 0 ? (
          honors.map((honor: Honors, key) => (
        <div key={key} className="mb-2">
          <input type="checkbox" id={`honor-${honor.id}`} />
          <label htmlFor={`honor-${honor.id}`}>{honor.name}</label>
        </div>
          ))
        ) : (
          <p>No honors found.</p>
        )}
      </div>

      {/* Ask LLM for suggestions (POST https://ai.hackclub.com/chat/completions)*/}
      <button
        className="btn btn-primary mt-4 mb-2"
        onClick={async () => {
          const prompt = `You are a College Admissions Counselor AI. Based on the user's application data, identify areas for improvement and provide suggestions. The user has provided the following information:
          \nEssays: ${essays
            .map((essay) => `${essay.name}:\n${essay.content}`)
            .join(", ")}
          \nExtracurriculars: ${extracurriculars
            .map((ec) => `${ec.name}`)
            .join(", ")}
          \nHonors: ${honors.map((honor) => `${honor.name}`).join(", ")}
          \nProfile: ${Object.keys(profile)
            .map((key) => `${key}: ${profile[key as keyof Profile]}`)
            .join("\n")}`;
          const response = await fetch(
            "https://ai.hackclub.com/chat/completions",
            {
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
            }
          );

          const data = await response.json();

          if (data.hasOwnProperty("error")) {
            console.error("Error fetching suggestions:", data.error);
            return;
          }
          const suggestion = data.choices[0].message.content;
          setSuggestion(suggestion);
          console.log(data);
        }}
      >
        Get Suggestions
      </button>

      <div id="suggestion">
        <h2 className="text-xl font-bold mb-2">Suggestion</h2>
        {suggestion ? (
          <div className="border p-4 rounded">
            <SimpleMarkdown>{suggestion}</SimpleMarkdown>
          </div>
        ) : (
          <p>No suggestions available.</p>
        )}
      </div>
      <sub>Thank you to Hack Club for providing a free AI API to use!</sub>
    </div>
  );
}
