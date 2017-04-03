var http = require('http');
var fs   = require('fs');

var reload = {status: false};

new http.Server(function(req,res) {
  if (req.url == '/api/reload') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(reload));
  } else if (req.url == '/index.html' || req.url == '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    var file = new fs.ReadStream('src/index.html');
    sendFile(file, res);
  } else if (req.url == '/css/libs.css') {
    res.writeHead(200, {
      'Content-Type': 'text/css',
      'Vary': 'Accept-Encoding',
      'Cache-Control': 'no-cache'
    });
    var file = new fs.ReadStream('src/css/libs.css');
    sendFile(file, res);
  } else if (req.url == '/css/main.css') {
    res.writeHead(200, {
      'Content-Type': 'text/css',
      'Vary': 'Accept-Encoding',
      'Cache-Control': 'no-cache'
    });
    var file = new fs.ReadStream('src/css/main.css');
    sendFile(file, res);
  } else if (req.url == '/js/libs.js') {
    res.writeHead(200, {
      'Content-Type': 'text/javascript',
      'Vary': 'Accept-Encoding',
      'Cache-Control': 'no-cache'
    });
    var file = new fs.ReadStream('src/js/libs.js');
    sendFile(file, res);
  }else if (req.url == '/js/frontdevbrowser.js') {
    res.writeHead(200, {
      'Content-Type': 'text/javascript',
      'Vary': 'Accept-Encoding',
      'Cache-Control': 'no-cache'
    });
    var file = new fs.ReadStream('src/js/frontdevbrowser.js');
    sendFile(file, res);
  } else if (req.url == '/js/common.js') {
    res.writeHead(200, {
      'Content-Type': 'text/javascript',
      'Vary': 'Accept-Encoding',
      'Cache-Control': 'no-cache'
    });
    var file = new fs.ReadStream('src/js/common.js');
    sendFile(file, res);
  } else {
    res.statusCode = 404;
    res.end("Page not found");
  }
}).listen(3030);

function sendFile(file, res) {
  file.pipe(res);
  file.on('error', function(err) {
    res.statusCode = 500;
    res.end("Server Error");
    console.error(err);
  });
  res.on('close', function() {
    file.destroy();
  });
}
