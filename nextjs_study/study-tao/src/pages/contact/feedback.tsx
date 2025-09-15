import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const Feedback: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="green.600">
          意见反馈
        </Heading>
        <Text fontSize="lg" color="gray.600">
          您的意见和建议对我们非常重要。
        </Text>
        
        <Heading as="h2" size="lg" color="blue.600">
          反馈渠道
        </Heading>
        <List spacing={2}>
          <ListItem>• 在线反馈表单 - 快速提交您的建议</ListItem>
          <ListItem>• 邮件反馈 - feedback@example.com</ListItem>
          <ListItem>• 电话反馈 - +86 400-000-0000</ListItem>
          <ListItem>• 在线客服 - 实时在线沟通</ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default Feedback;
