import { Outlet } from 'react-router-dom'

import { Header } from '../../components/header'

export function AppLayout() {
	return (
		<div className="max-w-[1264px] mx-auto px-6 py-5 grid gap-5">
			<Header />
			<Outlet />
		</div>
	)
}
