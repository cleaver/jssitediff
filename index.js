const axios = require('axios');
const cheerio = require('cheerio');
const http = require('http');
const crawl = require('./src/api/handlers/crawl');

const PORT = 1337;
const hostname = 'http://localhost:9000';
const url = new URL(hostname);
const visitedUrls = new Set();

crawl(
  url,
  3,
  (path, status, page) => {
    if (status.status >= 400) {
      console.log(path.href, ' -> ', status.status, status.statusText);
    } else {
      console.log(path.href, ' -> ', page('title').text());
    }
  },
  (url) => {
    if (visitedUrls.has(url.href)) {
      return true;
    }
    visitedUrls.add(url.href);
    return false;
  }
);
return;

// const server = http.createServer((req, res) => {
//   axios
//     .get('http://example.com')
//     .then((response) => {
//       const $ = cheerio.load(response.data);
//       const title = $('title').text();
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'text/html');
//       res.end(`<h1>${title}</h1>`);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

// server.listen(PORT, () => {
//   console.log(`Server running at PORT:${PORT}`);
// });
