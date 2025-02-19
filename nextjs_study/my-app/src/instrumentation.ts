import { initializeServer } from '@/lib/init'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('=== Server Initialization Start ===')
    await initializeServer()
    console.log('=== Server Initialization Complete ===')
  }
} 