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
    name: string;
    type?: string;
    usNews?: {
        id: string;
        description: string;
    };
    location?: string;
    tuition?: number;
    enrollment?: number;
    acceptanceRate?: number;
    usNewsOverallRank?: number; // Overall rank from US News
    photos: {
        thumb?: string | null; // URL to thumbnail image
        medium?: string | null; // URL to medium-sized image
        large?: string | null; // URL to large image
        small?: string | null; // URL to small image
    }
    // Add more fields as needed based on your data structure
};
