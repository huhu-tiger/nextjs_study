import React from 'react';
import { Box, Heading, Text, VStack, Button, HStack, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Badge } from '@chakra-ui/react';
import { create } from 'zustand';
import { devtools, persist  } from 'zustand/middleware';
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserStore {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  deleteUser: (id: number) => void;
  updateUser: (id: number, user: Partial<User>) => void;
}

const useUserStore = create<UserStore>()(
  devtools(
  (set) => ({
  users: [
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '用户' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户' },
  ],
  addUser: (user) => set((state) => ({
    users: [...state.users, { ...user, id: Math.max(...state.users.map(u => u.id)) + 1 }]
  })),
  deleteUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  })),
  updateUser: (id, updatedUser) => set((state) => ({
    users: state.users.map(user => 
      user.id === id ? { ...user, ...updatedUser } : user
    )
  })),
})));

const UserTable: React.FC = () => {
  const { users, deleteUser } = useUserStore();

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>姓名</Th>
            <Th>邮箱</Th>
            <Th>角色</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>
                <Badge colorScheme="blue">{user.id}</Badge>
              </Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Badge colorScheme={user.role === '管理员' ? 'red' : 'green'}>
                  {user.role}
                </Badge>
              </Td>
              <Td>
                <HStack>
                  <Button size="sm" colorScheme="orange">编辑</Button>
                  <Button 
                    size="sm" 
                    colorScheme="red"
                    onClick={() => deleteUser(user.id)}
                  >
                    删除
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const ZustandTable: React.FC = () => {
  const { addUser } = useUserStore();

  const handleAddUser = () => {
    const newUser = {
      name: `用户${Date.now()}`,
      email: `user${Date.now()}@example.com`,
      role: '用户'
    };
    addUser(newUser);
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading as="h1" size="xl" color="green.600">
          Zustand 表格示例
        </Heading>
        <Text fontSize="lg" color="gray.600" mt={2}>
          使用 Zustand 管理表格数据状态
        </Text>
      </Box>
      
      <Box>
        <HStack mb={4}>
          <Button onClick={handleAddUser} colorScheme="blue">
            添加用户
          </Button>
        </HStack>
        <UserTable />
      </Box>
      
      <Box p={4} bg="gray.50" borderRadius="md">
        <Text fontSize="sm" color="gray.600">
          <Text as="span" fontWeight="bold">功能特性：</Text>
          <br />• Zustand 状态管理
          <br />• 表格数据增删改查
          <br />• 响应式状态更新
          <br />• 类型安全的操作
        </Text>
      </Box>
    </VStack>
  );
};

export default ZustandTable;
