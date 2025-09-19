import type { NextApiRequest, NextApiResponse } from 'next';


function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, size = 'large' } = req.query;

  // 验证 ID 参数
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Invalid image ID' });
  }

  const imageId = parseInt(id, 10);
  if (isNaN(imageId) || imageId < 1 || imageId > 1000) {
    return res.status(400).json({ message: 'Image ID must be between 1 and 1000' });
  }

  // 根据 size 参数确定图片尺寸
  let width: number, height: number;
  switch (size) {
    case 'thumbnail':
      width = 150;
      height = 150;
      break;
    case 'medium':
      width = 400;
      height = 300;
      break;
    case 'large':
    default:
      width = 600;
      height = 400;
      break;
  }

  // 生成随机颜色（基于 ID 确保一致性）
  const colors = ['0066cc', 'cc6600', '00cc66', 'cc0066', '6600cc', 'cccc00', 'ff6600', '00ff66'];
  const colorIndex = imageId % colors.length;
  const color = colors[colorIndex];

  // 生成 SVG 图片
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${imageId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#${color}88;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad${imageId})"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 8}" 
            font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white">
        Photo ${imageId}
      </text>
      <text x="50%" y="70%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 16}" 
            text-anchor="middle" dominant-baseline="middle" fill="white" opacity="0.8">
        ${width}x${height}
      </text>
    </svg>
  `;

  // 设置响应头
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=3600'); // 缓存1小时
  res.setHeader('Content-Length', Buffer.byteLength(svg, 'utf8'));

  res.status(200).send(svg);
}

export default handler;
