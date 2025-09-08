import React, { useState } from 'react';
import {
  Grid,
  GridItem,
  Box,
  VStack,
  Button,
  Text,
  useColorModeValue,
  Collapse,
  Icon,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface MenuItem {
  path: string;
  label: string;
  children?: MenuItem[];
}

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const navBgColor = useColorModeValue('blue.50', 'blue.900');
  const headerBgColor = useColorModeValue('orange.300', 'orange.600');
  const footerBgColor = useColorModeValue('blue.300', 'blue.600');

  const menuItems: MenuItem[] = [
    { path: '/', label: '首页' },
    { 
      path: '/about', 
      label: '关于',
      children: [
        { path: '/about/team', label: '团队成员' },
        { path: '/about/history', label: '发展历程' },
      ]
    },
    { 
      path: '/products', 
      label: '产品',
      children: [
        { path: '/products/software', label: '软件产品' },
        { path: '/products/services', label: '服务项目' },
      ]
    },
    { 
      path: '/contact', 
      label: '联系我们',
      children: [
        { path: '/contact/support', label: '技术支持' },
        { path: '/contact/feedback', label: '意见反馈' },
      ]
    },
    {
      path: '/table',
      label: '表格',
      children: [
        { path: '/table/simpletable', label: '简单表格' },
        { path: '/table/advancedtable', label: '高级表格' },
      ]
    },
        {
      path: '/study',
      label: '学习',
      children: [
        { path: '/study/miaobiao', label: '秒表' },
        { path: '/study/jisuan', label: '计算' },
      ]
    },  
    {
      path: '/transferstate',
      label: '组件通信',
      children: [
        { path: '/transferstate/contextuse', label: '通信useContext' },
        { path: '/transferstate/zustandDemo', label: '通信zustand' },
      ]
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleMenu = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const isMenuExpanded = (path: string) => expandedMenus.includes(path);

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: '首页', path: '/' }];
    
    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const menuItem = findMenuItemByPath(currentPath);
      if (menuItem) {
        breadcrumbs.push({ label: menuItem.label, path: currentPath });
      }
    });
    console.log('Breadcrumbs:', breadcrumbs)
    return breadcrumbs;
  };

  const findMenuItemByPath = (path: string): MenuItem | null => {
    for (const item of menuItems) {
      if (item.path === path) return item;
      if (item.children) {
        for (const child of item.children) {
          if (child.path === path) return child;
        }
      }
    }
    return null;
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = isMenuExpanded(item.path);
    const isActive = isActiveRoute(item.path);
    
    return (
      <Box key={item.path}>
        <HStack spacing={1}>
          {hasChildren && (
            <Button
              variant="ghost"
              size="xs"
              p={0}
              minW="auto"
              onClick={() => toggleMenu(item.path)}
            >
              <Icon as={isExpanded ? ChevronDownIcon : ChevronRightIcon} w={3} h={3} />
            </Button>
          )}
          {!hasChildren && level > 0 && <Box w={4} />}
          <Button
            variant={isActive ? 'solid' : 'ghost'}
            colorScheme={isActive ? 'blue' : 'gray'}
            onClick={() => handleNavigation(item.path)}
            justifyContent="flex-start"
            size="sm"
            pl={level > 0 ? 6 : 2}
            w="100%"
          >
            {item.label}
          </Button>
        </HStack>
        
        {hasChildren && (
          <Collapse in={isExpanded}>
            <VStack spacing={1} align="stretch" mt={1}>
              {item.children!.map(child => renderMenuItem(child, level + 1))}
            </VStack>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
        gridTemplateRows={'60px 1fr 50px'}
        gridTemplateColumns={'200px 1fr'}
        h="100vh"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        {/* Header */}
        <GridItem pl="2" bg={headerBgColor} area="header" display="flex" alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            我的应用
          </Text>
        </GridItem>

        {/* Navigation */}
        <GridItem pl="2" bg={navBgColor} area="nav" p={4}>
          <VStack spacing={3} align="stretch">
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              导航菜单
            </Text>
            {menuItems.map((item) => renderMenuItem(item))}
          </VStack>
        </GridItem>

        {/* Main Content */}
        <GridItem pl="2" bg="green.300" area="main" p={4} overflow="auto">
          <VStack spacing={4} align="stretch">
            {/* Breadcrumb Navigation */}
            <Breadcrumb>
              {generateBreadcrumbs().map((breadcrumb, index) => (
                <BreadcrumbItem key={breadcrumb.path} isCurrentPage={index === generateBreadcrumbs().length - 1}>
                  <BreadcrumbLink 
                    onClick={() => handleNavigation(breadcrumb.path)}
                    cursor="pointer"
                  >
                    {breadcrumb.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
            
            {/* Page Content */}
            <Outlet />
          </VStack>
        </GridItem>

        {/* Footer */}
        <GridItem pl="2" bg={footerBgColor} area="footer" display="flex" alignItems="center">
          <Text fontSize="sm">
            © 2024 我的应用. 保留所有权利.
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Layout;
