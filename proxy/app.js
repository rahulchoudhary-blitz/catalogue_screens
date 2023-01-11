const http = require('http');
const axios = require('axios')

const BASE_URL = "http://nushop-dashboard.kaip.in";

const getBodyData = (req, complete) => {
  let body = '';
  req.on('data', chunk => {
    // console.log('data: ', chunk);
    body += chunk
  });
  req.on('end', (chunk) => {
    // console.log(body);
    complete(body !== '' ? JSON.parse(body) : {});
  })
}

const makeAxiosRequest = (config, res) => {
  axios(config)
  .then(response => {
    res.writeHead(response.status);
    res.send(response.data);
  })
  .catch((error) => {
    res.writeHead(error.response ? error.response.status : 404);
    res.send(error.response ? error.response.data : error);
  });
}

function onRequest(req, res) {
  // console.log(`${req.method}: ${BASE_URL}${req.url}`);
  var config = {
    method: req.method,
    url: `${BASE_URL}${req.url}`,
    headers: { 
      'Cookie': req.headers.cookie,
      'wm_platform': 'dashboard',
      'wm_web_version': '16',
    }
  };
  if(req.method.toLowerCase() !== 'get') {
    getBodyData(req, (d) => {
      config.data = d;
      // console.log(config);
      makeAxiosRequest(config, res);
    })
  } else {
    makeAxiosRequest(config, res);
  }
}

const server = http.createServer((req, res) => {
  console.log('server created woho!');
  res.send = (obj) => {
    res.write(JSON.stringify(obj));
    res.end();
  }
  onRequest(req,res);
});
server.listen(8082);