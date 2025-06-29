import { Essay, Extracurriculars, Honors } from "@/types/user";
import React, { useEffect } from "react";

export default function Page() {
  const [essays, setEssays] = React.useState([]);
  const [extracurriculars, setExtracurriculars] = React.useState([]);
  const [honors, setHonors] = React.useState([]);
  const [profile, setProfile] = React.useState({});
  const [loading, setLoading] = React.useState(true);

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
      const response = await fetch("/api/application/profile");
      if (!response.ok) {
        console.error("Failed to fetch profile");
        setProfile({});
        return;
      }
      const data = await response.json();
      setProfile(data);
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
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Application Evaluator</h1>
    {/* Put a checkbox for each Essay, Extracurricular, and Honor, with a select all button for each. */}
    <div id="essays">
      <h2 className="text-xl font-bold mb-2">Essays</h2>
      <button className="mb-2"
      onClick={
        (e) => {
          // get all checkboxes that are children of this button's parent
          e.preventDefault();
          const checkboxes = document.getElementById("essays")?.querySelectorAll("input[type='checkbox']");
          if (!checkboxes) return;
          checkboxes.forEach((checkbox) => {
            (checkbox as HTMLInputElement).checked = true;
          });
        }
      }>Select All</button>
      {essays.map((essay: Essay) => (
        <div >
          <input type="checkbox" id={`essay-${essay.id}`} />
          <label htmlFor={`essay-${essay.id}`}>{essay.name}</label>
        </div>
      ))}
    </div>
    <div id="extracurriculars">
      <h2 className="text-xl font-bold mb-2">Extracurriculars</h2>
      <button className="mb-2"
      onClick={
        (e) => {
          e.preventDefault();
          const checkboxes = document.getElementById("extracurriculars")?.querySelectorAll("input[type='checkbox']");
          if (!checkboxes) return;
          checkboxes.forEach((checkbox) => {
            (checkbox as HTMLInputElement).checked = true;
          });
        }
      }>Select All</button>
      {extracurriculars.map((extracurricular: Extracurriculars) => (
        <div>
          <input type="checkbox" id={`extracurricular-${extracurricular.id}`} />
          <label htmlFor={`extracurricular-${extracurricular.id}`}>{extracurricular.name}</label>
        </div>
      ))}
    </div>
    <div id="honors">
      <h2 className="text-xl font-bold mb-2">Honors</h2>
      <button className="mb-2"
      onClick={
        (e) => {
          e.preventDefault();
          const checkboxes = document.getElementById("honors")?.querySelectorAll("input[type='checkbox']");
          if (!checkboxes) return;
          checkboxes.forEach((checkbox) => {
            (checkbox as HTMLInputElement).checked = true;
          });
        }
      }>Select All</button>
      {honors.map((honor: Honors) => (
        <div>
          <input type="checkbox" id={`honor-${honor.id}`} />
          <label htmlFor={`honor-${honor.id}`}>{honor.name}</label>
        </div>
      ))}
    </div>
    </div>
  );
}
