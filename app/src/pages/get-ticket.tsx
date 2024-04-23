import { Ticket } from 'lucide-react'
import logoNlwUnite from '../assets/logo-nlw-unite.svg'
import { Button } from '../components/button'
import { Input } from '../components/input'

export function GetTicket() {
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
				<Button>Acessar credencial</Button>
				<Button transparent>Ainda não possui ingresso?</Button>
			</div>
		</form>
	)
}
