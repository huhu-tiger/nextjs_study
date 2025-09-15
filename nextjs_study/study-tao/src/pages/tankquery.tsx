import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const TankQuery: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="green.600">
          TankQuery 数据查询
        </Heading>
        <Text fontSize="lg" color="gray.600">
          使用 TanStack Query 进行数据获取和状态管理。
        </Text>
        
        <Heading as="h2" size="lg" color="blue.600">
          功能特性
        </Heading>
        <List spacing={2}>
          <ListItem>• 自动缓存和同步</ListItem>
          <ListItem>• 后台更新</ListItem>
          <ListItem>• 乐观更新</ListItem>
          <ListItem>• 错误重试</ListItem>
          <ListItem>• 分页支持</ListItem>
        </List>
        
        <Heading as="h2" size="lg" color="blue.600">
          技术栈
        </Heading>
        <List spacing={2}>
          <ListItem>• @tanstack/react-query</ListItem>
          <ListItem>• React Query DevTools</ListItem>
          <ListItem>• TypeScript</ListItem>
          <ListItem>• Chakra UI</ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default TankQuery;
