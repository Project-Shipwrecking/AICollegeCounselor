export type CommonDataSetFormat = {
    id: string; // UUID
    name: string;
    acceptanceRate: string;
    applicationType: string[]; // EA, ED, RD, Rolling, SCEA, etc.
    testPolicy: string;
    gpa: {
        25: number | string;
        50: number | string;
        75: number | string;
    };
    sat: {
        25: number | string;
        50: number | string;
        75: number | string;
    };
    act: {
        25: number | string;
        50: number | string;
        75: number | string;
    };
    lor: string; // How many mandatory, how many optional, which subjects? 
};

export type CollegeBasicData = {
    id: string; // UUID
    usNews?: {
        id: string;
        description: string;
    };
    location: string; // City, State, or City, Country

    // Non-CDS related fields you might consider:
    website?: string;
    establishedYear?: number;
    mascot?: string;
    schoolType?: 'Public' | 'Private' | 'For-Profit' | 'Community College' | string;
    religiousAffiliation?: string;
    undergraduateEnrollment?: number;
    graduateEnrollment?: number;
    campusSetting?: 'Urban' | 'Suburban' | 'Rural' | string;
    // notableAlumni?: string[];
    colors?: string[];
    logoUrl?: string;
    description?: string;
    tuitionInState?: number;
    tuitionOutOfState?: number;
    // endowment?: number;
    // athleticsConference?: string;
    nickname?: string;
};