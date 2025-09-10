import React, {useEffect, useState} from 'react';
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

import { useToast } from '@chakra-ui/react'
import {AdvancedBaseTable} from "./components/AdvancedBaseTable";
import type {AdvancedFinalResult, AdvancedResult, Photo} from "../../../public/type.d"
import axios from 'axios';

const baseurl = "http://localhost:3001/api/photos/advanced";

const AdvancedTable: React.FC = () => {
    const toast = useToast();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Photo[]>([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState<number>(0)
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [url, setUrl] = useState<string>(`${baseurl}?page=1&limit=10`);
    const [delinfo ,setdelinfo] = useState<any>();
    const [modifyinfo ,setmodifynfo] = useState<any>();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>('');

    // 动态状态
    // const [alertStatus, setAlertStatus] = useState<"success" | "error" | "warning" | "info">("success");
    // const [alertMessage, setAlertMessage] = useState("");

    const runQuery = () => {
        axios.get(url)
            .then(response => {
                console.log(response.data);
                const apiResponseData: AdvancedFinalResult = response.data;
                console.log(apiResponseData)
                const apiResponse = apiResponseData.data as AdvancedResult
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
    }
    useEffect(() => {
        runQuery()
    }, [isSearch]);

    useEffect(()=>{
        ShowToast()
    },[delinfo])

    useEffect(()=>{
        ShowToast()
    },[modifyinfo])

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


    const ShowToast = () => {
        if (delinfo){
            toast({
                id: delinfo.id,
                title: `delete id:${delinfo.id} success`,
                status: delinfo.code == 0 ? "success" : "error",
                duration: 2000,
                isClosable: true,
            });
            setdelinfo(null)
        }
        if (modifyinfo){
            toast({
                id: modifyinfo.id,
                title: `modify id:${modifyinfo.id} success`,
                status: modifyinfo.code == 0 ? "success" : "error",
                duration: 2000,
                isClosable: true,
            });
            setmodifynfo(null)
        }

    }

    //删除
    const handleDelete = (id: number) => {
        axios({
            method: 'delete',
            url: `${baseurl}`,
            data: {
                id: id
            },
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            console.log(response.data);
            const apiResponseData: AdvancedFinalResult = response.data;
            console.log(apiResponseData)
            setdelinfo(Object.assign(apiResponseData, {id: id}))

            // 触发重新查询
            setIsSearch((prev) => {
                return prev + 1
            })

        })
            .catch(error => {
                console.error(error);
                setdelinfo({code: -1, message: "error"})
            });
    }

    const handleModify = (id: number, title: string) => {
        // 如果当前行正在编辑，则保存修改
        if (editingId === id) {
            if (!editingTitle.trim()) {
                toast({
                    title: "标题不能为空",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
                return;
            }

            axios({
                method: 'put',
                url: `${baseurl}`,
                data: {
                    id: id,
                    title: editingTitle
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(response => {
                console.log(response.data);
                const apiResponseData: AdvancedFinalResult = response.data;
                console.log(apiResponseData)
                setmodifynfo(Object.assign(apiResponseData, {id: id}))

                // 退出编辑状态
                setEditingId(null);
                setEditingTitle('');

                // 触发重新查询
                setIsSearch((prev) => {
                    return prev + 1
                })

            })
                .catch(error => {
                    console.error(error);
                    setmodifynfo(Object.assign({code: -1, message: "error"},{id: id}))
                });
        } else {
            // 进入编辑状态
            setEditingId(id);
            setEditingTitle(title);
        }
    }

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingTitle('');
    }

    const handleSearch = () => {
        setLoading(true);
        setCurrentPage(1);
        setUrl(buildUrl(1, search, category, sortBy, sortOrder));
        setIsSearch((prev) => {
            return prev + 1
        })
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setLoading(true);
        setUrl(buildUrl(page, search, category, sortBy, sortOrder));
        setIsSearch((prev) => {
            return prev + 1
        })
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = event.target.value;
        setCategory(newCategory);
        setLoading(true);
        setCurrentPage(1);
        setUrl(buildUrl(1, search, newCategory, sortBy, sortOrder));
        setIsSearch((prev) => {
            return prev + 1
        })
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        setLoading(true);
        setCurrentPage(1);
        setUrl(buildUrl(1, search, category, newSortBy, sortOrder));
        setIsSearch((prev) => {
            return prev + 1
        })
    };

    const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortOrder = event.target.value;
        setSortOrder(newSortOrder);
        setLoading(true);
        setCurrentPage(1);
        setUrl(buildUrl(1, search, category, sortBy, newSortOrder));
        setIsSearch((prev) => {
            return prev + 1
        })
    };

    const clearFilters = () => {
        setSearch('');
        setCategory('');
        setSortBy('id');
        setSortOrder('asc');
        setLoading(true);
        setCurrentPage(1);
        setUrl(buildUrl(1, '', '', 'id', 'asc'));
        setIsSearch((prev) => {
            return prev + 1
        })
    };

    return (
        <VStack
            divider={<StackDivider borderColor='gray.200'/>}
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

                        <Spacer/>

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
                <AdvancedBaseTable
                    url={url}
                    data={data}
                    page={currentPage}
                    pageSize={pageSize}
                    isLoading={isLoading}
                    totalItems={totalItems}
                    handleModify={handleModify}
                    handleDelete={handleDelete}
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

export default AdvancedTable;
