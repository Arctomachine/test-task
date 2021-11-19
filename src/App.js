import React, {useState} from 'react'
import Game from './modules/Game'
import Menu from './modules/Menu'

import './App.css'
import {Col, Container, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
	const [mode, setMode] = useState(false)
	const [number, setNumber] = useState('')

	// switch between menu and game
	function toggleMode() {
		setMode(!mode)
	}

	// number of sentences from menu module
	function getNumber(number) {
		setNumber(number)
	}
	return (
		<Container>
			<Row>
				<Col></Col>
				<Col
					sm={8}
					style={{
						height: 100 + 'vh',
						alignItems: 'center',
						justifyContent: 'center',
						display: 'flex',
					}}
				>
					{mode ? (
						<Game toggleMode={toggleMode} number={number} />
					) : (
						<Menu toggleMode={toggleMode} getNumber={getNumber} />
					)}
				</Col>
				<Col></Col>
			</Row>
		</Container>
	)
}
export default App
