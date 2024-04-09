import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { IconButton } from './icon-button'
import { TableCell } from './ui/table/table-cell'

interface PaginationProps {
	page: number
	totalPages: number
	itemsPerPage: number
	totalItems: number
}

export function Pagination({
	page,
	totalPages,
	itemsPerPage,
	totalItems,
}: PaginationProps) {
	const [_, setSearchParams] = useSearchParams()

	function goToNextPage() {
		if (page + 1 > totalPages) {
			return
		}

		setSearchParams((params) => {
			params.set('page', String(page + 1))

			return params
		})
	}

	function goToPreviousPage() {
		if (page - 1 <= 0) {
			return
		}

		setSearchParams((params) => {
			params.set('page', String(page - 1))

			return params
		})
	}

	function goToFirstPage() {
		if (page === 1) {
			return
		}

		setSearchParams((params) => {
			params.set('page', '1')

			return params
		})
	}

	function goToLastPage() {
		if (page === totalPages) {
			return
		}

		setSearchParams((params) => {
			params.set('page', String(totalPages))

			return params
		})
	}

	return (
		<tfoot>
			<tr>
				<TableCell colSpan={3}>
					Mostrando {itemsPerPage} de {totalItems} itens
				</TableCell>
				<TableCell colSpan={3} className="text-right">
					<div className="inline-flex items-center gap-8">
						<span>
							Página {page} de {totalPages}
						</span>

						<div className="flex gap-1.5">
							<IconButton onClick={goToFirstPage} disabled={page === 1}>
								<ChevronsLeftIcon className="size-4" />
							</IconButton>
							<IconButton onClick={goToPreviousPage} disabled={page === 1}>
								<ChevronLeftIcon className="size-4" />
							</IconButton>
							<IconButton onClick={goToNextPage} disabled={page === totalPages}>
								<ChevronRightIcon className="size-4" />
							</IconButton>
							<IconButton onClick={goToLastPage} disabled={page === totalPages}>
								<ChevronsRightIcon className="size-4" />
							</IconButton>
						</div>
					</div>
				</TableCell>
			</tr>
		</tfoot>
	)
}
