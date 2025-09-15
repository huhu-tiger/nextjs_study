import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  Button, 
  Input, 
  HStack, 
  Spinner, 
  Alert, 
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Select,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

const TankQueryAdvancedTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof User>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>加载中...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        加载失败: {error.message}
      </Alert>
    );
  }

  // 搜索和排序逻辑
  const filteredAndSortedUsers = users
    ?.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    }) || [];

  // 分页逻辑
  const totalPages = Math.ceil(filteredAndSortedUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, startIndex + pageSize);

  const handleSort = (field: keyof User) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading as="h1" size="xl" color="green.600">
          TanStack Query 高级表格
        </Heading>
        <Text fontSize="lg" color="gray.600" mt={2}>
          结合 TanStack Query 和表格功能的高级数据展示
        </Text>
      </Box>
      
      {/* 搜索和过滤 */}
      <Box>
        <HStack spacing={4} mb={4}>
          <InputGroup w="300px">
            <InputLeftAddon>搜索</InputLeftAddon>
            <Input
              placeholder="搜索姓名、邮箱或公司"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </InputGroup>
          <Button onClick={handleSearch} colorScheme="blue">
            搜索
          </Button>
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            w="120px"
          >
            <option value={5}>5条/页</option>
            <option value={10}>10条/页</option>
            <option value={20}>20条/页</option>
          </Select>
        </HStack>
      </Box>

      {/* 表格 */}
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('id')}
                  size="sm"
                >
                  ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Button>
              </Th>
              <Th>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  size="sm"
                >
                  姓名 {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Button>
              </Th>
              <Th>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('email')}
                  size="sm"
                >
                  邮箱 {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Button>
              </Th>
              <Th>电话</Th>
              <Th>公司</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedUsers.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <Badge colorScheme="blue">{user.id}</Badge>
                </Td>
                <Td>
                  <Text fontWeight="bold">{user.name}</Text>
                  <Text fontSize="sm" color="gray.600">@{user.username}</Text>
                </Td>
                <Td>
                  <Text fontSize="sm">{user.email}</Text>
                </Td>
                <Td>
                  <Text fontSize="sm">{user.phone}</Text>
                </Td>
                <Td>
                  <Text fontSize="sm" fontWeight="bold">{user.company.name}</Text>
                  <Text fontSize="xs" color="gray.600">{user.company.catchPhrase}</Text>
                </Td>
                <Td>
                  <HStack>
                    <Button size="sm" colorScheme="blue">查看</Button>
                    <Button size="sm" colorScheme="orange">编辑</Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* 分页 */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="sm" color="gray.600">
          显示 {startIndex + 1} - {Math.min(startIndex + pageSize, filteredAndSortedUsers.length)} 条，
          共 {filteredAndSortedUsers.length} 条
        </Text>
        <HStack>
          <Button
            isDisabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            size="sm"
          >
            上一页
          </Button>
          <Text>
            第 {currentPage} 页，共 {totalPages} 页
          </Text>
          <Button
            isDisabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            size="sm"
          >
            下一页
          </Button>
        </HStack>
      </Box>
      
      <Box p={4} bg="gray.50" borderRadius="md">
        <Text fontSize="sm" color="gray.600">
          <Text as="span" fontWeight="bold">功能特性：</Text>
          <br />• TanStack Query 自动缓存和同步
          <br />• 实时搜索和排序
          <br />• 分页显示
          <br />• 响应式表格设计
          <br />• 错误处理和加载状态
        </Text>
      </Box>
    </VStack>
  );
};

export default TankQueryAdvancedTable;
