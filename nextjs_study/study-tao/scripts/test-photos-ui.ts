import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/mongo';

// 测试照片API和用户API的集成
async function testPhotosUI() {
  console.log('🚀 测试照片管理UI相关API...\n');

  try {
    // 1. 测试获取用户列表
    console.log('1. 测试获取用户列表...');
    const usersResponse = await axios.get(`${API_BASE_URL}/users`, {
      params: { limit: 50 }
    });
    
    if (usersResponse.data.success) {
      console.log(`✅ 获取用户列表成功: ${usersResponse.data.data.users.length} 个用户`);
      usersResponse.data.data.users.slice(0, 3).forEach((user: any, index: number) => {
        console.log(`   ${index + 1}. ${user.name || '未命名'} (${user.email})`);
      });
    } else {
      console.log('❌ 获取用户列表失败');
    }

    // 2. 测试获取照片列表
    console.log('\n2. 测试获取照片列表...');
    const photosResponse = await axios.get(`${API_BASE_URL}/photos`, {
      params: { page: 1, limit: 5 }
    });
    
    if (photosResponse.data.success) {
      console.log(`✅ 获取照片列表成功: ${photosResponse.data.data.photos.length} 张照片`);
      console.log(`   总数: ${photosResponse.data.data.pagination.total}`);
      photosResponse.data.data.photos.slice(0, 3).forEach((photo: any, index: number) => {
        console.log(`   ${index + 1}. ${photo.desc} - 浏览量: ${photo.views}`);
        if (photo.associatedUser) {
          console.log(`      作者: ${photo.associatedUser.name || photo.associatedUser.email}`);
        }
      });
    } else {
      console.log('❌ 获取照片列表失败');
    }

    // 3. 测试照片搜索功能
    console.log('\n3. 测试照片搜索功能...');
    const searchResponse = await axios.get(`${API_BASE_URL}/photos`, {
      params: { search: '风景', page: 1, limit: 5 }
    });
    
    if (searchResponse.data.success) {
      console.log(`✅ 照片搜索成功: 找到 ${searchResponse.data.data.photos.length} 张包含"风景"的照片`);
    } else {
      console.log('❌ 照片搜索失败');
    }

    // 4. 测试用户筛选功能（如果有用户的话）
    if (usersResponse.data.success && usersResponse.data.data.users.length > 0) {
      const firstUser = usersResponse.data.data.users[0];
      console.log(`\n4. 测试用户筛选功能 (用户: ${firstUser.name || firstUser.email})...`);
      
      const userFilterResponse = await axios.get(`${API_BASE_URL}/photos`, {
        params: { userId: firstUser._id, page: 1, limit: 5 }
      });
      
      if (userFilterResponse.data.success) {
        console.log(`✅ 用户筛选成功: 找到 ${userFilterResponse.data.data.photos.length} 张该用户的照片`);
      } else {
        console.log('❌ 用户筛选失败');
      }
    }

    // 5. 测试分页功能
    console.log('\n5. 测试分页功能...');
    const pageResponse = await axios.get(`${API_BASE_URL}/photos`, {
      params: { page: 1, limit: 2 }
    });
    
    if (pageResponse.data.success) {
      const pagination = pageResponse.data.data.pagination;
      console.log(`✅ 分页功能正常:`);
      console.log(`   当前页: ${pagination.page}`);
      console.log(`   每页数量: ${pagination.limit}`);
      console.log(`   总数: ${pagination.total}`);
      console.log(`   总页数: ${pagination.pages}`);
      console.log(`   有下一页: ${pagination.hasNext}`);
      console.log(`   有上一页: ${pagination.hasPrev}`);
    } else {
      console.log('❌ 分页功能测试失败');
    }

    console.log('\n🎉 照片管理UI API测试完成！');

  } catch (error: any) {
    console.error('❌ 测试失败:', error.message);
    if (error.response) {
      console.error('响应数据:', error.response.data);
    }
  }
}

// 运行测试
testPhotosUI();
