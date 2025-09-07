import React from 'react';
import { Box, Heading, Text, VStack, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';

const Contact: React.FC = () => {
  return (
    <Box>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" color="red.600">
          联系我们
        </Heading>
        <Text fontSize="lg" color="gray.600">
          有任何问题或建议？请随时与我们联系。
        </Text>
        
        <Box w="100%" maxW="500px">
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>姓名</FormLabel>
              <Input placeholder="请输入您的姓名" />
            </FormControl>
            
            <FormControl>
              <FormLabel>邮箱</FormLabel>
              <Input type="email" placeholder="请输入您的邮箱" />
            </FormControl>
            
            <FormControl>
              <FormLabel>消息</FormLabel>
              <Textarea placeholder="请输入您的消息" rows={4} />
            </FormControl>
            
            <Button colorScheme="blue" size="lg" w="100%">
              发送消息
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Contact;
