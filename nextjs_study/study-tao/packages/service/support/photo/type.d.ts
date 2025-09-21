

import { Document } from 'mongoose';

export type PhotoSchema = Document & {
  _id: string;
  desc: string;
  views: number;
  delete: boolean;
  date?: Date;
  userId: string;
  thumbnailUrl: string;
  // 虚拟字段
  associatedUser?: any; // 关联的用户对象
  // // Mongoose 文档方法
  // toObject(): any;
  // toJSON(): any;
};
