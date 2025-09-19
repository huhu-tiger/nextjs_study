import React from 'react';
import { Box, Heading, Text, VStack, Button, HStack, Input, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string, priority: 'low' | 'medium' | 'high') => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, text: string, priority: 'low' | 'medium' | 'high') => void;
  clearCompleted: () => void;
}

const useTodoStore = create<TodoStore>()(
  immer((set) => ({
    todos: [
      { id: 1, text: '学习 React', completed: false, priority: 'high' },
      { id: 2, text: '学习 Zustand', completed: true, priority: 'medium' },
      { id: 3, text: '学习 Immer', completed: false, priority: 'low' },
    ],
    addTodo: (text, priority) => set((state) => {
      state.todos.push({
        id: Math.max(...state.todos.map(t => t.id), 0) + 1,
        text,
        completed: false,
        priority
      });
    }),
    toggleTodo: (id) => set((state) => {
      const todo = state.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }),
    deleteTodo: (id) => set((state) => {
      const index = state.todos.findIndex(t => t.id === id);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    }),
    updateTodo: (id, text, priority) => set((state) => {
      const todo = state.todos.find(t => t.id === id);
      if (todo) {
        todo.text = text;
        todo.priority = priority;
      }
    }),
    clearCompleted: () => set((state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
    }),
  }))
);

const TodoItem: React.FC<{ todo: Todo }> = React.memo(({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodoStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);
  const [editPriority, setEditPriority] = React.useState(todo.priority);

  const handleSave = () => {
    if (editText.trim()) {
      useTodoStore.getState().updateTodo(todo.id, editText.trim(), editPriority);
      setIsEditing(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  return (
    <Box
      p={3}
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      bg={todo.completed ? 'gray.50' : 'white'}
    >
      <HStack justify="space-between">
        <HStack flex={1}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {isEditing ? (
            <HStack flex={1}>
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                size="sm"
                flex={1}
              />
              <Select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
                size="sm"
                w="100px"
              >
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
              </Select>
              <Button size="sm" colorScheme="blue" onClick={handleSave}>
                保存
              </Button>
              <Button size="sm" onClick={() => setIsEditing(false)}>
                取消
              </Button>
            </HStack>
          ) : (
            <HStack flex={1}>
              <Text
                textDecoration={todo.completed ? 'line-through' : 'none'}
                color={todo.completed ? 'gray.500' : 'black'}
                flex={1}
              >
                {todo.text}
              </Text>
              <Text
                fontSize="sm"
                color={`${getPriorityColor(todo.priority)}.500`}
                fontWeight="bold"
              >
                {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
              </Text>
            </HStack>
          )}
        </HStack>
        {!isEditing && (
          <HStack>
            <Button size="sm" onClick={() => setIsEditing(true)}>
              编辑
            </Button>
            <Button size="sm" colorScheme="red" onClick={() => deleteTodo(todo.id)}>
              删除
            </Button>
          </HStack>
        )}
      </HStack>
    </Box>
  );
});

const ZustandImmer: React.FC = () => {
  const { todos, addTodo, clearCompleted } = useTodoStore();
  const [newTodoText, setNewTodoText] = React.useState('');
  const [newTodoPriority, setNewTodoPriority] = React.useState<'low' | 'medium' | 'high'>('medium');

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim(), newTodoPriority);
      setNewTodoText('');
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading as="h1" size="xl" color="green.600">
          Zustand + Immer 示例
        </Heading>
        <Text fontSize="lg" color="gray.600" mt={2}>
          使用 Zustand 和 Immer 进行不可变状态更新
        </Text>
      </Box>
      
      {/* 统计信息 */}
      <Box p={4} bg="blue.50" borderRadius="md">
        <Text fontSize="sm" color="blue.600">
          总计: {totalCount} 个任务，已完成: {completedCount} 个
        </Text>
      </Box>

      {/* 添加新任务 */}
      <Box>
        <FormControl>
          <FormLabel>添加新任务</FormLabel>
          <HStack>
            <Input
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="输入任务内容"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            />
            <Select
              value={newTodoPriority}
              onChange={(e) => setNewTodoPriority(e.target.value as 'low' | 'medium' | 'high')}
              w="120px"
            >
              <option value="low">低优先级</option>
              <option value="medium">中优先级</option>
              <option value="high">高优先级</option>
            </Select>
            <Button onClick={handleAddTodo} colorScheme="blue">
              添加
            </Button>
          </HStack>
        </FormControl>
      </Box>

      {/* 任务列表 */}
      <Box>
        <HStack justify="space-between" mb={4}>
          <Heading as="h2" size="md">任务列表</Heading>
          {completedCount > 0 && (
            <Button size="sm" colorScheme="red" onClick={clearCompleted}>
              清除已完成
            </Button>
          )}
        </HStack>
        <VStack spacing={2} align="stretch">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </VStack>
      </Box>
      
      <Box p={4} bg="gray.50" borderRadius="md">
        <Text fontSize="sm" color="gray.600">
          <Text as="span" fontWeight="bold">功能特性：</Text>
          <br />• Zustand 状态管理
          <br />• Immer 不可变更新
          <br />• 任务增删改查
          <br />• 优先级管理
          <br />• 批量操作
        </Text>
      </Box>
    </VStack>
  );
};

export default ZustandImmer;
