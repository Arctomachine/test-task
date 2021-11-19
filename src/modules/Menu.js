import React from 'react'
import {Button, Container} from 'react-bootstrap'

function Menu({toggleMode}) {
	return (
		<div className='centered'>
			<Button onClick={toggleMode}>Start</Button>
		</div>
	)
}

export default Menu
