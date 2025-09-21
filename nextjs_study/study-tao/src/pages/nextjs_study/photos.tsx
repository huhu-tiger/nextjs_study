import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Box, Button, HStack, Input, InputGroup, InputLeftAddon, StackDivider, VStack, Select, Text } from '@chakra-ui/react';
import { BaseTable } from "@/components/mongodb/table/BaseTable";

import type { PhotoSchema } from "@backend/service/support/photo/type";
import { useMount } from 'ahooks'
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { UserSchema } from "@backend/service/support/user/type";
import { MongoUser } from "@backend/service/support/user/schema";
// 照片API接口地址
const PHOTO_API_URL = '/api/mongo/photos';

type IProps = {
    query: any
    users: UserSchema[]
}
const SimpleTable: React.FC<IProps> = (props) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<PhotoSchema[]>([])
    const [search, setSearch] = useState('')
    const [selectedUserId, setSelectedUserId] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize] = useState<number>(5)
    const [totalItems, setTotalItems] = useState<number>(0)

    // 使用 useMemo 缓存 URL，只有在依赖变化时才重新计算
    const url = useMemo(() => {
        const params = new URLSearchParams({
            page: currentPage.toString(),
            limit: pageSize.toString()
        });

        if (search) {
            params.append('search', search);
        }

        if (selectedUserId) {
            params.append('userId', selectedUserId);
        }

        return `${PHOTO_API_URL}?${params.toString()}`;
    }, [currentPage, pageSize, search, selectedUserId])

    // 获取照片数据
    useEffect(() => {
        setLoading(true);
        axios.get(url)
            .then(response => {
                console.log('照片API响应:', response.data);
                if (response.data.success) {
                    const { photos, pagination } = response.data.data;
                    setData(photos || []);
                    setTotalItems(pagination.total || 0);
                } else {
                    setData([]);
                    setTotalItems(0);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('获取照片数据失败:', error);
                setData([]);
                setTotalItems(0);
                setLoading(false);
            });
    }, [url])


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUserId(event.target.value);
    }

    const handleSearchClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log('点击了搜索按钮');
        setLoading(true);
        setCurrentPage(1); // 搜索时重置到第一页
        // URL 会自动通过 useEffect 更新
    }

    const handleResetClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log('点击了重置按钮');
        setSearch('');
        setSelectedUserId('');
        setCurrentPage(1);
        setLoading(true);
    }

    const handlePageChange = (page: number) => {
        console.log('切换到页面:', page)
        setLoading(true)
        setCurrentPage(page)
        // URL 会自动通过 useEffect 更新
    }
    return (
        <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
        >
            <Box display="flex" justifyContent="space-between" w="100%">
                <Text fontSize="xl" fontWeight="bold" color="teal.600">
                    照片管理
                </Text>
                <HStack spacing='12px'>
                    <Box w='200px'>
                        <InputGroup>
                            <InputLeftAddon>描述</InputLeftAddon>
                            <Input
                                placeholder='搜索照片描述'
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                    </Box>
                    <Box w='200px'>
                        <Select
                            placeholder="选择用户"
                            value={selectedUserId}
                            onChange={handleUserChange}
                        >
                            {props.users.map(user => (
                                <option key={user._id} value={user._id}>
                                    {user.name || user.email}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <Box>
                        <Button colorScheme='teal' size='md' onClick={handleSearchClick}>
                            搜索
                        </Button>
                    </Box>
                    <Box>
                        <Button colorScheme='gray' size='md' onClick={handleResetClick}>
                            重置
                        </Button>
                    </Box>
                </HStack>
            </Box>
            <Box>
                {/* 通过 props 方式将数据传递给子组件 BaseTable */}
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

export default SimpleTable;


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { query, req, res } = context;
    console.log(`getServerSideProps query: ${JSON.stringify(query)}`)
    // query 路由传参
    let data: UserSchema[] = []
    try {
        const users = await MongoUser.find(query)
            .select('_id name email role avatar')
            .sort({ createdAt: -1 })


        data = users.map(user => {
            const userObj = (user as any).toJSON();
            // 确保 _id 是字符串
            userObj._id = userObj._id.toString(); // _id是mongodb 对象，需要转义为字符串
            return userObj;
        }) || []

        console.log(`getServerSideProps User len: ${data?.length}`)
    } catch (error) {
        console.error('获取用户列表失败:', error);
    }


    // 返回数据供页面使用
    return {
        props: {
            query,
            users: data,
        },
    };
};

