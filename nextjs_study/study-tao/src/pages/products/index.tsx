import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const Products: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="green.600">
          产品介绍
        </Heading>
        <Text fontSize="lg" color="gray.600">
          我们提供多种前端开发相关的产品和服务。
        </Text>
        
        <Heading as="h2" size="lg" color="blue.600">
          产品分类
        </Heading>
        <List spacing={2}>
          <ListItem>• 软件产品 - 企业级前端应用</ListItem>
          <ListItem>• 服务项目 - 定制化开发服务</ListItem>
          <ListItem>• 技术咨询 - 前端架构设计咨询</ListItem>
          <ListItem>• 培训服务 - React/Next.js 技术培训</ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default Products;
