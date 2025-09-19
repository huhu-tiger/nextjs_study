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
import type { IProps} from "./typeDefine/Idata";
import type { PhotoSchema } from "@backend/service/support/photo/type";

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
                            <Th>描述</Th>
                            <Th>浏览量</Th>
                            <Th>作者</Th>
                            <Th>创建日期</Th>
                            <Th>状态</Th>
                            <Th>缩略图</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item: PhotoSchema) => (
                            <Tr key={item._id}>
                                <Td maxW="100px" isTruncated>
                                    <Text fontSize="xs" color="gray.500">
                                        {item._id.slice(-8)}
                                    </Text>
                                </Td>
                                <Td maxW="200px" isTruncated>
                                    <Text fontSize="sm" fontWeight="medium">
                                        {item.desc}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontSize="sm" color="blue.500" fontWeight="bold">
                                        {item.views}
                                    </Text>
                                </Td>
                                <Td maxW="150px" isTruncated>
                                    <Text fontSize="sm" color="green.600">
                                        {item.associatedUser?.name || item.associatedUser?.email || '未知用户'}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontSize="xs" color="gray.600">
                                        {item.date ? new Date(item.date).toLocaleDateString() : '未知'}
                                    </Text>
                                </Td>
                                <Td>
                                    <Box
                                        px={2}
                                        py={1}
                                        borderRadius="md"
                                        bg={item.delete ? "red.100" : "green.100"}
                                        color={item.delete ? "red.700" : "green.700"}
                                        fontSize="xs"
                                        fontWeight="bold"
                                        textAlign="center"
                                    >
                                        {item.delete ? '已删除' : '正常'}
                                    </Box>
                                </Td>
                                <Td>
                                    <Box 
                                        w="60px" 
                                        h="60px" 
                                        bg="gray.100" 
                                        borderRadius="md"
                                        backgroundImage={item.thumbnailUrl ? `url(${item.thumbnailUrl})` : 'none'}
                                        backgroundSize="cover"
                                        backgroundPosition="center"
                                        border="1px solid"
                                        borderColor="gray.200"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        {!item.thumbnailUrl && (
                                            <Text fontSize="xs" color="gray.400">
                                                无图片
                                            </Text>
                                        )}
                                    </Box>
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