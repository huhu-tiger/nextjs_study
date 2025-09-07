import type { NextApiRequest, NextApiResponse } from 'next';
import type {AdvancedPaginationParams, AdvancedResult} from "../../../public/tableInterface";

// 扩展的模拟数据
const mockPhotos = Array.from({ length: 500 }, (_, index) => ({
  albumId: Math.floor(index / 20) + 1,
  id: index + 1,
  title: `Photo ${index + 1} - ${getRandomTitle()}`,
  url: `http://localhost:3001/api/image/generate/${index + 1}?size=large`,
  thumbnailUrl: `http://localhost:3001/api/image/generate/${index + 1}?size=thumbnail`,
  category: getRandomCategory(),
  tags: getRandomTags(),
  createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  views: Math.floor(Math.random() * 10000),
  likes: Math.floor(Math.random() * 1000),
}));

function getRandomTitle() {
  const titles = [
    'Beautiful Landscape',
    'Urban Architecture',
    'Nature Photography',
    'Portrait Session',
    'Street Photography',
    'Wildlife Shot',
    'Abstract Art',
    'Travel Memory',
    'Family Moment',
    'Creative Design'
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomColor() {
  const colors = ['0066cc', 'cc6600', '00cc66', 'cc0066', '6600cc', 'cccc00'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomCategory() {
  const categories = ['Nature', 'Urban', 'Portrait', 'Abstract', 'Travel', 'Art'];
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomTags() {
  const allTags = ['photography', 'nature', 'urban', 'portrait', 'abstract', 'travel', 'art', 'beautiful', 'creative', 'amazing'];
  const numTags = Math.floor(Math.random() * 3) + 1;
  return allTags.sort(() => 0.5 - Math.random()).slice(0, numTags);
}



function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { 
    page = '1', 
    limit = '10', 
    search = '', 
    category = '',
    sortBy = 'id',
    sortOrder = 'asc'
  }: AdvancedPaginationParams = req.query;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  const searchTerm = search as string;
  const categoryFilter = category as string;

  // 验证参数
  if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
    return res.status(400).json({ 
      message: 'Invalid pagination parameters',
      error: 'Page and limit must be positive numbers'
    });
  }

  if (limitNum > 100) {
    return res.status(400).json({ 
      message: 'Limit too high',
      error: 'Maximum limit is 100'
    });
  }

  // 过滤数据
  let filteredData = mockPhotos;

  // 搜索过滤
  if (searchTerm) {
    filteredData = filteredData.filter(photo => 
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.id.toString().includes(searchTerm) ||
      photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  // 分类过滤
  if (categoryFilter) {
    filteredData = filteredData.filter(photo => 
      photo.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  // 排序
  const validSortFields = ['id', 'title', 'createdAt', 'views', 'likes', 'category'];
  const sortField = validSortFields.includes(sortBy as string) ? sortBy as string : 'id';
  const order = sortOrder === 'desc' ? -1 : 1;

  filteredData.sort((a, b) => {
    const aVal = a[sortField as keyof typeof a];
    const bVal = b[sortField as keyof typeof b];

    if (typeof aVal === 'string') {
      return aVal.localeCompare(bVal as string) * order;
    }
    if (typeof aVal === 'number') {
      return (aVal - (bVal as number)) * order;
    }
    return 0;
  });

  // 计算分页
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / limitNum);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // 获取可用的分类
  const availableCategories = Array.from(new Set(mockPhotos.map(photo => photo.category)));
  const result:AdvancedResult= {
    data: paginatedData,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalItems,
      itemsPerPage: limitNum,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalItems),
    },
    filters: {
      search: searchTerm,
      category: categoryFilter,
      sortBy: sortField,
      sortOrder: sortOrder ,
    },
    metadata: {
      availableCategories,
      totalPhotos: mockPhotos.length,
      filteredCount: totalItems,
    },
  }
  // 返回响应
  res.status(200).json(result);
}

export default handler;
