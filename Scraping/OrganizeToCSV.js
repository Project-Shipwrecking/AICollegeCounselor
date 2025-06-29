const fs = require("fs");
const path = require("path");
const { parse } = require("json2csv");

const inputFolder = "entries";
const outputFile = "organized_data.csv";

async function convertToCSV() {
  if (!fs.existsSync(inputFolder)) {
    console.error(`Input folder "${inputFolder}" does not exist.`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(inputFolder)
    .filter((file) => file.endsWith(".json"));

  const data = files.map((file) => {
    const filePath = path.join(inputFolder, file);
    const entry = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return {
      id: entry.id,
      usNewsId: entry.us_news_id,
      type: entry.type,
      name: entry.name,
      rank: entry.rank,
      location: `${entry.location.city}, ${entry.location.state}`,
      city: entry.location.city,
      state: entry.location.state,
      tuition: entry.searchData.tuition,
      enrollment: entry.searchData.enrollment.value,
      costAfterAid: entry.searchData.costAfterAid,
      percentReceivingAid: entry.searchData.percentReceievingAid,
      acceptanceRate: entry.searchData.acceptanceRate,
      rankingSortRank: entry.rankingSortRank,
      thumb: entry.photos?.thumb || null,
      medium: entry.photos?.medium || null,
      large: entry.photos?.large || null,
      small: entry.photos?.small || null,

      // hsGpaAvg: entry.searchData.hsGpaAvg,
      // satAvg: entry.searchData.satAvg,
      // actAvg: entry.searchData.actAvg,
      // engineeringRepScore: entry.majorRankings.engineeringRepScore,
      // businessRepScore: entry.majorRankings.businessRepScore,
      // computerScienceRepScore: entry.majorRankings.computerScienceRepScore,
      // nursingRepScore: entry.majorRankings.nursingRepScore,
      // psychologyRepScore: entry.majorRankings.psychologyRepScore,
      // economicsRepScore: entry.majorRankings.economicsRepScore,
      description: entry.description,
    };
  });

  try {
    const csv = parse(data);
    fs.writeFileSync(outputFile, csv);
    console.log(`Data successfully written to ${outputFile}`);
  } catch (error) {
    console.error("Error converting data to CSV:", error.message);
  }

  const jsonOutputFile = "organized_data.json";
  fs.writeFileSync(jsonOutputFile, JSON.stringify(data, null, 2));
  console.log(`Data successfully written to ${jsonOutputFile}`);
}

if(require.main === module) {
    convertToCSV()
}

module.exports = {
    convertToCSV
}