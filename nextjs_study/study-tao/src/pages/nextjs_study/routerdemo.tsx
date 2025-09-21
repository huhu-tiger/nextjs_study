import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Heading,
  Divider,
  Code,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  useColorModeValue
} from '@chakra-ui/react';

const RouterDemo: React.FC = () => {
  const router = useRouter();
  const [routeHistory, setRouteHistory] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [queryParams, setQueryParams] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  // 确保只在客户端运行
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 获取当前路由信息
  useEffect(() => {
    if (!isClient || !router.isReady) return;
    
    setCurrentPath(router.asPath);
    setQueryParams(router.query);
  }, [router.asPath, router.query, isClient, router.isReady]);

  // 记录路由历史
  useEffect(() => {
    if (!isClient || !router.isReady || !router.asPath) return;
    
    setRouteHistory(prev => {
      if (!prev.includes(router.asPath)) {
        return [...prev, router.asPath];
      }
      return prev;
    });
  }, [router.asPath, isClient, router.isReady]);

  // 路由跳转方法
  const handlePush = (path: string) => {
    setIsLoading(true);
    router.push(path).finally(() => setIsLoading(false));
  };

  const handleReplace = (path: string) => {
    setIsLoading(true);
    router.replace(path).finally(() => setIsLoading(false));
  };

  const handleBack = () => {
    router.back();
  };


  const handleReload = () => {
    router.reload();
  };

  // 带查询参数的跳转
  const handlePushWithQuery = () => {
    const query = {
      page: '1',
      category: 'demo',
      search: 'router example',
      tags: ['nextjs', 'router', 'demo']
    };
    router.push({
      pathname: '/nextjs_study/routerdemo',
      query: query
    });
  };

  // 动态路由跳转
  const handleDynamicRoute = (id: string) => {
    router.push(`/nextjs_study/photos/${id}`);
  };

  // 获取所有可用路由（模拟）
  const availableRoutes = [
    { path: '/', name: '首页', description: '应用主页' },
    { path: '/nextjs_study', name: 'Next.js 学习', description: 'Next.js 相关页面' },
    { path: '/nextjs_study/photos', name: '照片管理', description: '照片列表页面' },
    { path: '/nextjs_study/photos/[id]', name: '照片详情', description: '动态路由示例' },
    { path: '/api/mongo/photos', name: '照片 API', description: '照片数据接口' },
    { path: '/api/mongo/users', name: '用户 API', description: '用户数据接口' },
    { path: '/mongodb/photos', name: 'MongoDB 照片', description: 'MongoDB 照片管理' },
    { path: '/tankquery', name: '坦克查询', description: '坦克数据查询' }
  ];

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // 如果还没有在客户端渲染，显示加载状态
  if (!isClient) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center">
          <Text>加载中...</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* 标题 */}
        <Box textAlign="center">
          <Heading size="xl" color="teal.600" mb={4}>
            Next.js Router 示例
          </Heading>
          <Text color="gray.600">
            演示 Next.js 路由器的各种功能和用法
          </Text>
        </Box>

        {/* 当前路由信息 */}
        <Box p={6} bg={bgColor} borderRadius="lg" border="1px" borderColor={borderColor}>
          <Heading size="md" mb={4} color="blue.600">
            📍 当前路由信息
          </Heading>
          <VStack align="stretch" spacing={3}>
            <HStack>
              <Text fontWeight="bold">当前路径:</Text>
              <Code>{currentPath}</Code>
            </HStack>
            <HStack>
              <Text fontWeight="bold">路由状态:</Text>
              <Badge colorScheme={router.isReady ? 'green' : 'yellow'}>
                {router.isReady ? 'Ready' : 'Loading'}
              </Badge>
            </HStack>
            <HStack>
              <Text fontWeight="bold">加载状态:</Text>
              <Badge colorScheme={isLoading ? 'blue' : 'gray'}>
                {isLoading ? 'Loading' : 'Idle'}
              </Badge>
            </HStack>
            {Object.keys(queryParams).length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={2}>查询参数:</Text>
                <Code p={2} display="block" whiteSpace="pre-wrap">
                  {JSON.stringify(queryParams, null, 2)}
                </Code>
              </Box>
            )}
          </VStack>
        </Box>

        {/* 路由操作按钮 */}
        <Box p={6} bg={bgColor} borderRadius="lg" border="1px" borderColor={borderColor}>
          <Heading size="md" mb={4} color="green.600">
            🚀 路由操作
          </Heading>
          <VStack spacing={4}>
            <HStack wrap="wrap" spacing={2}>
              <Button
                colorScheme="blue"
                onClick={() => handlePush('/')}
                isLoading={isLoading}
                loadingText="跳转中..."
              >
                router.push('/')
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => handlePush('/nextjs_study')}
                isLoading={isLoading}
                loadingText="跳转中..."
              >
                router.push('/nextjs_study')
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => handlePush('/nextjs_study/photos')}
                isLoading={isLoading}
                loadingText="跳转中..."
              >
                router.push('/nextjs_study/photos')
              </Button>
            </HStack>

            <Divider />

            <HStack wrap="wrap" spacing={2}>
              <Button
                colorScheme="orange"
                onClick={() => handleReplace('/nextjs_study')}
                isLoading={isLoading}
                loadingText="替换中..."
              >
                router.replace()
              </Button>
              <Button
                colorScheme="purple"
                onClick={handleBack}
              >
                router.back()
              </Button>

              <Button
                colorScheme="red"
                onClick={handleReload}
              >
                router.reload()
              </Button>
            </HStack>

            <Divider />

            <HStack wrap="wrap" spacing={2}>
              <Button
                colorScheme="teal"
                onClick={handlePushWithQuery}
                isLoading={isLoading}
                loadingText="跳转中..."
              >
                带查询参数跳转
              </Button>
              <Button
                colorScheme="cyan"
                onClick={() => handleDynamicRoute('123')}
                isLoading={isLoading}
                loadingText="跳转中..."
              >
                动态路由 /photos/123
              </Button>
              <Button
                colorScheme="cyan"
                onClick={() => handleDynamicRoute('456')}
                isLoading={isLoading}
                loadingText="跳转中..."
              >
                动态路由 /photos/456
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* 路由历史 */}
        <Box p={6} bg={bgColor} borderRadius="lg" border="1px" borderColor={borderColor}>
          <Heading size="md" mb={4} color="purple.600">
            📚 路由历史记录
          </Heading>
          {routeHistory.length > 0 ? (
            <VStack align="stretch" spacing={2}>
              {routeHistory.map((route, index) => (
                <HStack key={index} p={2} bg="white" borderRadius="md" border="1px" borderColor="gray.200">
                  <Badge colorScheme="blue" minW="40px" textAlign="center">
                    {index + 1}
                  </Badge>
                  <Code flex={1}>{route}</Code>
                  {route === currentPath && (
                    <Badge colorScheme="green">当前</Badge>
                  )}
                </HStack>
              ))}
            </VStack>
          ) : (
            <Text color="gray.500">暂无路由历史</Text>
          )}
        </Box>

        {/* 可用路由列表 */}
        <Box p={6} bg={bgColor} borderRadius="lg" border="1px" borderColor={borderColor}>
          <Heading size="md" mb={4} color="indigo.600">
            🗂️ 可用路由列表
          </Heading>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>路径</Th>
                <Th>名称</Th>
                <Th>描述</Th>
                <Th>操作</Th>
              </Tr>
            </Thead>
            <Tbody>
              {availableRoutes.map((route, index) => (
                <Tr key={index}>
                  <Td>
                    <Code fontSize="sm">{route.path}</Code>
                  </Td>
                  <Td fontWeight="medium">{route.name}</Td>
                  <Td color="gray.600">{route.description}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => handlePush(route.path)}
                      isLoading={isLoading}
                      loadingText="跳转中..."
                    >
                      访问
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* 使用说明 */}
        <Alert status="info" borderRadius="lg">
          <AlertIcon />
          <Box>
            <AlertTitle>使用说明</AlertTitle>
            <AlertDescription>
              <VStack align="start" spacing={2} mt={2}>
                <Text>• <Code>router.push()</Code> - 添加新路由到历史记录</Text>
                <Text>• <Code>router.replace()</Code> - 替换当前路由，不添加历史记录</Text>
                <Text>• <Code>router.back()</Code> - 返回上一页</Text>
                <Text>• <Code>router.forward()</Code> - 前进到下一页</Text>
                <Text>• <Code>router.reload()</Code> - 重新加载当前页面</Text>
                <Text>• 动态路由支持参数传递和查询字符串</Text>
              </VStack>
            </AlertDescription>
          </Box>
        </Alert>
      </VStack>
    </Container>
  );
};

export default RouterDemo;
