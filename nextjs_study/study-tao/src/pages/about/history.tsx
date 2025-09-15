import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const History: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="green.600">
          发展历程
        </Heading>
        <Text fontSize="lg" color="gray.600">
          我们团队的发展历程和重要里程碑。
        </Text>
        
        <Heading as="h2" size="lg" color="blue.600">
          重要时间节点
        </Heading>
        <List spacing={2}>
          <ListItem>• 2020年 - 团队成立，专注于 React 开发</ListItem>
          <ListItem>• 2021年 - 引入 TypeScript，提升代码质量</ListItem>
          <ListItem>• 2022年 - 采用 Chakra UI，统一设计系统</ListItem>
          <ListItem>• 2023年 - 迁移到 Next.js，优化性能</ListItem>
          <ListItem>• 2024年 - 引入状态管理最佳实践</ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default History;
