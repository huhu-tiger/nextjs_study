import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const Team: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="green.600">
          团队成员
        </Heading>
        <Text fontSize="lg" color="gray.600">
          我们的团队由经验丰富的前端开发工程师组成。
        </Text>
        
        <Heading as="h2" size="lg" color="blue.600">
          核心成员
        </Heading>
        <List spacing={2}>
          <ListItem>• 前端架构师 - 负责技术选型和架构设计</ListItem>
          <ListItem>• React 专家 - 专注于 React 生态系统</ListItem>
          <ListItem>• UI/UX 设计师 - 负责用户体验设计</ListItem>
          <ListItem>• 全栈工程师 - 前后端技术栈</ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default Team;
