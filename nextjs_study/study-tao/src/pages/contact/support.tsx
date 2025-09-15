import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const Support: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="green.600">
          技术支持
        </Heading>
        <Text fontSize="lg" color="gray.600">
          我们提供专业的技术支持服务。
        </Text>
        
        <Heading as="h2" size="lg" color="blue.600">
          支持内容
        </Heading>
        <List spacing={2}>
          <ListItem>• 技术问题解答 - 7x24小时在线支持</ListItem>
          <ListItem>• 代码调试 - 协助解决开发中的问题</ListItem>
          <ListItem>• 性能优化 - 提供性能优化建议</ListItem>
          <ListItem>• 最佳实践 - 分享前端开发最佳实践</ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default Support;
