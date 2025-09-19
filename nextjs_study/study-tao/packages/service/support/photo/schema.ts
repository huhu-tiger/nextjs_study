import { connectionMongo, getMongoModel } from '../../common/mongo';
const { Schema } = connectionMongo;
import { type PhotoSchema as SchemaType } from './type';
import {UserCollectionName} from '../user/index'

const PhotoSchema = new Schema({

  //   appId: {
  //     type: Schema.Types.ObjectId,
  //     ref: AppCollectionName,
  //     required: true
  //   },
  desc: {
    type: String,
    required: true
  },
  views: {   //浏览量
    type: Number,
    default: 0
  },
  delete: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId : {
    type: Schema.Types.ObjectId,
    ref : UserCollectionName,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  thumbnailUrl: {
    type: String,

  }
  // Third part app config
  // app: {
  //   type: Object // could be FeishuAppType | WecomAppType | ...
  // },
  // immediateResponse: {
  //   type: String
  // },
  // defaultResponse: {
  //   type: String
  // }
});
// 中间件：更新时自动设置 updatedAt
PhotoSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  this.views = this.views + 1;
  this.thumbnailUrl = `/api/image/generate/${Math.floor(Math.random() * 100) + 1}?size=thumbnail`;
  next();
});

PhotoSchema.virtual('associatedUser', {
  ref: UserCollectionName,
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

// 索引定义
try {
  // 用户ID索引 - 用于查询用户的所有照片
  PhotoSchema.index({ userId: 1 });
  
  // 日期索引 - 用于按时间排序和查询
  PhotoSchema.index({ date: -1 });
  
  // 浏览量索引 - 用于热门照片查询
  PhotoSchema.index({ views: -1 });
  
  // 删除状态索引 - 用于过滤已删除的照片
  PhotoSchema.index({ delete: 1 });
  
  // 复合索引 - 用户ID + 日期，用于查询用户按时间排序的照片
  PhotoSchema.index({ userId: 1, date: -1 });
  
  // 复合索引 - 用户ID + 删除状态，用于查询用户的有效照片
  PhotoSchema.index({ userId: 1, delete: 1 });
  
  // 复合索引 - 删除状态 + 浏览量，用于查询热门有效照片
  PhotoSchema.index({ delete: 1, views: -1 });
  
  console.log('Photo schema indexes created successfully');
} catch (error) {
  console.log('Photo schema index error:', error);
}

export const MongoPhoto = getMongoModel<SchemaType>('photo', PhotoSchema);
