

export type PhotoSchema = {
  _id: string;
  desc: string;
  views: number;
  delete: boolean;
  date?: Date;
  userId: string;
  thumbnailUrl: string;
  // 虚拟字段
  associatedUser?: any; // 关联的用户对象
};
