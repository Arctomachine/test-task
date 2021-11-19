import React, {useState} from 'react'
import {Button} from 'react-bootstrap'

function Menu({toggleMode, getNumber}) {
	// number of sentences: send to parent and control input field
	const [number, setNumber] = useState(2)
	function handleNumber(event) {
		const input = parseInt(event.target.value)
		if (typeof input == 'number' || input <= 5) {
			setNumber(input)
			getNumber(input)
		} else {
			setNumber(2)
			getNumber(2)
		}
	}
	return (
		<div className='centered'>
			<div>
				<label>
					How many sentences?{' '}
					<input
						type='number'
						className='input-number'
						placeholder='2'
						onChange={handleNumber}
						value={number}
					/>
				</label>
			</div>
			<br />
			<Button onClick={toggleMode}>Start</Button>
		</div>
	)
}

export default Menu
