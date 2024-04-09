import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { queryClient } from './libs/react-query'
import { router } from './routes'

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster richColors />
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}
