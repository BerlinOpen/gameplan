import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient.ts'
import ComingSoon from './screens/ComingSoon/ComingSoon.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ComingSoon />
      {/* <App /> */}
    </QueryClientProvider>
  </StrictMode>,
)
