const http = require('http');

const serviceName = process.env.SERVICE_NAME || 'impressions-service';
const port = Number(process.env.PORT || 3000);

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

http.createServer((req, res) => {
  if (req.url === '/health') return send(res, 200, { status: 'ok', service: serviceName });
  return send(res, 501, { service: serviceName, message: 'Planned service placeholder. Frontend uses local fallback data until this is implemented.' });
}).listen(port, () => {
  console.log(`${serviceName} placeholder listening on ${port}`);
});
