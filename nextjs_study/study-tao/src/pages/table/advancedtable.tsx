import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Button, 
  HStack, 
  Input, 
  InputGroup, 
  InputLeftAddon, 
  StackDivider, 
  VStack, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  TableContainer, 
  Spinner, 
  Text,
  Select,
  Badge,
  Tooltip,
  IconButton
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

interface Album {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
}

const AdvancedTable: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Album[]>([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [sortField, setSortField] = useState<string>('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const baseurl = 'https://jsonplaceholder.typicode.com/photos'

  useEffect(() => {
    setLoading(true)
    fetch(baseurl)
      .then(response => response.json())
      .then(photosData => {
        console.log(photosData);
        // 模拟分页、搜索和排序
        let filteredData = photosData;
        
        // 搜索过滤
        if (search) {
          filteredData = photosData.filter((item: Album) => 
            item.title.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        // 排序
        filteredData.sort((a: Album, b: Album) => {
          const aVal = a[sortField as keyof Album];
          const bVal = b[sortField as keyof Album];
          
          if (typeof aVal === 'string' && typeof bVal === 'string') {
            return sortOrder === 'asc' 
              ? aVal.localeCompare(bVal)
              : bVal.localeCompare(aVal);
          }
          
          if (typeof aVal === 'number' && typeof bVal === 'number') {
            return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
          }
          
          return 0;
        });
        
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        
        setData(paginatedData)
        setTotalItems(filteredData.length)
        setLoading(false)
      })
      .catch(error => {
        console.error(error);
        setData([])
        setTotalItems(0)
        setLoading(false)
      });
  }, [currentPage, search, sortField, sortOrder, pageSize])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleBtnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log('点击了按钮');
    setCurrentPage(1) // 搜索时重置到第一页
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  }

  const totalPages = Math.ceil(totalItems / pageSize)

  const getSortIcon = (field: string) => {
    if (sortField !== field) return undefined;
    return sortOrder === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />;
  }

  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      align='stretch'
    >
      <Box display="flex" justifyContent="space-between" w="100%">
        <HStack spacing='12px'>
          <Box w='260px'>
            <InputGroup>
              <InputLeftAddon>title</InputLeftAddon>
              <Input placeholder='搜索内容输入' onChange={handleChange} />
            </InputGroup>
          </Box>
          <Box>
            <Button colorScheme='teal' size='md' onClick={handleBtnClick}>
              搜索
            </Button>
          </Box>
        </HStack>
        
        <HStack spacing={4}>
          <Text>每页显示:</Text>
          <Select 
            value={pageSize} 
            onChange={(e) => setPageSize(Number(e.target.value))}
            w="100px"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </Select>
        </HStack>
      </Box>
      
      <Box>
        {isLoading ? (
          <Box textAlign="center" py={10}>
            <Spinner size="xl" />
            <Text mt={4}>加载中...</Text>
          </Box>
        ) : (
          <TableContainer>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>
                    <HStack>
                      <Text>ID</Text>
                      <IconButton
                        aria-label="Sort by ID"
                        icon={getSortIcon('id')}
                        size="xs"
                        variant="ghost"
                        onClick={() => handleSort('id')}
                      />
                    </HStack>
                  </Th>
                  <Th>
                    <HStack>
                      <Text>标题</Text>
                      <IconButton
                        aria-label="Sort by title"
                        icon={getSortIcon('title')}
                        size="xs"
                        variant="ghost"
                        onClick={() => handleSort('title')}
                      />
                    </HStack>
                  </Th>
                  <Th>相册ID</Th>
                  <Th>缩略图</Th>
                  <Th>操作</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item.id}>
                    <Td>
                      <Badge colorScheme="blue">{item.id}</Badge>
                    </Td>
                    <Td>
                      <Tooltip label={item.title}>
                        <Text isTruncated maxW="200px">
                          {item.title}
                        </Text>
                      </Tooltip>
                    </Td>
                    <Td>
                      <Badge colorScheme="green">{item.albumId}</Badge>
                    </Td>
                    <Td>
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title} 
                        style={{ width: '50px', height: '50px', borderRadius: '4px' }} 
                      />
                    </Td>
                    <Td>
                      <HStack>
                        <Button size="sm" colorScheme="blue">查看</Button>
                        <Button size="sm" colorScheme="orange">编辑</Button>
                        <Button size="sm" colorScheme="red">删除</Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        
        {/* 分页 */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
          <Text fontSize="sm" color="gray.600">
            显示 {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, totalItems)} 条，共 {totalItems} 条
          </Text>
          <HStack spacing={2}>
            <Button 
              isDisabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              上一页
            </Button>
            <Text>
              第 {currentPage} 页，共 {totalPages} 页
            </Text>
            <Button 
              isDisabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              下一页
            </Button>
          </HStack>
        </Box>
      </Box>
    </VStack>
  );
};

export default AdvancedTable;
