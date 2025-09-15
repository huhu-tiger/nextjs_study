import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const Software: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="green.600">
          软件产品
        </Heading>
        <Text fontSize="lg" color="gray.600">
          我们开发的企业级前端应用软件。
        </Text>
        
        <Heading as="h2" size="lg" color="blue.600">
          主要产品
        </Heading>
        <List spacing={2}>
          <ListItem>• 管理后台系统 - 基于 React + Ant Design</ListItem>
          <ListItem>• 数据可视化平台 - 使用 D3.js 和 ECharts</ListItem>
          <ListItem>• 移动端应用 - React Native 跨平台开发</ListItem>
          <ListItem>• 组件库 - 企业级 UI 组件库</ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default Software;
