import { AtSign, CircleUser } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logoNlwUnite from '../assets/logo-nlw-unite.svg'
import { Button } from '../components/button'
import { Input } from '../components/input'

export function Register() {
	const navigate = useNavigate()

	return (
		<form className="max-w-[335px] w-full flex flex-col items-center gap-8">
			<img src={logoNlwUnite} alt="Logo do NLW Unite" />

			<div className="w-full flex flex-col gap-3">
				<Input
					icon={<CircleUser className="size-5 text-teal-200" />}
					aria-label="Nome completo"
					name="fullname"
					placeholder="Nome completo"
				/>
				<Input
					icon={<AtSign className="size-5 text-teal-200" />}
					aria-label="E-mail"
					type="email"
					name="email"
					placeholder="E-mail"
				/>
				<Button type="submit">Realizar inscrição</Button>
				<Button transparent onClick={() => navigate('/')}>
					Já possui ingresso?
				</Button>
			</div>
		</form>
	)
}
