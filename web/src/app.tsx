import { AttendeeList } from './components/attendee-list'
import { Header } from './components/header'

export function App() {
	return (
		<div className="max-w-[1264px] mx-auto px-6 py-5 grid gap-5">
			<Header />
			<AttendeeList />
		</div>
	)
}
