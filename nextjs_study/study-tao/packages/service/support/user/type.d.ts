
export type UserRole = 'admin' | 'user' | 'guest';
export type UserStatus = 'active' | 'inactive' | 'banned';

export type UserStats = {
  totalPhotos: number;
  totalViews: number;
  lastPhotoDate?: Date;
};

export type UserSchema = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  stats: UserStats;
  // 虚拟字段
  photos?: any[]; // 关联的照片数组
};
