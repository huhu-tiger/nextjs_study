import React from 'react';
import { Box, Heading, Text, VStack, SimpleGrid, Card, CardBody } from '@chakra-ui/react';

const Products: React.FC = () => {
  const products = [
    { id: 1, name: '产品 A', description: '这是一个优秀的产品' },
    { id: 2, name: '产品 B', description: '功能强大的解决方案' },
    { id: 3, name: '产品 C', description: '创新的技术产品' },
  ];

  return (
    <Box>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" color="purple.600">
          我们的产品
        </Heading>
        <Text fontSize="lg" color="gray.600">
          探索我们提供的优质产品和服务。
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} w="100%">
          {products.map((product) => (
            <Card key={product.id} maxW="sm">
              <CardBody>
                <Heading size="md" mb={2}>{product.name}</Heading>
                <Text color="gray.600">{product.description}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Products;
