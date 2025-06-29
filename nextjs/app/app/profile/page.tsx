"use client";

import { Profile, user } from "@/types/user";
import React, { useEffect } from "react";

export default function Page() {
  const [userData, setUserData] = React.useState<user | null>({
    username: "",
    password: "",
    admin: false,
    id: "",
    application: {
      essays: [],
      extracurriculars: [],
      honors: [],
    },
    profile: {
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
    },
  });
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
  const [loading, setLoading] = React.useState(true);
  const [newApScore, setNewApScore] = React.useState({
    subject: "",
    score: "",
    year: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/application/profile");
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setUserData(data.user);
        setProfile(data.profile);
        // If profile is null, initialize it with default values
        if (!data.profile) {
          setProfile({
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
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="container bg-white py-1 rounded">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
            <div>
              {/* change each p to a text input  */}
              <label className="block mb-2 me-2">
                <strong>Graduation Year:</strong>
              </label>
              <input
                type="text"
                value={String(profile.graduationYear)}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    graduationYear: e.target.value,
                  })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>Gender:</strong>
              </label>
              <input
                type="text"
                value={String(profile.gender)}
                onChange={(e) =>
                  setProfile({ ...profile, gender: e.target.value })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>Race:</strong>
              </label>
              <input
                type="text"
                value={String(profile.race)}
                onChange={(e) =>
                  setProfile({ ...profile, race: e.target.value })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>State:</strong>
              </label>
              <input
                type="text"
                value={String(profile.state)}
                onChange={(e) =>
                  setProfile({ ...profile, state: e.target.value })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>Country:</strong>
              </label>
              <input
                type="text"
                value={String(profile.country)}
                onChange={(e) =>
                  setProfile({ ...profile, country: e.target.value })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>Unweighted GPA:</strong>
              </label>
              <input
                type="text"
                value={String(profile.unweightedGPA)}
                onChange={(e) =>
                  setProfile({ ...profile, unweightedGPA: e.target.value })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>Weighted GPA:</strong>
              </label>
              <input
                type="text"
                value={String(profile.weightedGPA)}
                onChange={(e) =>
                  setProfile({ ...profile, weightedGPA: e.target.value })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>Class Rank:</strong>
              </label>
              <input
                type="text"
                value={String(profile.classRank)}
                onChange={(e) =>
                  setProfile({ ...profile, classRank: e.target.value })
                }
              />
              
              <br />
              <label className="block mb-2 me-2">
                <strong>Class Size:</strong>
              </label>
              <input
                type="text"
                value={String(profile.classSize)}
                onChange={(e) =>
                  setProfile({ ...profile, classSize: e.target.value })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>School Name:</strong>
              </label>
              <input
                type="text"
                value={String(profile.school.name)}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    school: { ...profile.school, name: e.target.value },
                  })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>School ID:</strong>
              </label>
              <input
                type="text"
                value={String(profile.school.id)}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    school: { ...profile.school, id: e.target.value },
                  })
                }
              />
              
              <br />
              <label className="block mb-2 me-2">
                <strong>School Type:</strong>
              </label>
              <input
                type="text"
                value={String(profile.schoolType)}
                onChange={(e) =>
                  setProfile({ ...profile, schoolType: e.target.value })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>School Location:</strong>
              </label>
              <input
                type="text"
                value={String(profile.schoolLocation)}
                onChange={(e) =>
                  setProfile({ ...profile, schoolLocation: e.target.value })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>School Size:</strong>
              </label>
              <input
                type="text"
                value={String(profile.schoolSize)}
                onChange={(e) =>
                  setProfile({ ...profile, schoolSize: e.target.value })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>SAT Score:</strong>
              </label>
              <input
                type="text"
                value={String(profile.satScore)}
                onChange={(e) =>
                  setProfile({ ...profile, satScore: e.target.value })
                }
              />
              <br />
              <label className="block mb-2 me-2">
                <strong>ACT Score:</strong>
              </label>
              <input
                type="text"
                value={String(profile.actScore)}
                onChange={(e) =>
                  setProfile({ ...profile, actScore: e.target.value })
                }
              />
              <br />
              <p>
                <strong>AP Scores:</strong>
              </p>
              <ul>
                {profile.apScores.map((score) => (
                  <li key={String(score.subject)}>
                    {score.subject}: {score.score} ({score.year})
                  </li>
                ))}
              </ul>
              {/* Add AP Score div */}
              <div>
                <h2 className="text-xl font-bold mb-2">AP Scores</h2>
                {profile.apScores.map((apScore) => (
                  <div key={String(apScore.subject)}>
                    <input
                      type="text"
                      value={String(apScore.subject)}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          apScores: profile.apScores.map((s) =>
                            s.subject === apScore.subject
                              ? { ...s, subject: e.target.value }
                              : s
                          ),
                        })
                      }
                    />
                    <input
                      type="text"
                      value={String(apScore.score)}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          apScores: profile.apScores.map((s) =>
                            s.subject === apScore.subject
                              ? { ...s, score: e.target.value }
                              : s
                          ),
                        })
                      }
                    />
                    <input
                      type="text"
                      value={String(apScore.year)}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          apScores: profile.apScores.map((s) =>
                            s.subject === apScore.subject
                              ? { ...s, year: e.target.value }
                              : s
                          ),
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Allow the user to manually add fields to the AP Scores */}
              <div>
                <h2 className="text-xl font-bold mb-2">Add AP Score</h2>
                <input
                  type="text"
                  placeholder="Subject"
                  value={newApScore.subject}
                  onChange={(e) =>
                    setNewApScore({ ...newApScore, subject: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Score"
                  value={newApScore.score}
                  onChange={(e) =>
                    setNewApScore({ ...newApScore, score: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={newApScore.year}
                  onChange={(e) =>
                    setNewApScore({ ...newApScore, year: e.target.value })
                  }
                />
                <button
                  className="btn btn-primary m-2"
                  onClick={() => {
                    setProfile({
                      ...profile,
                      apScores: [...profile.apScores, newApScore],
                    });
                    setNewApScore({ subject: "", score: "", year: "" });
                  }}
                >
                  Add
                </button>
              </div>

              {/* Save Button */}
              <button
                className="btn btn-primary m-2"
                onClick={async () => {
                  // Save profile changes
                  const res = await fetch("/api/profile", {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(profile),
                  });
                  const data = await res.json();
                  if (res.ok) {
                    // Handle successful profile update
                    console.log("Profile updated successfully:", data);
                  } else {
                    // Handle error
                    console.error("Error updating profile:", data);
                  }

                }}
              >
                Save
              </button>
            </div>
        </div>
      )}
    </div>
  );
}
