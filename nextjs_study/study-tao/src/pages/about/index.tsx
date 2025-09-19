import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const About: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="green.600">
          关于我们
        </Heading>
        <Text fontSize="lg" color="gray.600">
          我们是一个专注于前端开发技术的团队。
        </Text>
        
        <Heading as="h2" size="lg" color="blue.600">
          技术栈
        </Heading>
        <List spacing={2}>
          <ListItem>• React 18.3.1</ListItem>
          <ListItem>• TypeScript</ListItem>
          <ListItem>• Chakra UI</ListItem>
          <ListItem>• Next.js</ListItem>
          <ListItem>• Tailwind CSS</ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default About;
