import React from 'react';
import { Box, Heading, Text, VStack, SimpleGrid, Card, CardBody, Badge, Button } from '@chakra-ui/react';

const Software: React.FC = () => {
    const softwareProducts = [
        {
            name: '企业管理系统',
            description: '全面的企业资源规划解决方案',
            category: 'ERP',
            price: '¥99,999',
            features: ['财务管理', '人力资源', '库存管理']
        },
        {
            name: '客户关系管理',
            description: '提升客户满意度的CRM系统',
            category: 'CRM',
            price: '¥49,999',
            features: ['客户跟踪', '销售管理', '营销自动化']
        },
        {
            name: '数据分析平台',
            description: '强大的商业智能分析工具',
            category: 'BI',
            price: '¥79,999',
            features: ['数据可视化', '报表生成', '预测分析']
        },
    ];

    return (
        <Box>
            <VStack spacing={6} align="start">
    <Heading as="h1" size="xl" color="green.600">
        软件产品
        </Heading>
        <Text fontSize="lg" color="gray.600">
        我们提供各种企业级软件解决方案。
        </Text>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} w="100%">
        {softwareProducts.map((product, index) => (
                <Card key={index} maxW="sm">
            <CardBody>
                <VStack spacing={3} align="start">
            <Box>
                <Badge colorScheme="blue" mb={2}>{product.category}</Badge>
            <Heading size="md">{product.name}</Heading>
            </Box>

            <Text color="gray.600">{product.description}</Text>

            <Box>
            <Text fontSize="sm" fontWeight="bold" mb={1}>主要功能：</Text>
    <VStack spacing={1} align="start">
        {product.features.map((feature, idx) => (
                <Text key={idx} fontSize="sm" color="gray.600">
                          • {feature}
    </Text>
))}
    </VStack>
    </Box>

    <Box w="100%" display="flex" justifyContent="space-between" alignItems="center">
    <Text fontSize="lg" fontWeight="bold" color="green.600">
        {product.price}
        </Text>
        <Button size="sm" colorScheme="blue">
        了解详情
        </Button>
        </Box>
        </VStack>
        </CardBody>
        </Card>
))}
    </SimpleGrid>
    </VStack>
    </Box>
);
};

export default Software;
