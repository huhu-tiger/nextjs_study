import React from 'react';
import { Box, Heading, Text, VStack, SimpleGrid, Avatar, Badge } from '@chakra-ui/react';

const Team: React.FC = () => {
  const teamMembers = [
    { name: '张三', role: '前端开发', avatar: '👨‍💻', status: '在线' },
    { name: '李四', role: '后端开发', avatar: '👩‍💻', status: '忙碌' },
    { name: '王五', role: 'UI设计师', avatar: '🎨', status: '在线' },
    { name: '赵六', role: '产品经理', avatar: '📋', status: '离线' },
  ];

  return (
    <Box>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" color="blue.600">
          团队成员
        </Heading>
        <Text fontSize="lg" color="gray.600">
          认识我们优秀的团队成员。
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
          {teamMembers.map((member, index) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="md" bg="white">
              <VStack spacing={3}>
                <Avatar size="lg" name={member.name}>
                  {member.avatar}
                </Avatar>
                <VStack spacing={1}>
                  <Text fontWeight="bold">{member.name}</Text>
                  <Text fontSize="sm" color="gray.600">{member.role}</Text>
                  <Badge 
                    colorScheme={member.status === '在线' ? 'green' : member.status === '忙碌' ? 'yellow' : 'gray'}
                    variant="subtle"
                  >
                    {member.status}
                  </Badge>
                </VStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Team;
