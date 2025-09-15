import React from 'react';
import { Box, Heading, Text, VStack, Button, HStack, Input, FormControl, FormLabel, Switch, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppSettings {
  theme: 'light' | 'dark';
  language: 'zh' | 'en';
  notifications: boolean;
  autoSave: boolean;
  fontSize: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface AppStore {
  // 用户信息
  user: User | null;
  setUser: (user: User | null) => void;
  
  // 应用设置
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
  
  // 计数器
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  
  // 待办事项
  todos: string[];
  addTodo: (todo: string) => void;
  removeTodo: (index: number) => void;
  clearTodos: () => void;
}

const defaultSettings: AppSettings = {
  theme: 'light',
  language: 'zh',
  notifications: true,
  autoSave: true,
  fontSize: 14,
};

const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        // 用户信息
        user: null,
        setUser: (user) => set({ user }),
        
        // 应用设置
        settings: defaultSettings,
        updateSettings: (newSettings) => set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
        resetSettings: () => set({ settings: defaultSettings }),
        
        // 计数器
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
        
        // 待办事项
        todos: [],
        addTodo: (todo) => set((state) => ({ 
          todos: [...state.todos, todo] 
        })),
        removeTodo: (index) => set((state) => ({
          todos: state.todos.filter((_, i) => i !== index)
        })),
        clearTodos: () => set({ todos: [] }),
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          settings: state.settings,
          count: state.count,
          todos: state.todos,
        }),
      }
    ),
    {
      name: 'app-store',
    }
  )
);

const UserSection: React.FC = () => {
  const { user, setUser } = useAppStore();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleLogin = () => {
    if (name && email) {
      setUser({ id: Date.now(), name, email });
      setName('');
      setEmail('');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return (
      <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
        <Text fontWeight="bold" mb={2}>当前用户</Text>
        <Text>姓名: {user.name}</Text>
        <Text>邮箱: {user.email}</Text>
        <Button mt={2} size="sm" colorScheme="red" onClick={handleLogout}>
          退出登录
        </Button>
      </Box>
    );
  }

  return (
    <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
      <Text fontWeight="bold" mb={2}>用户登录</Text>
      <VStack spacing={2}>
        <Input
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleLogin} colorScheme="blue" size="sm">
          登录
        </Button>
      </VStack>
    </Box>
  );
};

const SettingsSection: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useAppStore();

  return (
    <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
      <HStack justify="space-between" mb={4}>
        <Text fontWeight="bold">应用设置</Text>
        <Button size="sm" onClick={resetSettings}>
          重置
        </Button>
      </HStack>
      
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>主题</FormLabel>
          <HStack>
            <Button
              size="sm"
              colorScheme={settings.theme === 'light' ? 'blue' : 'gray'}
              onClick={() => updateSettings({ theme: 'light' })}
            >
              浅色
            </Button>
            <Button
              size="sm"
              colorScheme={settings.theme === 'dark' ? 'blue' : 'gray'}
              onClick={() => updateSettings({ theme: 'dark' })}
            >
              深色
            </Button>
          </HStack>
        </FormControl>

        <FormControl>
          <FormLabel>语言</FormLabel>
          <HStack>
            <Button
              size="sm"
              colorScheme={settings.language === 'zh' ? 'blue' : 'gray'}
              onClick={() => updateSettings({ language: 'zh' })}
            >
              中文
            </Button>
            <Button
              size="sm"
              colorScheme={settings.language === 'en' ? 'blue' : 'gray'}
              onClick={() => updateSettings({ language: 'en' })}
            >
              English
            </Button>
          </HStack>
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">通知</FormLabel>
          <Switch
            isChecked={settings.notifications}
            onChange={(e) => updateSettings({ notifications: e.target.checked })}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">自动保存</FormLabel>
          <Switch
            isChecked={settings.autoSave}
            onChange={(e) => updateSettings({ autoSave: e.target.checked })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>字体大小</FormLabel>
          <NumberInput
            value={settings.fontSize}
            onChange={(_, value) => updateSettings({ fontSize: value })}
            min={12}
            max={24}
            w="100px"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </VStack>
    </Box>
  );
};

const CounterSection: React.FC = () => {
  const { count, increment, decrement, reset } = useAppStore();

  return (
    <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
      <Text fontWeight="bold" mb={2}>计数器</Text>
      <Text fontSize="2xl" textAlign="center" mb={4}>{count}</Text>
      <HStack justify="center">
        <Button onClick={decrement} colorScheme="red">-</Button>
        <Button onClick={reset} colorScheme="gray">重置</Button>
        <Button onClick={increment} colorScheme="green">+</Button>
      </HStack>
    </Box>
  );
};

const TodoSection: React.FC = () => {
  const { todos, addTodo, removeTodo, clearTodos } = useAppStore();
  const [newTodo, setNewTodo] = React.useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
      <HStack justify="space-between" mb={4}>
        <Text fontWeight="bold">待办事项</Text>
        {todos.length > 0 && (
          <Button size="sm" colorScheme="red" onClick={clearTodos}>
            清空
          </Button>
        )}
      </HStack>
      
      <HStack mb={4}>
        <Input
          placeholder="添加待办事项"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <Button onClick={handleAddTodo} colorScheme="blue">
          添加
        </Button>
      </HStack>
      
      <VStack spacing={2} align="stretch">
        {todos.map((todo, index) => (
          <HStack key={index} justify="space-between">
            <Text>{todo}</Text>
            <Button size="sm" colorScheme="red" onClick={() => removeTodo(index)}>
              删除
            </Button>
          </HStack>
        ))}
        {todos.length === 0 && (
          <Text color="gray.500" textAlign="center">暂无待办事项</Text>
        )}
      </VStack>
    </Box>
  );
};

const ZustandStore: React.FC = () => {
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading as="h1" size="xl" color="green.600">
          Zustand Store 示例
        </Heading>
        <Text fontSize="lg" color="gray.600" mt={2}>
          使用 Zustand 创建复杂的状态管理 Store，包含持久化和开发工具
        </Text>
      </Box>
      
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
        <UserSection />
        <SettingsSection />
        <CounterSection />
        <TodoSection />
      </Box>
      
      <Box p={4} bg="gray.50" borderRadius="md">
        <Text fontSize="sm" color="gray.600">
          <Text as="span" fontWeight="bold">功能特性：</Text>
          <br />• 复杂状态管理
          <br />• 状态持久化 (localStorage)
          <br />• 开发工具支持
          <br />• 部分状态持久化
          <br />• 类型安全的状态操作
          <br />• 响应式状态更新
        </Text>
      </Box>
    </VStack>
  );
};

export default ZustandStore;
