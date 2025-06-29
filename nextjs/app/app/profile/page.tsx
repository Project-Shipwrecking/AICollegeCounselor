"use client";

import { Profile, user } from "@/types/user";
import React, { useEffect } from "react";

export default function Page() {
  const [userData, setUserData] = React.useState<user | null>(null);
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);

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
          {profile ? (
            <div>
              {/* change each p to a text input  */}
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
              <input
                type="text"
                value={String(profile.gender)}
                onChange={(e) =>
                  setProfile({ ...profile, gender: e.target.value })
                }
              />
              <input
                type="text"
                value={String(profile.race)}
                onChange={(e) =>
                  setProfile({ ...profile, race: e.target.value })
                }
              />
              <input
                type="text"
                value={String(profile.state)}
                onChange={(e) =>
                  setProfile({ ...profile, state: e.target.value })
                }
              />
              <input
                type="text"
                value={String(profile.country)}
                onChange={(e) =>
                  setProfile({ ...profile, country: e.target.value })
                }
              />
              <input
                type="text"
                value={String(profile.unweightedGPA)}
                onChange={(e) =>
                  setProfile({ ...profile, unweightedGPA: e.target.value })
                }
              />
              <input
                type="text"
                value={String(profile.weightedGPA)}
                onChange={(e) =>
                  setProfile({ ...profile, weightedGPA: e.target.value })
                }
              />
              <input
                type="text"
                value={String(profile.classRank)}
                onChange={(e) =>
                  setProfile({ ...profile, classRank: e.target.value })
                }
              />
              <input
                type="text"
                value={String(profile.classSize)}
                onChange={(e) =>
                  setProfile({ ...profile, classSize: e.target.value })
                }
              />
              <input
                type="text"
                value={String(profile.school.name)}
                onChange={(e) =>
                  setProfile({ ...profile, school: { ...profile.school, name: e.target.value } })
                }
              />
              <input
                type="text"
                value={String(profile.school.id)}
                onChange={(e) =>
                  setProfile({ ...profile, school: { ...profile.school, id: e.target.value } })
                }
              />
              <input
                type="text"
                value={String(profile.schoolType)}
                onChange={(e) =>
                  setProfile({ ...profile, schoolType: e.target.value })
                }
              />
              <input
                type="text"
                value={String(profile.schoolLocation)}
                onChange={(e) =>
                  setProfile({ ...profile, schoolLocation: e.target.value })
                }
              />
              <input
                type="text"
                value={String(profile.schoolSize)}
                onChange={(e) =>
                  setProfile({ ...profile, schoolSize: e.target.value })
                }
              />
              <input
                type="text"
                value={String(profile.satScore)}
                onChange={(e) =>
                  setProfile({ ...profile, satScore: e.target.value })
                }
              />
              <input
                type="text"
                value={String(profile.actScore)}
                onChange={(e) =>
                  setProfile({ ...profile, actScore: e.target.value })
                }
              />
              <p><strong>AP Scores:</strong></p>
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

              {/* Add more fields as necessary */}
            </div>
          ) : (
            <p>No profile data available.</p>
          )}
        </div>
      )}
    </div>
  );
}
