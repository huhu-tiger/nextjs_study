import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/mongo/photos';

// 等待函数
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 简单的测试函数
async function quickTest() {
  console.log('🚀 快速测试照片API...\n');

  try {
    // 1. 测试查询照片
    console.log('1. 测试查询照片...');
    const getResponse = await axios.get(API_BASE_URL, {
      params: { page: 1, limit: 5 }
    });
    console.log(`✅ 查询成功: ${getResponse.data.data.photos.length} 张照片`);
    console.log(`   总数: ${getResponse.data.data.pagination.total}\n`);

    await sleep(500); // 等待500ms

    // 2. 测试创建照片
    console.log('2. 测试创建照片...');
    const createResponse = await axios.post(API_BASE_URL, {
      desc: '快速测试照片',
      userId: '507f1f77bcf86cd799439011',
      views: 0
    });
    console.log(`✅ 创建成功: ${createResponse.data.data._id}`);
    const photoId = createResponse.data.data._id;
    console.log(`   描述: ${createResponse.data.data.desc}\n`);

    await sleep(500); // 等待500ms

    // 3. 测试更新照片
    console.log('3. 测试更新照片...');
    const updateResponse = await axios.put(`${API_BASE_URL}?id=${photoId}`, {
      desc: '更新后的照片描述',
      views: 100
    });
    console.log(`✅ 更新成功: ${updateResponse.data.data.desc}`);
    console.log(`   浏览量: ${updateResponse.data.data.views}\n`);

    await sleep(500); // 等待500ms

    // 4. 测试软删除照片
    console.log('4. 测试软删除照片...');
    const deleteResponse = await axios.delete(`${API_BASE_URL}?id=${photoId}`, {
      data: { permanent: false }
    });
    console.log(`✅ 软删除成功: ${deleteResponse.data.message}\n`);

    console.log('🎉 所有测试通过！');

  } catch (error: any) {
    console.error('❌ 测试失败:', error.message);
    if (error.response) {
      console.error('响应数据:', error.response.data);
    }
  }
}

// 运行测试
quickTest();
