import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const TableDemo: React.FC = () => {
    return (
        <Box>
            <VStack spacing={4} align="start">
    <Heading as="h1" size="xl" color="green.600">
        表格展示
        </Heading>
        <Text fontSize="lg" color="gray.600">
            chakra-ui
        </Text>

        <Heading as="h2" size="lg" color="blue.600">
        技术栈
        </Heading>
        <List spacing={2}>
        <ListItem>• React 18.3.1</ListItem>
    <ListItem>• TypeScript</ListItem>
    <ListItem>• Chakra UI</ListItem>
    <ListItem>• React Router</ListItem>
    <ListItem>• Vite</ListItem>
    </List>
    </VStack>
    </Box>
);
};

export default TableDemo;
