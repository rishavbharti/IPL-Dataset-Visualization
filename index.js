const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByEachTeam = require("./ipl/matchesWonByEachTeam");
const extraRuns = require("./ipl/extraRuns")
const economyBowlers = require("./ipl/economyBowlers")
const stadiums = require("./ipl/stadiums")

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES = './csv_data/deliveries.csv'
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() 
{
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      let result1 = matchesPlayedPerYear(matches);
      let result2 = matchesWonByEachTeam(matches);
      let result5 = stadiums(matches);
      csv()
        .fromFile(DELIVERIES)
        .then(deliveries => {
            let result3 = extraRuns(matches, deliveries)
            let result4 = economyBowlers(matches, deliveries)
            save(result1, result2, result3, result4, result5)
      })
    });
}

function save(result1, result2, result3, result4, result5) 
{
    const jsonData = {
      matchesPlayedPerYear: result1,
      matchesWonByEachTeam: result2,
      extraRuns: result3,
      economyBowlers: result4,
      stadiums: result5
    };
    const jsonString = JSON.stringify(jsonData);
    fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
      if (err) {
        console.error(err);
      }
    });
}

main();