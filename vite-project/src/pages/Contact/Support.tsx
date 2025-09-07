import React from 'react';
import { Box, Heading, Text, VStack, SimpleGrid, Card, CardBody, Button, HStack, Icon } from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaClock, FaQuestionCircle } from 'react-icons/fa';

const Support: React.FC = () => {
  const supportOptions = [
    {
      icon: FaPhone,
      title: '电话支持',
      description: '工作日 9:00-18:00',
      contact: '400-123-4567',
      color: 'green'
    },
    {
      icon: FaEnvelope,
      title: '邮件支持',
      description: '24小时内回复',
      contact: 'support@company.com',
      color: 'blue'
    },
    {
      icon: FaClock,
      title: '在线客服',
      description: '实时在线咨询',
      contact: '点击开始对话',
      color: 'purple'
    },
    {
      icon: FaQuestionCircle,
      title: '帮助中心',
      description: '常见问题解答',
      contact: '查看帮助文档',
      color: 'orange'
    },
  ];

  return (
    <Box>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" color="red.600">
          技术支持
        </Heading>
        <Text fontSize="lg" color="gray.600">
          多种方式获取技术支持，我们随时为您服务。
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
          {supportOptions.map((option, index) => (
            <Card key={index}>
              <CardBody>
                <VStack spacing={4} align="start">
                  <HStack>
                    <Icon as={option.icon} w={6} h={6} color={`${option.color}.500`} />
                    <Heading size="md">{option.title}</Heading>
                  </HStack>
                  
                  <Text color="gray.600">{option.description}</Text>
                  
                  <Box w="100%">
                    <Text fontSize="sm" fontWeight="bold" mb={2}>联系方式：</Text>
                    <Button 
                      colorScheme={option.color} 
                      variant="outline" 
                      size="sm"
                      w="100%"
                    >
                      {option.contact}
                    </Button>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Support;
