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
import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { AdvancedBaseTable } from "./components/AdvancedBaseTable";
import type { AdvancedFinalResult, AdvancedResult, Photo } from "../../../public/type.d"
import axios from 'axios';
import {PhotoAdvancedUrl} from '../../config/api';
import { CustomStore } from './store/CustomStore';
const baseurl = PhotoAdvancedUrl


const TankQueryAdvancedTable: React.FC = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    // const [isLoading, setLoading] = useState<boolean>(true);
    // const [data, setData] = useState<Photo[]>([]);
    const [search, setSearch] = useState('');
    // const [isSearch, setIsSearch] = useState<number>(0) // 不再需要，使用 queryClient.invalidateQueries
    const [category, setCategory] = useState('');
    // const [sortBy, setSortBy] = useState('id');
    const {sortBy, setSortBy, sortOrder, setSortOrder} = CustomStore()
    // const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(10);
    // const [totalItems, setTotalItems] = useState<number>(0);
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [url, setUrl] = useState<string>(`${baseurl}?page=1&limit=10`);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>('');


    const { isLoading = false, isError = false, data = null, error = null, isFetching = false } = useQuery({
        // keepPreviousData: true,
        // refetchOnWindowFocus: false,
        retry: false,
        cacheTime: 10,  //毫秒，缓存时间
        networkMode: 'always',
        queryKey: ['repoData', url], // 全局唯一KEY，一样的key在不同组件中同时缓存。  数组内变量 改变时自动触发
        queryFn: async () => {
            try {
                const response = await axios.get(url);
                const apiResponseData: AdvancedFinalResult = response.data;

                if (apiResponseData.code === 0 && apiResponseData.data) {
                    const apiResponse: AdvancedResult = apiResponseData.data;
                    console.log(apiResponse)
                    // setTotalItems(apiResponse.pagination.totalItems);
                    setAvailableCategories(apiResponse.metadata.availableCategories);
                    return apiResponse;
                } else {
                    // setTotalItems(0);
                    setAvailableCategories([]);
                    throw new Error(apiResponseData.message || 'API returned error');
                }
            } catch (error) {
                console.error(error);
                // setTotalItems(0);
                setAvailableCategories([]);
                throw error;
            }
        }
    })
    // 动态状态
    // const [alertStatus, setAlertStatus] = useState<"success" | "error" | "warning" | "info">("success");
    // const [alertMessage, setAlertMessage] = useState("");


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


    const ShowToast = (id: any, title: string, status: "success"|"error") => {
        toast({
            id: id,
            title: title,
            status: status,
            duration: 2000,
            isClosable: true,
        });
    }
    // Mutations
    const handleDelete = useMutation({
        mutationKey: ["delete"],
        mutationFn: async (id: number) => {
            const response = await axios({
                method: 'delete',
                url: `${baseurl}`,
                data: {
                    id: id
                },
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        },
        onSuccess: (data: any, variables: number) => {
 
            ShowToast(variables, `delete id: ${variables} success`, data.code == 0 ? "success" : "error")

            // 自动触发重新查询 - 方法1：使缓存失效
            queryClient.invalidateQueries({ queryKey: ['repoData'] })
        },
        onError: (error: any, variables: number) => {
            ShowToast(variables, `delete id: ${variables} err`, "error")
        }
    })

    const handleModifyRequest = useMutation({
        mutationKey: ["modify"],
        mutationFn: async (variables: { id: number, title: string } = { id: 0, title: '' }) => {
            console.log(variables)
            const response = await axios({
                method: 'put',
                url: `${baseurl}`,
                data: { id: variables.id, title: variables.title },
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response.data
        },
        onSuccess: (data: any, variables: { id: number, title: string }) => {
            // setmodifynfo(Object.assign({ code: 0, message: "success" }, { id: variables.id, title: variables.title }))
            console.log(data)
            ShowToast(variables, `modify id: ${variables.id} success`, data.code == 0 ? "success" : "error")
            // 退出编辑状态
            setEditingId(null);
            setEditingTitle('');
            // 自动触发重新查询 - 方法1：使缓存失效
            queryClient.invalidateQueries({ queryKey: ['repoData'] })
        },
        onError: (error: any, variables: { id: number, title: string }) => {
            // setmodifynfo(Object.assign({ code: -1, message: "error" }, { id: variables.id, title: variables.title }))
            ShowToast(variables, `modify id: ${variables.id} err`, "error")
        }
    })

    const handleModify = (item: Photo) => {
        // 如果当前行正在编辑，则保存修改
        if (editingId === item.id) {
            if (!editingTitle.trim()) {
                toast({
                    title: "标题不能为空",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
                return;
            }
            console.log(item, editingTitle)
            handleModifyRequest.mutate({ id: item.id, title: editingTitle })
        } else {
            // 进入编辑状态
            setEditingId(item.id);
            setEditingTitle(item.title);
        }
    }


    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingTitle('');
    }

    const handleSearch = () => {
        setCurrentPage(1);
        setUrl(buildUrl(1, search, category, sortBy, sortOrder));
        queryClient.invalidateQueries({ queryKey: ['repoData'] })
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);

        setUrl(buildUrl(page, search, category, sortBy, sortOrder));
        queryClient.invalidateQueries({ queryKey: ['repoData'] })
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = event.target.value;
        setCategory(newCategory);

        setCurrentPage(1);
        setUrl(buildUrl(1, search, newCategory, sortBy, sortOrder));
        queryClient.invalidateQueries({ queryKey: ['repoData'] })
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        setCurrentPage(1);
        setUrl(buildUrl(1, search, category, newSortBy, sortOrder));
        queryClient.invalidateQueries({ queryKey: ['repoData'] })
    };

    const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortOrder = event.target.value;
        setSortOrder(newSortOrder);
        setCurrentPage(1);
        setUrl(buildUrl(1, search, category, sortBy, newSortOrder));
        queryClient.invalidateQueries({ queryKey: ['repoData'] })
    };

    const clearFilters = () => {
        setSearch('');
        setCategory('');
        setSortBy('id');
        setSortOrder('asc');
        setCurrentPage(1);
        setUrl(buildUrl(1, '', '', 'id', 'asc'));
        queryClient.invalidateQueries({ queryKey: ['repoData'] })
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
                                共 {data?.pagination.totalItems} 条记录
                            </Badge>
                        </Box>
                    </HStack>
                </VStack>
            </Box>

            {/* 表格区域 */}
            <Box>
                <AdvancedBaseTable
                    url={url}
                    data={data || { data: [], pagination: { totalItems: 0, totalPages: 1, currentPage: 1, itemsPerPage: 10, hasNextPage: false, hasPrevPage: false, startIndex: 1, endIndex: 0 }, filters: { search: '', category: '', sortBy: 'id', sortOrder: 'asc' }, metadata: { availableCategories: [], totalPhotos: 0, filteredCount: 0 } }}
                    page={currentPage}
                    pageSize={pageSize}
                    isLoading={isLoading}
                    handleModify={handleModify}
                    handleDelete={handleDelete.mutate}
                    onPageChange={handlePageChange}
                    editingId={editingId}
                    editingTitle={editingTitle}
                    setEditingTitle={setEditingTitle}
                    handleCancelEdit={handleCancelEdit}
                />
            </Box>
        </VStack>
    );
};

export default TankQueryAdvancedTable;
