const http = require('http');

const serviceName = process.env.SERVICE_NAME || 'weather-service';
const port = Number(process.env.PORT || 3000);

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

http.createServer((req, res) => {
  if (req.url === '/health') return send(res, 200, { status: 'ok', service: serviceName });
  return send(res, 501, { service: serviceName, message: 'Planned service placeholder. Open-Meteo is currently called by the frontend server.' });
}).listen(port, () => {
  console.log(`${serviceName} placeholder listening on ${port}`);
});
