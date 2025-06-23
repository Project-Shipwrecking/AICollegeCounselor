const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


async function fetchData(url, i) {
    await sleep(1000); // Sleep for 1 second to avoid overwhelming the server
    console.log(`Fetching data from: ${url} (Page ${i})`);
    const response = await fetch(url,
    {
        timeout: 10000, // Set a timeout of 10 seconds
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
    });
    // console.log(`Response status: ${response.status}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Fetched data for page ${i}:`, data.meta['rel_next_page_url'] || 'No next page');

    const folder = 'data'

    const outputFile = `usnews_rankings_page_${i}.json`;

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }

    fs.writeFileSync(path.join(folder, outputFile), JSON.stringify(data, null, 2));
    console.log(`Data for page ${i} saved to ${outputFile}`);
    
    if(data.meta['rel_next_page_url']) {
        fetchData(data.meta['rel_next_page_url'], i + 1);
    }
}

if (require.main === module) {
    fetchData("https://www.usnews.com/best-colleges/api/search?format=json&schoolType=national-universities&_sort=rank&_sortDirection=asc", 0);
}

module.exports = {
    fetchData
}