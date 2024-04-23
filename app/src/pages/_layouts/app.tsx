import { Outlet } from 'react-router-dom'

export function AppLayout() {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<Outlet />
		</div>
	)
}
