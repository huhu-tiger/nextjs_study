import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Spinner,
    HStack,
    Button,
    Text,
    Box,
    VStack,
} from '@chakra-ui/react'
import React from "react";
import type { IProps, Album} from "../typeDefine/Idata";


export const BaseTable: React.FC<IProps> = (props) => {
    const {data, page, pageSize, totalItems, isLoading, onPageChange} = props;

    // 计算总页数
    const totalPages = Math.ceil(totalItems / pageSize);

    // 生成页码数组
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const start = Math.max(1, page - 2);
            const end = Math.min(totalPages, start + maxVisiblePages - 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        return pages;
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" h="200px">
                <Spinner size="xl" color="teal.500"/>
            </Box>
        );
    }

    return (
        <VStack spacing={4} align="stretch">
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>数据表格 - 第 {page} 页，共 {totalPages} 页</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>标题</Th>
                            <Th>URL</Th>
                            <Th>缩略图</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item: Album) => (
                            <Tr key={item.id}>
                                <Td>{item.id}</Td>
                                <Td maxW="200px" isTruncated>{item.title}</Td>
                                <Td maxW="150px" isTruncated>
                                    <Text fontSize="sm" color="blue.500" isTruncated>
                                        {item.url}
                                    </Text>
                                </Td>
                                <Td>
                                    <Box w="50px" h="50px" bg="gray.100" borderRadius="md"
                                         backgroundImage={`url(${item.thumbnailUrl})`}
                                         backgroundSize="cover"
                                         backgroundPosition="center"
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            {/* 分页控件 */}
            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                    <HStack spacing={2}>
                        {/* 上一页按钮 */}
                        <Button
                            size="sm"
                            variant="outline"
                            colorScheme="teal"
                            isDisabled={page === 1}
                            onClick={() => onPageChange(page - 1)}
                        >
                            上一页
                        </Button>

                        {/* 页码按钮 */}
                        {getPageNumbers().map((pageNum) => (
                            <Button
                                key={pageNum}
                                size="sm"
                                variant={pageNum === page ? "solid" : "outline"}
                                colorScheme="teal"
                                onClick={() => onPageChange(pageNum)}
                            >
                                {pageNum}
                            </Button>
                        ))}

                        {/* 下一页按钮 */}
                        <Button
                            size="sm"
                            variant="outline"
                            colorScheme="teal"
                            isDisabled={page === totalPages}
                            onClick={() => onPageChange(page + 1)}
                        >
                            下一页
                        </Button>
                    </HStack>
                </Box>
            )}

            {/* 分页信息 */}
            <Box textAlign="center" color="gray.600" fontSize="sm">
                显示第 {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalItems)} 条，
                共 {totalItems} 条记录
            </Box>
        </VStack>
    );
}