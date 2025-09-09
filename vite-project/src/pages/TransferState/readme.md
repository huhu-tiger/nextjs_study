https://www.cnblogs.com/qinlinkun/p/18077430


```js
interface Istore {
    count: number
    increment: () => void
    decrement: () => void
    reset: () => void
}

interface Istate {
    count: number
}
create<Istore> 后面有两个小括号，
第一次调用：create<Istore>() - 返回一个函数，绑定泛型类型 T（定义 store 的 shape）
第二次调用：create<Istore>()() 传入初始化逻辑（状态 + 方法），生成最终的 store

set 用于更新状态
接收一个函数：(当前状态) => 新状态
确保状态更新的不可变性
const useStore = create<Istore>()(
    devtools(
    (set) => ({
            count: 0,
            increment: () => set((state: Istate) => ({count: state.count + 1})),
            decrement: () => set((state: Istate) => ({count: state.count - 1})),
            reset: () => set({count: 0}),
        }),
        { name: 'counter-store' }
    )
)

```