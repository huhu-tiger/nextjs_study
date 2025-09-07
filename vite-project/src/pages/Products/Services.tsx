import React from 'react';
import { Box, Heading, Text, VStack, SimpleGrid, Icon, HStack } from '@chakra-ui/react';
import { FaCode, FaMobile, FaCloud, FaShieldAlt, FaChartLine, FaHeadset } from 'react-icons/fa';

const Services: React.FC = () => {
  const services = [
    { 
      icon: FaCode, 
      title: '定制开发', 
      description: '根据您的需求定制专属软件解决方案',
      color: 'blue'
    },
    { 
      icon: FaMobile, 
      title: '移动应用', 
      description: 'iOS和Android原生应用开发',
      color: 'green'
    },
    { 
      icon: FaCloud, 
      title: '云服务', 
      description: '云端部署和运维服务',
      color: 'purple'
    },
    { 
      icon: FaShieldAlt, 
      title: '安全咨询', 
      description: '企业信息安全评估和防护',
      color: 'red'
    },
    { 
      icon: FaChartLine, 
      title: '数据分析', 
      description: '大数据分析和商业智能',
      color: 'orange'
    },
    { 
      icon: FaHeadset, 
      title: '技术支持', 
      description: '7x24小时专业技术支持',
      color: 'teal'
    },
  ];

  return (
    <Box>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" color="blue.600">
          服务项目
        </Heading>
        <Text fontSize="lg" color="gray.600">
          我们提供全方位的技术服务支持。
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="100%">
          {services.map((service, index) => (
            <Box 
              key={index} 
              p={6} 
              borderWidth={1} 
              borderRadius="lg" 
              bg="white"
              _hover={{ shadow: "md", transform: "translateY(-2px)" }}
              transition="all 0.2s"
            >
              <VStack spacing={4} align="start">
                <HStack>
                  <Icon as={service.icon} w={8} h={8} color={`${service.color}.500`} />
                  <Heading size="md">{service.title}</Heading>
                </HStack>
                <Text color="gray.600">{service.description}</Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Services;
