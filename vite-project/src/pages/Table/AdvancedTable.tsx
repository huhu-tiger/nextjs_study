import React, { useEffect, useState } from 'react';
import { 
    Box, 
    Input, 
    VStack, 
    HStack, 
    Button, 
    StackDivider,
    Select,
    Text,
    Badge,
    Flex,
    Spacer
} from '@chakra-ui/react';
import { BaseTable } from "./components/BaseTable";
import type { Album } from "./typeDefine/Idata";
import axios from 'axios';

const baseurl = "http://localhost:3001/api/photos/advanced";

interface ApiResponse {
    data: Album[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    filters: {
        search: string;
        category: string;
        sortBy: string;
        sortOrder: string;
    };
    metadata: {
        availableCategories: string[];
        totalPhotos: number;
        filteredCount: number;
    };
}

const AdvancedTable: React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Album[]>([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [url, setUrl] = useState<string>(`${baseurl}?page=1&limit=10`);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response.data);
                const apiResponse: ApiResponse = response.data;
                setData(apiResponse.data);
                setTotalItems(apiResponse.pagination.totalItems);
                setAvailableCategories(apiResponse.metadata.availableCategories);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setData([]);
                setTotalItems(0);
                setLoading(false);
            });
    }, [url]);

    const buildUrl = (page: number, searchTerm: string, categoryFilter: string, sortField: string, sortDirection: string) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: pageSize.toString(),
        });

        if (searchTerm) params.append('search', searchTerm);
        if (categoryFilter) params.append('category', categoryFilter);
        if (sortField) params.append('sortBy', sortField);
        if (sortDirection) params.append('sortOrder', sortDirection);

        return `${baseurl}?${params.toString()}`;
    };

    const handleSearch = () => {
        setLoading(true);
        setCurrentPage(1);
        setUrl(buildUrl(1, search, category, sortBy, sortOrder));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setLoading(true);
        setUrl(buildUrl(page, search, category, sortBy, sortOrder));
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = event.target.value;
        setCategory(newCategory);
        setLoading(true);
        setCurrentPage(1);
        setUrl(buildUrl(1, search, newCategory, sortBy, sortOrder));
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        setLoading(true);
        setCurrentPage(1);
        setUrl(buildUrl(1, search, category, newSortBy, sortOrder));
    };

    const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortOrder = event.target.value;
        setSortOrder(newSortOrder);
        setLoading(true);
        setCurrentPage(1);
        setUrl(buildUrl(1, search, category, sortBy, newSortOrder));
    };

    const clearFilters = () => {
        setSearch('');
        setCategory('');
        setSortBy('id');
        setSortOrder('asc');
        setLoading(true);
        setCurrentPage(1);
        setUrl(buildUrl(1, '', '', 'id', 'asc'));
    };

    return (
        <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
        >
            {/* 搜索和过滤区域 */}
            <Box>
                <VStack spacing={4} align="stretch">
                    {/* 搜索行 */}
                    <Flex gap={4} align="center">
                        <Box flex="1">
                            <Input 
                                placeholder='搜索照片标题或ID' 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </Box>
                        <Button colorScheme='teal' onClick={handleSearch}>
                            搜索
                        </Button>
                        <Button variant="outline" onClick={clearFilters}>
                            清除过滤
                        </Button>
                    </Flex>

                    {/* 过滤行 */}
                    <HStack spacing={4} align="center">
                        <Box>
                            <Text fontSize="sm" mb={1}>分类:</Text>
                            <Select 
                                value={category} 
                                onChange={handleCategoryChange}
                                placeholder="所有分类"
                                size="sm"
                                w="150px"
                            >
                                {availableCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </Select>
                        </Box>

                        <Box>
                            <Text fontSize="sm" mb={1}>排序字段:</Text>
                            <Select 
                                value={sortBy} 
                                onChange={handleSortChange}
                                size="sm"
                                w="120px"
                            >
                                <option value="id">ID</option>
                                <option value="title">标题</option>
                                <option value="createdAt">创建时间</option>
                                <option value="views">浏览量</option>
                                <option value="likes">点赞数</option>
                            </Select>
                        </Box>

                        <Box>
                            <Text fontSize="sm" mb={1}>排序方向:</Text>
                            <Select 
                                value={sortOrder} 
                                onChange={handleSortOrderChange}
                                size="sm"
                                w="100px"
                            >
                                <option value="asc">升序</option>
                                <option value="desc">降序</option>
                            </Select>
                        </Box>

                        <Spacer />

                        <Box>
                            <Badge colorScheme="blue" fontSize="sm">
                                共 {totalItems} 条记录
                            </Badge>
                        </Box>
                    </HStack>
                </VStack>
            </Box>

            {/* 表格区域 */}
            <Box>
                <BaseTable 
                    url={url} 
                    data={data} 
                    page={currentPage} 
                    pageSize={pageSize} 
                    isLoading={isLoading}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                />
            </Box>
        </VStack>
    );
};

export default AdvancedTable;
