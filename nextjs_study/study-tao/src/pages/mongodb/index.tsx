import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const Mongodb: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="green.600">
          mongoose
        </Heading>
        <Text fontSize="lg" color="gray.600">
          学习mongoose
        </Text>
        
        <Heading as="h2" size="lg" color="blue.600">
          
        </Heading>
        <List spacing={2}>
          <ListItem>• 表格展示 - getserversideprops</ListItem>

        </List>
      </VStack>
    </Box>
  );
};

export default Mongodb;
