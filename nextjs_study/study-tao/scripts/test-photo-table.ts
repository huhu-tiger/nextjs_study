import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/mongo/photos';

// 测试照片表格显示
async function testPhotoTable() {
  console.log('🚀 测试照片表格显示...\n');

  try {
    // 获取照片数据
    const response = await axios.get(API_BASE_URL, {
      params: { 
        page: 1, 
        limit: 5,
        sortBy: 'date',
        sortOrder: 'desc'
      }
    });

    if (response.data.success) {
      const { photos, pagination } = response.data.data;
      
      console.log(`✅ 获取照片数据成功: ${photos.length} 张照片`);
      console.log(`📊 分页信息: 第${pagination.page}页，共${pagination.pages}页，总计${pagination.total}张照片\n`);

      // 显示照片数据详情
      photos.forEach((photo: any, index: number) => {
        console.log(`📸 照片 ${index + 1}:`);
        console.log(`   ID: ${photo._id}`);
        console.log(`   描述: ${photo.desc}`);
        console.log(`   浏览量: ${photo.views}`);
        console.log(`   创建日期: ${photo.date ? new Date(photo.date).toLocaleString() : '未知'}`);
        console.log(`   删除状态: ${photo.delete ? '已删除' : '正常'}`);
        console.log(`   缩略图URL: ${photo.thumbnailUrl || '无'}`);
        
        if (photo.associatedUser) {
          console.log(`   作者: ${photo.associatedUser.name || photo.associatedUser.email}`);
          console.log(`   作者角色: ${photo.associatedUser.role || '未知'}`);
        } else {
          console.log(`   作者: 未关联用户`);
        }
        console.log('');
      });

      // 验证数据结构
      console.log('🔍 数据结构验证:');
      const firstPhoto = photos[0];
      if (firstPhoto) {
        const requiredFields = ['_id', 'desc', 'views', 'delete', 'userId'];
        const optionalFields = ['date', 'thumbnailUrl', 'associatedUser'];
        
        console.log('必需字段:');
        requiredFields.forEach(field => {
          const exists = firstPhoto.hasOwnProperty(field);
          console.log(`   ${field}: ${exists ? '✅' : '❌'}`);
        });
        
        console.log('可选字段:');
        optionalFields.forEach(field => {
          const exists = firstPhoto.hasOwnProperty(field);
          console.log(`   ${field}: ${exists ? '✅' : '❌'}`);
        });
      }

    } else {
      console.log('❌ 获取照片数据失败');
    }

  } catch (error: any) {
    console.error('❌ 测试失败:', error.message);
    if (error.response) {
      console.error('响应数据:', error.response.data);
    }
  }
}

// 测试搜索功能
async function testSearchFunction() {
  console.log('\n🔍 测试搜索功能...\n');

  try {
    // 测试按描述搜索
    const searchResponse = await axios.get(API_BASE_URL, {
      params: { 
        search: '风景',
        page: 1,
        limit: 3
      }
    });

    if (searchResponse.data.success) {
      const { photos } = searchResponse.data.data;
      console.log(`✅ 搜索"风景"成功: 找到 ${photos.length} 张照片`);
      photos.forEach((photo: any, index: number) => {
        console.log(`   ${index + 1}. ${photo.desc} - 浏览量: ${photo.views}`);
      });
    }

  } catch (error: any) {
    console.error('❌ 搜索测试失败:', error.message);
  }
}

// 测试用户筛选功能
async function testUserFilter() {
  console.log('\n👤 测试用户筛选功能...\n');

  try {
    // 先获取用户列表
    const usersResponse = await axios.get('http://localhost:3000/api/mongo/users', {
      params: { limit: 10 }
    });

    if (usersResponse.data.success && usersResponse.data.data.users.length > 0) {
      const firstUser = usersResponse.data.data.users[0];
      console.log(`✅ 获取用户列表成功，测试用户: ${firstUser.name || firstUser.email}`);

      // 按用户筛选照片
      const filterResponse = await axios.get(API_BASE_URL, {
        params: { 
          userId: firstUser._id,
          page: 1,
          limit: 5
        }
      });

      if (filterResponse.data.success) {
        const { photos } = filterResponse.data.data;
        console.log(`✅ 用户筛选成功: 找到 ${photos.length} 张该用户的照片`);
        photos.forEach((photo: any, index: number) => {
          console.log(`   ${index + 1}. ${photo.desc} - 浏览量: ${photo.views}`);
        });
      }
    } else {
      console.log('⚠️ 没有用户数据，跳过用户筛选测试');
    }

  } catch (error: any) {
    console.error('❌ 用户筛选测试失败:', error.message);
  }
}

// 主测试函数
async function runAllTests() {
  console.log('🎯 开始照片表格显示测试...\n');
  
  await testPhotoTable();
  await testSearchFunction();
  await testUserFilter();
  
  console.log('\n🎉 所有测试完成！');
}

// 运行测试
runAllTests();
