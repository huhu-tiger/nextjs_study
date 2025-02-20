


export type Post = {
  id: number;
  title: string;
  slug: string;
};

export type Posts = Post[];

// 登录
export type Login = {
  login?: string;
  password?: string;
};

// 登录返回

export type LoginNeed = {
  token?: string;
  timestamp?: string;
};

export type LoginRes = {
  message: string;
} & LoginNeed;

export type LoginVerify = {
  login: string;
} & LoginNeed;