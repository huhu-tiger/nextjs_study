import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';

const Contact: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl" color="green.600">
          联系我们
        </Heading>
        <Text fontSize="lg" color="gray.600">
          欢迎与我们取得联系，我们将竭诚为您服务。
        </Text>
        
        <Heading as="h2" size="lg" color="blue.600">
          联系方式
        </Heading>
        <List spacing={2}>
          <ListItem>• 邮箱：contact@example.com</ListItem>
          <ListItem>• 电话：+86 138-0000-0000</ListItem>
          <ListItem>• 地址：北京市朝阳区xxx大厦</ListItem>
          <ListItem>• 工作时间：周一至周五 9:00-18:00</ListItem>
        </List>
      </VStack>
    </Box>
  );
};

export default Contact;
