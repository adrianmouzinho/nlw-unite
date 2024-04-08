import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from './pages/404'
import { AppLayout } from './pages/_layouts/app'
import { Attendees } from './pages/attendees'
import { Events } from './pages/events'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/attendees',
				element: <Attendees />,
			},
			{
				path: '/events',
				element: <Events />,
			},
		],
	},
])
