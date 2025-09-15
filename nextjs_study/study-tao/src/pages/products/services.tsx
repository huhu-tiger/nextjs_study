import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const Services: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="green.600">
          服务项目
        </Heading>
        <Text fontSize="lg" color="gray.600">
          我们提供的定制化开发服务。
        </Text>
        
        <Heading as="h2" size="lg" color="blue.600">
          服务内容
        </Heading>
        <List spacing={2}>
          <ListItem>• 前端项目开发 - 从零到一的项目开发</ListItem>
          <ListItem>• 技术升级改造 - 现有项目的技术栈升级</ListItem>
          <ListItem>• 性能优化 - 前端性能调优和优化</ListItem>
          <ListItem>• 代码审查 - 代码质量评估和改进建议</ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default Services;
