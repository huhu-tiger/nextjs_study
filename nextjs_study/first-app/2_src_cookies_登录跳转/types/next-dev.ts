


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
  timestamp?: number;
};

export type LoginRes = {
  message: string;
  login?: string;
} & LoginNeed;

export type LoginVerify = {
  login: string;
} & LoginNeed;

export type LoginVerifyRes = {
  valid: boolean;
  message: string;
  error?: string;
}
