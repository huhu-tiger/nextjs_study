import React from 'react';
import { Box, Heading, Text, VStack, HStack, Icon, Divider } from '@chakra-ui/react';
import { CalendarIcon, CheckIcon } from '@chakra-ui/icons';

const History: React.FC = () => {
  const milestones = [
    { year: '2020', title: '公司成立', description: '我们开始了这段激动人心的旅程' },
    { year: '2021', title: '首款产品发布', description: '推出了我们的第一个产品' },
    { year: '2022', title: '团队扩张', description: '团队从5人扩展到20人' },
    { year: '2023', title: '获得投资', description: '成功获得A轮融资' },
    { year: '2024', title: '国际化', description: '产品开始走向国际市场' },
  ];

  return (
    <Box>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" color="purple.600">
          发展历程
        </Heading>
        <Text fontSize="lg" color="gray.600">
          回顾我们的成长历程和重要里程碑。
        </Text>
        
        <VStack spacing={4} align="stretch">
          {milestones.map((milestone, index) => (
            <Box key={index}>
              <HStack spacing={4} align="start">
                <Box
                  w={10}
                  h={10}
                  borderRadius="full"
                  bg={index === milestones.length - 1 ? "green.500" : "blue.500"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon 
                    as={index === milestones.length - 1 ? CheckIcon : CalendarIcon} 
                    color="white" 
                    w={5} 
                    h={5} 
                  />
                </Box>
                <Box flex={1}>
                  <Text fontWeight="bold" fontSize="lg">
                    {milestone.year} - {milestone.title}
                  </Text>
                  <Text color="gray.600">{milestone.description}</Text>
                </Box>
              </HStack>
              {index < milestones.length - 1 && (
                <Box ml={5} mt={2}>
                  <Divider orientation="vertical" h={4} />
                </Box>
              )}
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default History;
