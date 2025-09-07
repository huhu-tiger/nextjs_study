// 练习1：泛型约束和条件类型

type User = {
  id: number;
  name: string;
  email: string;
};
type Post = {
  id: number;
  title: string;
  body: string;
};
type ApiComment = {
  id: number;
  content: string;
};
// 任务：创建一个类型安全的API客户端
interface ApiClient<T> {
  get<K extends keyof T>(endpoint: K): Promise<T[K]>;
  post<K extends keyof T>(endpoint: K, data: T[K]): Promise<T[K]>;
}

// 实现 ApiClient 类型
type ApiEndpoints = {
  users: User[];
  posts: Post[];
  comments: ApiComment[];
};

class client implements ApiClient<ApiEndpoints>{
   async get<K extends keyof ApiEndpoints>(endpoint: K): Promise<ApiEndpoints[K]> {
      return new Promise((resolve, reject) => {
        // 根据不同的 endpoint 返回对应的数据类型
        switch (endpoint) {
          case 'users':
            const users: User[] = [{id: 1, name: "John", email: "john@example.com"}];
            resolve(users as ApiEndpoints[K]);
            break;
          case 'posts':
            const posts: Post[] = [{id: 1, title: "Sample Post", body: "This is a sample post"}];
            resolve(posts as ApiEndpoints[K]);
            break;
          case 'comments':
            const comments: ApiComment[] = [{id: 1, content: "This is a comment"}];
            resolve(comments as ApiEndpoints[K]);
            break;
          default:
            reject(new Error(`Unknown endpoint: ${String(endpoint)}`));
        }
      });
   }

   async post<K extends keyof ApiEndpoints>(endpoint: K, data: ApiEndpoints[K]): Promise<ApiEndpoints[K]> {
      return new Promise((resolve, reject) => {
        // 模拟 POST 请求，直接返回传入的数据
        resolve(data);
      });
   }
}


// 练习2：映射类型和模板字面量

// 任务：使用映射类型和模板字面量创建新类型

// 1. 使用映射类型将所有属性转换为函数类型
interface User {
  id: number;
  name: string;
  email: string;
}

// 创建一个类型，将 User 的每个属性转换为对应的 setter 函数
// 例如：{ setId: (value: number) => void; setName: (value: string) => void; ... }
type UserSetters<T> = {
  // 你的实现：使用映射类型和模板字面量
  // 这行代码使用了映射类型和模板字面量来创建 setter 函数类型
  // [K in keyof T] - 遍历类型 T 的所有属性键
  // as `set${Capitalize<string & K>}` - 使用模板字面量和 Capitalize 工具类型重新映射键名
  // string & K - 确保 K 是字符串类型，用于类型安全
  // Capitalize - 将首字母大写，例如 "name" 变成 "Name"
  // value: T[K] - 设置函数的参数类型为属性的值的类型
  // 最终结果：id -> setId, name -> setName, email -> setEmail
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// 2. 使用条件映射类型过滤属性
// 创建一个类型，只保留 string 类型的属性
type StringPropsOnly<T> = {
  // 你的实现：使用条件映射
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// 测试类型
type TestUserSetters = UserSetters<User>;
type TestStringProps = StringPropsOnly<User>;
