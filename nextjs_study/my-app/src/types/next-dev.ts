


export type Post = {
  id: number;
  title: string;
  slug: string;
};

export type Posts = Post[];

export type Login = {
  login?: string;
  password?: string;
};