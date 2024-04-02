import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import './index.css'

// biome-ignore lint: document.getElementById('root') should not be null
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
