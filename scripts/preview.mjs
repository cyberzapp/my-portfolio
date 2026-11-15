import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';

const base = resolve('out');
const types = {
  '.html': 'text/html; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.xml': 'application/xml; charset=utf-8',
};

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, {Allow: 'GET, HEAD'}).end();
    return;
  }
  let status = 200;
  let file;
  let data;
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    file = resolve(base, '.' + path);
    if (file !== base && !file.startsWith(base + sep)) throw new Error('Path outside the export');
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    data = await readFile(file);
  } catch {
    status = 404;
    file = join(base, '404.html');
    data = await readFile(file).catch(() => Buffer.from('Page not found'));
  }
  response.writeHead(status, {'Content-Type': types[extname(file)] || 'application/octet-stream'});
  response.end(request.method === 'HEAD' ? undefined : data);
});

server.listen(Number(process.env.PORT || 4175), '127.0.0.1', () => {
  console.log(`Export preview: http://127.0.0.1:${server.address().port}/`);
});
