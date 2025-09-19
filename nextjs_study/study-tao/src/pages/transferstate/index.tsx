import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const TransferState: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="green.600">
          组件通信
        </Heading>
        <Text fontSize="lg" color="gray.600">
          学习 React 中不同组件间的状态管理和通信方式。
        </Text>
        
        <Heading as="h2" size="lg" color="blue.600">
          通信方式
        </Heading>
        <List spacing={2}>
          <ListItem>• useContext - React 内置的上下文 API</ListItem>
          <ListItem>• Zustand - 轻量级状态管理库</ListItem>
          <ListItem>• Zustand + Immer - 不可变状态更新</ListItem>
          <ListItem>• 自定义 Store - 封装状态管理逻辑</ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default TransferState;
