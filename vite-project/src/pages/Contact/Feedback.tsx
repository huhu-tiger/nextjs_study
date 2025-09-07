import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  Select,
  Button,
  RadioGroup,
  Radio,
  Stack,
  Alert,
  AlertIcon,
  useToast
} from '@chakra-ui/react';

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'suggestion',
    priority: 'medium',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟提交
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: '反馈提交成功',
        description: '感谢您的反馈，我们会尽快处理。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setFormData({
        name: '',
        email: '',
        type: 'suggestion',
        priority: 'medium',
        message: ''
      });
    }, 1000);
  };

  return (
    <Box>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" color="orange.600">
          意见反馈
        </Heading>
        <Text fontSize="lg" color="gray.600">
          您的意见对我们很重要，请告诉我们您的想法。
        </Text>
        
        <Alert status="info">
          <AlertIcon />
          我们重视每一个用户的反馈，您的建议将帮助我们改进产品。
        </Alert>
        
        <Box w="100%" maxW="600px">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>姓名</FormLabel>
                <Input 
                  placeholder="请输入您的姓名"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>邮箱</FormLabel>
                <Input 
                  type="email" 
                  placeholder="请输入您的邮箱"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>反馈类型</FormLabel>
                <Select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="suggestion">建议</option>
                  <option value="bug">Bug报告</option>
                  <option value="feature">功能请求</option>
                  <option value="complaint">投诉</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>优先级</FormLabel>
                <RadioGroup 
                  value={formData.priority}
                  onChange={(value) => setFormData({...formData, priority: value})}
                >
                  <Stack direction="row">
                    <Radio value="low">低</Radio>
                    <Radio value="medium">中</Radio>
                    <Radio value="high">高</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>详细描述</FormLabel>
                <Textarea 
                  placeholder="请详细描述您的反馈..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </FormControl>
              
              <Button 
                type="submit" 
                colorScheme="blue" 
                size="lg" 
                w="100%"
                isLoading={isSubmitting}
                loadingText="提交中..."
              >
                提交反馈
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Box>
  );
};

export default Feedback;
