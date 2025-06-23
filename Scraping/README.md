# US News Best Colleges Scraping

USNewsRankings.js
- Scrapes the specified catalog (pagination included)
- Each page is saved under /data

USNewsRankingsIndividualizing.js
- Scrapes each college scraped through USNewsRankings
- Each saved under a unique UUIDv4 under /entries

OrganizeToCSV.js
- Converts the colleges in /entries to a comprehensive CSV
- Saved as organized_data.csv
- To be used later for the college admissions AI