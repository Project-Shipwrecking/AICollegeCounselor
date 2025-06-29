require('dotenv').config()

const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");
// Remove the TypeScript type import
// const type { CollegeBasicData } = require("../nextjs/types/college");

// Load and parse the JSON data
const dataPath = path.join(__dirname, "organized_data.json");
const colleges = JSON.parse(fs.readFileSync(dataPath, "utf8"));

// MongoDB connection URI and config
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB || "init-cluster";
const collectionName = "colleges";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Prepare CollegeBasicData objects
    const docs = colleges
      .filter(college => college.id && college.name)
      .map(college => ({
        id: college.id,
        name: college.name,
        type: college.type,
        usNews: college.usNewsId
          ? { 
            id: college.usNewsId, description: college.description 
          }
          : undefined,
        location: college.location,
        // description: college.description,
        tuition: typeof college.tuition === "number" ? college.tuition : undefined,
        enrollment: typeof college.enrollment === "number" ? college.enrollment : undefined,
        acceptanceRate: college.acceptanceRate,
        usNewsOverallRank: college.rankingSortRank,
        photos: {
          thumb: college.photos?.thumb || null,
          medium: college.photos?.medium || null,
          large: college.photos?.large || null,
          small: college.photos?.small || null,
        },
        satAverage: college.testAvgs?.sat || null,
        actAverage: college.testAvgs?.act || null,

        // Add more mappings as needed
      }));

    if (docs.length === 0) {
      console.log("No valid college data to upload.");
      return;
    }
    // Delete the existing collection if it exists
    const collections = await db.listCollections({ name: collectionName }).toArray();
    if (collections.length > 0) {
      await collection.drop();
      console.log(`Dropped existing collection: ${collectionName}`);
    }

    // Insert the new documents
    const result = await collection.insertMany(docs, { ordered: false });
    console.log(`Inserted ${result.insertedCount} colleges.`);
  } catch (err) {
    console.error("Error uploading colleges:", err);
  } finally {
    await client.close();
  }
}

main();