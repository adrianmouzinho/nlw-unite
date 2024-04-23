import { Ticket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logoNlwUnite from '../assets/logo-nlw-unite.svg'
import { Button } from '../components/button'
import { Input } from '../components/input'

export function GetTicket() {
	const navigate = useNavigate()

	return (
		<form className="max-w-[335px] w-full flex flex-col items-center gap-8">
			<img src={logoNlwUnite} alt="Logo do NLW Unite" />

			<div className="w-full flex flex-col gap-3">
				<Input
					icon={<Ticket className="size-5 text-teal-200" />}
					aria-label="Código do ingresso"
					name="code"
					placeholder="Código do ingresso"
				/>
				<Button type="submit">Acessar credencial</Button>
				<Button transparent onClick={() => navigate('/register')}>
					Ainda não possui ingresso?
				</Button>
			</div>
		</form>
	)
}
