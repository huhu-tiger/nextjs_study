import React from 'react';
import { Box, Heading, Text, VStack, Button, Input, HStack } from '@chakra-ui/react';
import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

const CounterDisplay: React.FC = () => {
  const count = useCounterStore((state) => state.count);
  
  return (
    <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" textAlign="center">
      <Text fontSize="2xl" fontWeight="bold" color="blue.600">
        计数: {count}
      </Text>
    </Box>
  );
};

const CounterControls: React.FC = () => {
  const { increment, decrement, reset } = useCounterStore();
  
  return (
    <HStack spacing={4}>
      <Button onClick={decrement} colorScheme="red">
        -1
      </Button>
      <Button onClick={reset} colorScheme="gray">
        重置
      </Button>
      <Button onClick={increment} colorScheme="green">
        +1
      </Button>
    </HStack>
  );
};

const ZustandDemo: React.FC = () => {
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading as="h1" size="xl" color="green.600">
          Zustand 示例
        </Heading>
        <Text fontSize="lg" color="gray.600" mt={2}>
          使用 Zustand 进行轻量级状态管理
        </Text>
      </Box>
      
      <Box>
        <Heading as="h2" size="lg" color="blue.600" mb={4}>
          计数器
        </Heading>
        <VStack spacing={4}>
          <CounterDisplay />
          <CounterControls />
        </VStack>
      </Box>
      
      <Box p={4} bg="gray.50" borderRadius="md">
        <Text fontSize="sm" color="gray.600">
          <Text as="span" fontWeight="bold">说明：</Text> 
          这个示例展示了如何使用 Zustand 进行状态管理。
          CounterDisplay 和 CounterControls 组件都使用同一个 Zustand store，
          状态变化会自动同步到所有使用该状态的组件。
        </Text>
      </Box>
    </VStack>
  );
};

export default ZustandDemo;
