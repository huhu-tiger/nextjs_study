import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const Home: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="blue.600">
          欢迎来到首页
        </Heading>
        <Text fontSize="lg" color="gray.600">
          这是一个使用 Chakra UI 和 React Router 构建的示例应用。
        </Text>
        <Text>
          您可以通过左侧导航栏切换到不同的页面。
        </Text>
      </VStack>
    </Box>
  );
};

export default Home;
