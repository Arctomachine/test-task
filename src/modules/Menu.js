import React from 'react'

function Menu({toggleMode}) {
	return (
		<div>
			Main menu
			<div>
				<button onClick={toggleMode}>Start</button>
			</div>
		</div>
	)
}

export default Menu
