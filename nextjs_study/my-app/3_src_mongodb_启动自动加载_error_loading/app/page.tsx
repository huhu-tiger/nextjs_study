'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Button } from '@chakra-ui/react'

export default function page() {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div className='bg-blue-500 h-screen'>
        <h1>当前路径是{pathname}</h1>
        <Button 
          colorScheme='yellow' 
          size='lg' 
          onClick={() => router.push('/blog')}
          className='bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md'
        >
          跳转到博客
        </Button>

    </div>
  )
}
