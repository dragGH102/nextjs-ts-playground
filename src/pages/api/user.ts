export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'POST') {
    res.end(JSON.stringify({ name: 'A POST John Doe' }));
  } else if (req.method === 'GET') {
    res.end(JSON.stringify({ name: 'A GET John Doe' }));
  }
}
