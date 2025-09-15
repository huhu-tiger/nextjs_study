import React, { createContext, useContext, useState } from 'react';
import { Box, Heading, Text, VStack, Button, Input, HStack } from '@chakra-ui/react';

interface UserContextType {
  user: string;
  setUser: (user: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

const UserDisplay: React.FC = () => {
  const { user } = useUserContext();
  
  return (
    <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
      <Text>当前用户: <Text as="span" fontWeight="bold" color="blue.600">{user}</Text></Text>
    </Box>
  );
};

const UserInput: React.FC = () => {
  const { setUser } = useUserContext();
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = () => {
    if (inputValue.trim()) {
      setUser(inputValue.trim());
      setInputValue('');
    }
  };
  
  return (
    <HStack>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="输入用户名"
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <Button onClick={handleSubmit} colorScheme="blue">
        更新用户
      </Button>
    </HStack>
  );
};

const ContextUse: React.FC = () => {
  const [user, setUser] = useState('默认用户');
  
  const contextValue: UserContextType = {
    user,
    setUser
  };
  
  return (
    <UserContext.Provider value={contextValue}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h1" size="xl" color="green.600">
            useContext 示例
          </Heading>
          <Text fontSize="lg" color="gray.600" mt={2}>
            使用 React Context API 在组件间共享状态
          </Text>
        </Box>
        
        <Box>
          <Heading as="h2" size="lg" color="blue.600" mb={4}>
            用户管理
          </Heading>
          <VStack spacing={4}>
            <UserDisplay />
            <UserInput />
          </VStack>
        </Box>
        
        <Box p={4} bg="gray.50" borderRadius="md">
          <Text fontSize="sm" color="gray.600">
            <Text as="span" fontWeight="bold">说明：</Text> 
            这个示例展示了如何使用 useContext 在组件树中共享状态。
            UserDisplay 和 UserInput 组件都可以访问和修改同一个用户状态。
          </Text>
        </Box>
      </VStack>
    </UserContext.Provider>
  );
};

export default ContextUse;
