import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/app'
import { GetTicket } from './pages/get-ticket'
import { NotFound } from './pages/not-found'
import { Register } from './pages/register'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <GetTicket />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},
])
