const http = require('http')
const fs = require('fs')
const path = require('path')

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
}

const distDir = path.join(__dirname, 'dist')

http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url)
  if (!fs.existsSync(filePath)) filePath = path.join(distDir, 'index.html')
  const ext = path.extname(filePath)
  const mime = mimeTypes[ext] || 'text/plain'
  res.setHeader('Content-Type', mime)
  res.setHeader('Access-Control-Allow-Origin', '*')
  fs.createReadStream(filePath).pipe(res)
}).listen(3000, '0.0.0.0', () => {
  console.log('Static server running at http://localhost:3000')
})
