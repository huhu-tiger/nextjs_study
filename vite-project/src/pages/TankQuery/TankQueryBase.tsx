import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'

const queryClient = new QueryClient()

const TankQueryBase =() => {
    return (
        <QueryClientProvider client={queryClient}>
            <TankQueryBaseChild />
            <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"}/>
        </QueryClientProvider>
    )
}

function TankQueryBaseChild() {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            axios
                .get('https://api.github.com/repos/tannerlinsley/react-query')
                .then((res) => res.data),
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <strong>👀 {data.subscribers_count}</strong>{' '}
            <strong>✨ {data.stargazers_count}</strong>{' '}
            <strong>🍴 {data.forks_count}</strong>
            <div>{isFetching ? 'Updating...' : ''}</div>
        </div>
    )
}

export default TankQueryBase