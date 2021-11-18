import React, {useState} from 'react'
import Game from './modules/Game'
import Menu from './modules/Menu'

function App() {
	const [mode, setMode] = useState(false)

	function toggleMode() {
		setMode(!mode)
	}

	return (
		<div>
			{mode ? (
				<Game toggleMode={toggleMode} />
			) : (
				<Menu toggleMode={toggleMode} />
			)}
		</div>
	)
}
export default App
