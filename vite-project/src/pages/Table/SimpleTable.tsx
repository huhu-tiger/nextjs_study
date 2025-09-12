import React, {useEffect, useState} from 'react';
import {Box, Button, HStack, Input, InputGroup, InputLeftAddon, StackDivider, VStack} from '@chakra-ui/react';
import {BaseTable} from "./components/BaseTable.tsx";
import type {Album} from "./typeDefine/Idata";
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

    const buildUrl=():string=>{
        const init_url =`${baseurl}?page=${currentPage}&limit=${pageSize}`
        return search ? `${init_url}&search=${encodeURIComponent(search)}` : init_url
    }
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
        // 如果 search 有值，则将其编码后作为 search 查询参数拼接到 URL，否则不添加 search 参数
        // const searchParam = search ? `&search=${encodeURIComponent(search)}` : ''
        // seturl(`${baseurl}?page=1&limit=${pageSize}${searchParam}`)
        seturl(buildUrl())
        console.log(url)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        setLoading(true)
        // const searchParam = search ? `&search=${encodeURIComponent(search)}` : ''
        // seturl(`${baseurl}?page=${page}&limit=${pageSize}${searchParam}`)
        seturl(buildUrl())
        console.log(url)
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
