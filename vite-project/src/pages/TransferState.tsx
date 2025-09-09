import React from 'react';
import {Box, Heading, Text, VStack, List, ListItem} from '@chakra-ui/react';
import {
    UnorderedList,
} from '@chakra-ui/react'

const TransferState: React.FC = () => {
    return (
        <Box>
            <VStack spacing={4} align="start">
                <Heading as="h1" size="xl" color="green.600">
                    学习React 组件通信

                </Heading>
                <Text fontSize="lg" color="gray.600">
                    chakra-ui
                </Text>
                <UnorderedList spacing={3}>
                    <ListItem>
                        组件通信useContext
                    </ListItem>
                    <ListItem>
                        组件通信Zustand 基础
                    </ListItem>
                    <ListItem>
                        组件通信Zustand immer
                    </ListItem>
                    <ListItem>
                        组件通信Zustand 自定义存储持久化
                    </ListItem>
                </UnorderedList>
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

export default TransferState;
