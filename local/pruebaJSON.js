
const options = {  
    url: 'https://www.reddit.com/r/funny.json',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    }
};

var request = require('request');
request.post(options, function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  var prueba = {
  	name: 'name',
  	data: 'file',
  	MAC: 'mac'
  }
  res.end(JSON.stringify(prueba));
});