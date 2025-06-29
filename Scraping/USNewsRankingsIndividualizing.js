const { v7: uuidv7 } = require("uuid");
const fs = require("fs");
const path = require("path");

async function scrapeIndividualSchools() {
  const files = fs
    .readdirSync("data")
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.join("data", file));

  const outputFolder = "entries";

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  for (const file in files) {
    const data = JSON.parse(fs.readFileSync(files[file], "utf8")).data.items;

    data.forEach(async (item) => {
      const entry = {
        id: uuidv7(),
        us_news_id: item.institution.primaryKey,
        name: item.institution.displayName,
        url_name: item.institution.urlName,
        rank: item.rankingSortRank,
        location: {
          location: item.institution.location,
          state: item.institution.state,
          city: item.institution.city,
          zip: item.institution.zip,
        },
        rankingSortRank: item.institution.rankingSortRank,
        type: item.institution.institutionalControl,
        searchData: {
          tuition: item.searchData.tuition.rawValue,
          enrollment: {
            key: item.searchData.enrollment.dataQaId,
            value: item.searchData.enrollment.rawValue,
          },
          costAfterAid: item.searchData.costAfterAid.rawValue,
          percentReceievingAid: item.searchData.percentReceivingAid.rawValue,
          acceptanceRate: item.searchData.acceptanceRate.rawValue,
          hsGpaAvg: item.searchData.hsGpaAvg.rawValue,
          satAvg: item.searchData.satAvg.rawValue,
          actAvg: item.searchData.actAvg.rawValue,
        },

        majorRankings: {
          engineeringRepScore: item.searchData.engineeringRepScore.rawValue,
          businessRepScore: item.searchData.businessRepScore.rawValue,
          computerScienceRepScore:
            item.searchData.computerScienceRepScore.rawValue,
          nursingRepScore: item.searchData.nursingRepScore.rawValue,
          psychologyRepScore: item.searchData.psychologyRepScore.rawValue,
          economicsRepScore: item.searchData.economicsRepScore.rawValue,
        },
        testAvgs: {
          sat:
            item.searchData.testAvgs.displayValue.filter(
              (test) => test.name === "SAT"
            )[0]?.value || null,
          act:
            item.searchData.testAvgs.displayValue.filter(
              (test) => test.name === "ACT"
            )[0]?.value || null,
        },
        description: item.blurb,
        photos: {
          thumb: item.institution.primaryPhotoThumb,
          medium: item.institution.primaryPhotoMedium,
          large: item.institution.primaryPhotoCardLarge,
          small: item.institution.primaryPhotoCardSmall,
        }
      };

      const outputFile = path.join(outputFolder, `${entry.id}.json`);
      fs.writeFileSync(outputFile, JSON.stringify(entry, null, 2));
      console.log(`Saved entry for ${entry.name} to ${outputFile}`);
    });
  }
}

if(require.main === module) {
    scrapeIndividualSchools()
}

module.exports = {
    scrapeIndividualSchools
}