import React, {useState} from 'react'
import Game from './modules/Game'
import Menu from './modules/Menu'

import './App.css'
import {Col, Container, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
	const [mode, setMode] = useState(false)

	function toggleMode() {
		setMode(!mode)
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
						<Game toggleMode={toggleMode} />
					) : (
						<Menu toggleMode={toggleMode} />
					)}
				</Col>
				<Col></Col>
			</Row>
		</Container>
	)
}
export default App
