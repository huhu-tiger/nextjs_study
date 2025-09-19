import React, {useEffect, useState, useCallback} from 'react';
import {Box, Button, HStack, Input, InputGroup, InputLeftAddon, StackDivider, VStack} from '@chakra-ui/react';
import {BaseTable} from "../../components/table/BaseTable";
import type {Album} from "../../types/Idata";
import axios from 'axios';
// 在浏览器或支持ES6模块的环境中
import {PhotoUrl} from '../../config/api';

const baseurl = PhotoUrl


const SimpleTable: React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<Album[]>([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize] = useState<number>(5)
    const [totalItems, setTotalItems] = useState<number>(0)
    const [url, seturl] = useState<string>(`${baseurl}?`)

    const buildUrl = useCallback((page: number = currentPage): string => {
        const init_url = `${baseurl}?page=${page}&limit=${pageSize}`
        return search ? `${init_url}&search=${encodeURIComponent(search)}` : init_url
    }, [currentPage, pageSize, search])

    // 当 currentPage 或 search 变化时，自动更新 URL
    useEffect(() => {
        seturl(buildUrl())
    }, [buildUrl])

    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response.data); // 从响应中获取数据
                const {data: photosData, pagination} = response.data;
                setData(photosData)
                setTotalItems(pagination.totalItems) // 从分页信息获取总数
                setLoading(false)
            })
            .catch(error => {
                console.error(error); // 处理错误
                setData([])
                setTotalItems(0)
                setLoading(false)
            });
    }, [url])


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        console.log(event.target.value)
    }
    
    const handleBtnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        console.log('点击了按钮');
        setLoading(true)
        setCurrentPage(1) // 搜索时重置到第一页
        // URL 会自动通过 useEffect 更新
    }

    const handlePageChange = (page: number) => {
        console.log('切换到页面:', page)
        setLoading(true)
        setCurrentPage(page)
        // URL 会自动通过 useEffect 更新
    }
    return (
        <VStack
            divider={<StackDivider borderColor='gray.200'/>}
            spacing={4}
            align='stretch'
        >
            <Box display="flex" justifyContent="flex-end" w="100%">
                <HStack spacing='12px'>
                    <Box w='260px'>
                        <InputGroup>
                            <InputLeftAddon>title</InputLeftAddon>
                            <Input placeholder='搜索内容输入' onChange={handleChange}/>
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
