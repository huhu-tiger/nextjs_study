import type { Collection } from 'mongodb'
import type { Model } from 'mongoose'

/**
 * 检查MongoDB集合中是否存在指定名称的索引
 * @param model Mongoose模型对象
 * @param indexName 索引名称
 * @returns Promise<boolean> 索引是否存在
 */
export const checkIndexExists = async (model: Model<any>, indexName: string): Promise<boolean> => {
  try {
    const indexes = await model.collection.indexes()
    return indexes.some(index => index.name === indexName)
  } catch (error) {
    console.error(`检查索引 ${indexName} 时出错:`, error)
    return false
  }
}

/**
 * 获取集合的所有索引信息
 * @param model Mongoose模型对象
 * @returns Promise<Array> 索引信息数组
 */
export const getAllIndexes = async (model: Model<any>) => {
  try {
    const indexes = await model.collection.indexes()
    return indexes.map(index => ({
      name: index.name,
      key: index.key,
      unique: index.unique || false,
      sparse: index.sparse || false,
      background: index.background || false,
      partialFilterExpression: index.partialFilterExpression || null
    }))
  } catch (error) {
    console.error('获取索引列表时出错:', error)
    return []
  }
}

/**
 * 检查复合索引是否存在
 * @param model Mongoose模型对象
 * @param indexKeys 索引键对象，如 { email: 1, role: 1 }
 * @returns Promise<boolean> 索引是否存在
 */
export const checkCompoundIndexExists = async (model: Model<any>, indexKeys: Record<string, 1 | -1>): Promise<boolean> => {
  try {
    const indexes = await model.collection.indexes()
    return indexes.some(index => {
      const indexKeyStr = JSON.stringify(index.key)
      const targetKeyStr = JSON.stringify(indexKeys)
      return indexKeyStr === targetKeyStr
    })
  } catch (error) {
    console.error('检查复合索引时出错:', error)
    return false
  }
}

/**
 * 创建索引（如果不存在）
 * @param model Mongoose模型对象
 * @param indexSpec 索引规范
 * @param options 索引选项
 * @returns Promise<boolean> 是否成功创建
 */
export const createIndexIfNotExists = async (
  model: Model<any>, 
  indexSpec: Record<string, 1 | -1>, 
  options: { name?: string; unique?: boolean; sparse?: boolean } = {}
): Promise<boolean> => {
  try {
    const indexName = options.name || Object.keys(indexSpec).map(key => `${key}_${indexSpec[key]}`).join('_')
    console.log(indexName)
    const exists = await checkIndexExists(model, indexName)
    if (exists) {
      console.log(`索引 ${indexName} 已存在，跳过创建`)
      return true
    }
    
    await model.collection.createIndex(indexSpec, options)
    console.log(`✅ 成功创建索引: ${indexName}`)
    return true
  } catch (error) {
    console.error('创建索引时出错:', error)
    return false
  }
}

/**
 * 删除索引（如果存在）
 * @param model Mongoose模型对象
 * @param indexName 索引名称
 * @returns Promise<boolean> 是否成功删除
 */
export const dropIndexIfExists = async (model: Model<any>, indexName: string): Promise<boolean> => {
  try {
    const exists = await checkIndexExists(model, indexName)
    if (!exists) {
      console.log(`索引 ${indexName} 不存在，跳过删除`)
      return true
    }
    
    await model.collection.dropIndex(indexName)
    console.log(`✅ 成功删除索引: ${indexName}`)
    return true
  } catch (error) {
    console.error('删除索引时出错:', error)
    return false
  }
}

/**
 * 打印索引信息
 * @param model Mongoose模型对象
 * @param collectionName 集合名称（用于日志）
 */
export const printIndexInfo = async (model: Model<any>, collectionName: string) => {
  console.log(`\n📋 ${collectionName} 集合索引信息:`)
  console.log('=' .repeat(50))
  
  const indexes = await getAllIndexes(model)
  
  if (indexes.length === 0) {
    console.log('❌ 没有找到任何索引')
    return
  }
  
  indexes.forEach((index, i) => {
    console.log(`${i + 1}. 索引名称: ${index.name}`)
    console.log(`   索引键: ${JSON.stringify(index.key)}`)
    console.log(`   唯一索引: ${index.unique ? '✅' : '❌'}`)
    console.log(`   稀疏索引: ${index.sparse ? '✅' : '❌'}`)
    console.log(`   后台创建: ${index.background ? '✅' : '❌'}`)
    if (index.partialFilterExpression) {
      console.log(`   部分过滤: ${JSON.stringify(index.partialFilterExpression)}`)
    }
    console.log('')
  })
}
