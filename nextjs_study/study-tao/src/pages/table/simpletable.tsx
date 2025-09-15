import React, { useEffect, useState } from 'react';
import { Box, Button, HStack, Input, InputGroup, InputLeftAddon, StackDivider, VStack, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Text } from '@chakra-ui/react';

interface Album {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const SimpleTable: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Album[]>([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize] = useState<number>(5)
  const [totalItems, setTotalItems] = useState<number>(0)

  const baseurl = 'https://jsonplaceholder.typicode.com/photos'

  const buildUrl = (): string => {
    const init_url = `${baseurl}?page=${currentPage}&limit=${pageSize}`
    return search ? `${init_url}&search=${encodeURIComponent(search)}` : init_url
  }

  useEffect(() => {
    setLoading(true)
    fetch(baseurl)
      .then(response => response.json())
      .then(photosData => {
        console.log(photosData);
        // 模拟分页和搜索
        let filteredData = photosData;
        if (search) {
          filteredData = photosData.filter((item: Album) => 
            item.title.toLowerCase().includes(search.toLowerCase())
          );
        }
        
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
  }, [currentPage, search])

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

  const totalPages = Math.ceil(totalItems / pageSize)

  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      align='stretch'
    >
      <Box display="flex" justifyContent="flex-end" w="100%">
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
      </Box>
      <Box>
        {isLoading ? (
          <Box textAlign="center" py={10}>
            <Spinner size="xl" />
            <Text mt={4}>加载中...</Text>
          </Box>
        ) : (
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>标题</Th>
                  <Th>缩略图</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>{item.title}</Td>
                    <Td>
                      <img src={item.thumbnailUrl} alt={item.title} style={{ width: '50px', height: '50px' }} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        
        {/* 分页 */}
        <Box display="flex" justifyContent="center" mt={4}>
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

export default SimpleTable;
