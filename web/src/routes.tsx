import { createBrowserRouter, Navigate } from 'react-router-dom'

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
				index: true,
				element: <Navigate replace to='events/' />,
			},
			{
				path: 'events/',
				element: <Events />,
			},
			{
				path: 'events/:eventId/attendees',
				element: <Attendees />,
			},
		],
	},
])
