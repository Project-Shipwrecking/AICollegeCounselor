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
    // Add more fields as needed based on your data structure
};
