import type { NextApiRequest, NextApiResponse } from 'next';
import type {Photo, PaginationParams, SimpleResult} from "../../../public/type.d"
// 模拟数据
const mockPhotos = Array.from({ length: 100 }, (_, index) => ({
  albumId: Math.floor(index / 10) + 1,
  id: index + 1,
  title: `Photo ${index + 1} - Lorem ipsum dolor sit amet`,
  url: `/api/image/generate/${index + 1}?size=large`,
  thumbnailUrl: `/api/image/generate/${index + 1}?size=thumbnail`,
}));


function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  console.log(req.query)
  const { page = '1', limit = '5', search = '' }: PaginationParams = req.query;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  const searchTerm = search as string;
  console.log(page)

  // 验证参数
  if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
    return res.status(400).json({ 
      message: 'Invalid pagination parameters',
      error: 'Page and limit must be positive numbers'
    });
  }

  // 过滤数据（模拟搜索）
  let filteredData: Photo[] = mockPhotos;
  if (searchTerm) {
    filteredData= mockPhotos.filter(photo =>
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.id.toString().includes(searchTerm)
    );
  }

  // 计算分页
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / limitNum);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedData:Photo[] = filteredData.slice(startIndex, endIndex);
  const result:SimpleResult = {
    data: paginatedData,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalItems,
      itemsPerPage: limitNum,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
    search: searchTerm,
  };

  // 返回分页数据
  res.status(200).json(result);
}

export default handler;
