import type { NextApiRequest, NextApiResponse } from 'next';


function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  const { size = 'large' } = req.query;

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

  // 重定向到 placeholder 服务
  const placeholderUrl = `https://via.placeholder.com/${width}x${height}/${color}/ffffff?text=Photo+${imageId}`;
  
  res.redirect(302, placeholderUrl);
}

export default handler;
