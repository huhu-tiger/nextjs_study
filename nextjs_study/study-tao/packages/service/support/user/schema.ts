import { connectionMongo, getMongoModel } from '../../common/mongo';
const { Schema } = connectionMongo;
import { type UserSchema as SchemaType } from './type';
import { PhotoCollectionName } from '../photo/index';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, //自动索引
    lowercase: true,
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guest'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: {
    type: Date
  },
  // 用户统计信息
  stats: {
    totalPhotos: {
      type: Number,
      default: 0
    },
    totalViews: {
      type: Number,
      default: 0
    },
    lastPhotoDate: {
      type: Date
    }
  }
});

// 虚拟字段：获取用户的所有照片
UserSchema.virtual('associatedPhotos', {
  ref: PhotoCollectionName,
  localField: '_id',
  foreignField: 'userId',
  justOne: false
});

// 确保虚拟字段在序列化时被包含
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

// 中间件：更新时自动设置 updatedAt
UserSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// 索引
export function createIndexes() {
  try {
    UserSchema.index({ role: 1 });
    UserSchema.index({ status: 1 });
    UserSchema.index({ createdAt: -1 });
    console.log('User schema index success');
    console.log('User schema index:', UserSchema.indexes());
  } catch (error) {
    console.log('User schema index error:', error);
  }
}
export const MongoUser = getMongoModel<SchemaType>('user', UserSchema);


