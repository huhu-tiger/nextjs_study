import React, { useState } from 'react';
import { Box, Heading, Text, VStack, Button, Input, HStack, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

const fetchPost = async (id: number): Promise<Post> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.json();
};

const PostList: React.FC = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <Box textAlign="center" py={4}>
        <Spinner size="lg" />
        <Text mt={2}>加载中...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        加载失败: {error.message}
      </Alert>
    );
  }

  return (
    <VStack spacing={2} align="stretch">
      {posts?.slice(0, 5).map((post) => (
        <Box key={post.id} p={3} border="1px" borderColor="gray.200" borderRadius="md">
          <Text fontWeight="bold" fontSize="sm">{post.title}</Text>
          <Text fontSize="xs" color="gray.600" noOfLines={2}>{post.body}</Text>
        </Box>
      ))}
    </VStack>
  );
};

const PostDetail: React.FC<{ postId: number }> = ({ postId }) => {
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
    enabled: postId > 0,
  });

  if (isLoading) {
    return (
      <Box textAlign="center" py={4}>
        <Spinner />
        <Text mt={2}>加载中...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        加载失败: {error.message}
      </Alert>
    );
  }

  if (!post) {
    return <Text>请选择一个文章</Text>;
  }

  return (
    <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
      <Heading as="h3" size="md" mb={2}>{post.title}</Heading>
      <Text fontSize="sm" color="gray.600" mb={2}>用户ID: {post.userId}</Text>
      <Text>{post.body}</Text>
    </Box>
  );
};

const TankQueryBase: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading as="h1" size="xl" color="green.600">
          TanStack Query 基础示例
        </Heading>
        <Text fontSize="lg" color="gray.600" mt={2}>
          学习如何使用 TanStack Query 进行数据获取和缓存
        </Text>
      </Box>
      
      <Box>
        <Heading as="h2" size="lg" color="blue.600" mb={4}>
          文章列表
        </Heading>
        <PostList />
      </Box>
      
      <Box>
        <Heading as="h2" size="lg" color="blue.600" mb={4}>
          文章详情
        </Heading>
        <HStack mb={4}>
          <Input
            type="number"
            placeholder="输入文章ID (1-100)"
            value={selectedPostId || ''}
            onChange={(e) => setSelectedPostId(Number(e.target.value))}
            w="200px"
          />
          <Button 
            onClick={() => setSelectedPostId(0)}
            colorScheme="gray"
          >
            清除
          </Button>
        </HStack>
        <PostDetail postId={selectedPostId} />
      </Box>
      
      <Box p={4} bg="gray.50" borderRadius="md">
        <Text fontSize="sm" color="gray.600">
          <Text as="span" fontWeight="bold">说明：</Text> 
          这个示例展示了 TanStack Query 的基本用法：
          <br />• 自动缓存和重复请求去重
          <br />• 加载状态和错误处理
          <br />• 条件查询 (enabled 选项)
          <br />• 查询键 (queryKey) 的使用
        </Text>
      </Box>
    </VStack>
  );
};

export default TankQueryBase;
