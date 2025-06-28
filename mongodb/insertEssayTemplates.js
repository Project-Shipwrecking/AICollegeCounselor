require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

const client = new MongoClient(uri);

const essayTemplate = [
    {
        /**
         * Common App Prompts
         */
        id: 1,
        name: "Common App Prompt #1",
        prompt: "Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 2,
        name: "Common App Prompt #2",
        prompt: "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 3,
        name: "Common App Prompt #3",
        prompt: "Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 4,
        name: "Common App Prompt #4",
        prompt: "Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 5,
        name: "Common App Prompt #5",
        prompt: "Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 6,
        name: "Common App Prompt #6",
        prompt: "Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 7,
        name: "Common App Prompt #7",
        prompt: "Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    /**
     * Coalition App Prompts
     */
    {
        id: 11,
        name: "Coalition App Prompt #1",
        prompt: "Tell a story from your life, describing an experience that either demonstrates your character or helped to shape it.",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 12,
        name: "Coalition App Prompt #2",
        prompt: "What interests or excites you? How does it shape who you are now or who you might become in the future?",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 13,
        name: "Coalition App Prompt #3",
        prompt: "Describe a time when you had a positive impact on others. What were the challenges? What were the rewards?",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 14,
        name: "Coalition App Prompt #4",
        prompt: "Has there been a time when an idea or belief of yours was questioned? How did you respond? What did you learn?",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 15,
        name: "Coalition App Prompt #5",
        prompt: "What success have you achieved or obstacle have you faced? What advice would you give a sibling or friend going through a similar experience?",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 16,
        name: "Coalition App Prompt #6",
        prompt: "Submit an essay on a topic of your choice.",
        wordCount: 650,
        year: "2025",
        content: "",
        school: null,
    },
    /**
     * UC Application Prompts
     */
    {
        id: 21,
        name: "UC Prompt #1",
        prompt: "Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes or contributed to group efforts over time.",
        wordCount: 350,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 22,
        name: "UC Prompt #2",
        prompt: "Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.",
        wordCount: 350,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 23,
        name: "UC Prompt #3",
        prompt: "What would you say is your greatest talent or skill? How have you developed and demonstrated that talent over time?",
        wordCount: 350,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 24,
        name: "UC Prompt #4",
        prompt: "Describe how you have taken advantage of a significant educational opportunity or worked to overcome an educational barrier you have faced.",
        wordCount: 350,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 25,
        name: "UC Prompt #5",
        prompt: "Describe the most significant challenge you have faced and the steps you have taken to overcome this challenge. How has this challenge affected your academic achievement?",
        wordCount: 350,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 26,
        name: "UC Prompt #6",
        prompt: "Think about an academic subject that inspires you. Describe how you have furthered this interest inside and/or outside of the classroom.",
        wordCount: 350,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 27,
        name: "UC Prompt #7",
        prompt: "What have you done to make your school or your community a better place?",
        wordCount: 350,
        year: "2025",
        content: "",
        school: null,
    },
    {
        id: 28,
        name: "UC Prompt #8",
        prompt: "Beyond what has already been shared in your application, what do you believe makes you a strong candidate for admissions to the University of California?",
        wordCount: 350,
        year: "2025",
        content: "",
        school: null,
    }
];

async function insertEssayTemplates() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('essays');

    // Clear existing templates
    await collection.deleteMany({});

    // Insert new templates
    const result = await collection.insertMany(essayTemplate);
    console.log(`${result.insertedCount} essay templates inserted successfully.`);
  } catch (error) {
    console.error('Error inserting essay templates:', error);
  } finally {
    await client.close();
  }
}

insertEssayTemplates();
