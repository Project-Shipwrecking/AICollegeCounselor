export type user = {
    username: String,
    password: String,
    id: String,
    admin: boolean,
    application: {
        essays: Essay[]
        extracurriculars: Extracurriculars[]
        honors: Honors[]
    }
}

/**
 * Includes Supplementals
 */
export type Essay = {
    id: String,
    year: String, 
    school: {
        name: String,
        id: String
    },
    content: String
}

export type Extracurriculars = {
    name: String,
    type: "sport" | "club" | "research" | "hobby" | "volunteering" | "summer program" | String,
    leadershipPosition: String,
    years: String,
    hoursPerYear: String,
    impact: String
}

export type Honors = {
    name: String,
    grade: String, 
    recognition: "international" | "national" | "state" | "regional" | "city" | "school" | String
}