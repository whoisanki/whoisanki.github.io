const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create a PNG buffer from RGBA pixel data
function createPng(width, height, rgbaBuffer) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth 8
  ihdrData.writeUInt8(6, 9); // color type 6 (RGBA)
  ihdrData.writeUInt8(0, 10); // compression method
  ihdrData.writeUInt8(0, 11); // filter method
  ihdrData.writeUInt8(0, 12); // interlace method
  const ihdr = makeChunk('IHDR', ihdrData);

  // IDAT chunk: filter byte (0 = none) at start of each scanline
  const scanlines = [];
  for (let y = 0; y < height; y++) {
    scanlines.push(Buffer.from([0])); // Filter type None
    const start = y * width * 4;
    scanlines.push(rgbaBuffer.subarray(start, start + width * 4));
  }
  const uncompressed = Buffer.concat(scanlines);
  const compressed = zlib.deflateSync(uncompressed);
  const idat = makeChunk('IDAT', compressed);

  // IEND chunk
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuf, data]);
  const crc = crc32(crcData);

  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);

  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

// CRC32 table & calculation
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Draw Boy Developer Avatar at specified dimensions
function renderAvatar(size) {
  const buffer = Buffer.alloc(size * size * 4, 0); // RGBA

  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const idx = (y * size + x) * 4;
    // Alpha blending with existing pixel
    const existingA = buffer[idx + 3] / 255;
    const newA = a / 255;
    const outA = newA + existingA * (1 - newA);
    if (outA > 0) {
      buffer[idx] = Math.round((r * newA + buffer[idx] * existingA * (1 - newA)) / outA);
      buffer[idx + 1] = Math.round((g * newA + buffer[idx + 1] * existingA * (1 - newA)) / outA);
      buffer[idx + 2] = Math.round((b * newA + buffer[idx + 2] * existingA * (1 - newA)) / outA);
      buffer[idx + 3] = Math.round(outA * 255);
    }
  }

  function fillCircle(cx, cy, r, red, green, blue, alpha = 255) {
    const minX = Math.floor(cx - r);
    const maxX = Math.ceil(cx + r);
    const minY = Math.floor(cy - r);
    const maxY = Math.ceil(cy + r);
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const d = Math.hypot(x - cx, y - cy);
        if (d <= r) {
          const edgeAlpha = d > r - 1 ? Math.max(0, Math.min(1, r - d)) * alpha : alpha;
          setPixel(x, y, red, green, blue, edgeAlpha);
        }
      }
    }
  }

  function fillEllipse(cx, cy, rx, ry, red, green, blue, alpha = 255) {
    const minX = Math.floor(cx - rx);
    const maxX = Math.ceil(cx + rx);
    const minY = Math.floor(cy - ry);
    const maxY = Math.ceil(cy + ry);
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const d = Math.pow((x - cx) / rx, 2) + Math.pow((y - cy) / ry, 2);
        if (d <= 1) {
          const edge = Math.sqrt(d);
          const edgeAlpha = edge > 0.85 ? Math.max(0, Math.min(1, (1 - edge) / 0.15)) * alpha : alpha;
          setPixel(x, y, red, green, blue, edgeAlpha);
        }
      }
    }
  }

  function fillRect(rx, ry, rw, rh, red, green, blue, alpha = 255) {
    for (let y = ry; y < ry + rh; y++) {
      for (let x = rx; x < rx + rw; x++) {
        setPixel(x, y, red, green, blue, alpha);
      }
    }
  }

  const s = size / 64; // Scale relative to 64x64 coordinate space

  // 1. Hoodie Collar & Bust
  fillEllipse(32 * s, 60 * s, 22 * s, 10 * s, 20, 20, 24);
  fillEllipse(32 * s, 54 * s, 14 * s, 4 * s, 45, 45, 50);

  // 2. Neck
  fillRect(Math.floor(27 * s), Math.floor(40 * s), Math.ceil(10 * s), Math.ceil(12 * s), 226, 170, 133);

  // 3. Ears
  fillCircle(14 * s, 32 * s, 4.5 * s, 246, 202, 169);
  fillCircle(50 * s, 32 * s, 4.5 * s, 246, 202, 169);

  // 4. Face & Masculine Jaw Base
  fillEllipse(32 * s, 30 * s, 17 * s, 16 * s, 246, 202, 169);
  fillEllipse(32 * s, 38 * s, 12 * s, 9 * s, 246, 202, 169);

  // 5. Cheeks Blush
  fillEllipse(21 * s, 37 * s, 3.5 * s, 2 * s, 251, 113, 133, 90);
  fillEllipse(43 * s, 37 * s, 3.5 * s, 2 * s, 251, 113, 133, 90);

  // 6. Eyes (Lively Developer Gaze)
  // Left eye
  fillEllipse(23 * s, 29 * s, 4 * s, 4.5 * s, 255, 255, 255);
  fillCircle(24 * s, 29 * s, 2.8 * s, 9, 9, 11);
  fillCircle(24.8 * s, 28 * s, 1 * s, 255, 255, 255); // catchlight

  // Right eye
  fillEllipse(41 * s, 29 * s, 4 * s, 4.5 * s, 255, 255, 255);
  fillCircle(40 * s, 29 * s, 2.8 * s, 9, 9, 11);
  fillCircle(40.8 * s, 28 * s, 1 * s, 255, 255, 255); // catchlight

  // 7. Jet-Black Eyebrows
  fillRect(Math.floor(19 * s), Math.floor(22 * s), Math.ceil(9 * s), Math.max(1, Math.ceil(2 * s)), 9, 9, 11);
  fillRect(Math.floor(36 * s), Math.floor(22 * s), Math.ceil(9 * s), Math.max(1, Math.ceil(2 * s)), 9, 9, 11);

  // 8. Titanium Glasses Frames
  // Left lens frame
  for (let a = 0; a < 360; a += 10) {
    const rad = (a * Math.PI) / 180;
    const gx = 23 * s + Math.cos(rad) * 6 * s;
    const gy = 29 * s + Math.sin(rad) * 5 * s;
    fillCircle(gx, gy, Math.max(0.8, 1 * s), 40, 40, 45);
  }
  // Right lens frame
  for (let a = 0; a < 360; a += 10) {
    const rad = (a * Math.PI) / 180;
    const gx = 41 * s + Math.cos(rad) * 6 * s;
    const gy = 29 * s + Math.sin(rad) * 5 * s;
    fillCircle(gx, gy, Math.max(0.8, 1 * s), 40, 40, 45);
  }
  // Glasses bridge
  fillRect(Math.floor(28 * s), Math.floor(28 * s), Math.ceil(8 * s), Math.max(1, Math.ceil(1.5 * s)), 40, 40, 45);

  // 9. Confident Developer Smile
  fillEllipse(32 * s, 42 * s, 4 * s, 2 * s, 136, 19, 55);
  fillEllipse(32 * s, 41.2 * s, 4.2 * s, 1.8 * s, 246, 202, 169); // cutout smile curve

  // 10. Voluminous Jet-Black Hair Quiff & Fades
  fillEllipse(32 * s, 15 * s, 19 * s, 11 * s, 9, 9, 11); // Main crown volume
  fillEllipse(30 * s, 12 * s, 16 * s, 9 * s, 28, 28, 34);  // Top highlight sheen
  fillEllipse(35 * s, 10 * s, 12 * s, 7 * s, 45, 45, 52);  // Volumetric highlight quiff
  // Sideburns
  fillRect(Math.floor(15 * s), Math.floor(24 * s), Math.ceil(3 * s), Math.ceil(7 * s), 9, 9, 11);
  fillRect(Math.floor(46 * s), Math.floor(24 * s), Math.ceil(3 * s), Math.ceil(7 * s), 9, 9, 11);

  return buffer;
}

// Generate an .ico file container containing PNG icons
function createIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4); // Number of images

  let offset = 6 + pngBuffers.length * 16;
  const dirEntries = [];

  for (const { width, height, buffer } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset of image data
    dirEntries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map((p) => p.buffer)]);
}

// Generate files in public/
const publicDir = path.resolve(__dirname, '../public');

console.log('Generating multi-size PNG & ICO favicons...');
const sizes = [16, 32, 64, 180];
const pngs = {};

for (const size of sizes) {
  const rgba = renderAvatar(size);
  const pngBuf = createPng(size, size, rgba);
  pngs[size] = pngBuf;
}

fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), pngs[16]);
fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), pngs[32]);
fs.writeFileSync(path.join(publicDir, 'favicon.png'), pngs[64]);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), pngs[180]);

// Create multi-resolution .ico
const icoBuf = createIco([
  { width: 16, height: 16, buffer: pngs[16] },
  { width: 32, height: 32, buffer: pngs[32] },
  { width: 64, height: 64, buffer: pngs[64] }
]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);

console.log('✅ Generated favicon.ico, favicon.png, favicon-32x32.png, favicon-16x16.png, apple-touch-icon.png successfully!');
