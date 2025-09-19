
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type ReactNode } from 'react';


const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        retry: false,
        cacheTime: 10,
        networkMode: 'always'
      }
    }
  });

// 在 React 中，当你在组件标签之间放置内容时，这些内容会自动作为 children prop 传递给组件：
// props 解构children, 也就是 传递参数中的 <App />
  const TankQueryProviderBase = ({ children }: { children: ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
      </QueryClientProvider>
    )
  }
  export default TankQueryProviderBase