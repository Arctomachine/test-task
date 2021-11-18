import React, {useEffect, useState} from 'react'

async function getNewText() {
	const res = await fetch(
		'https://baconipsum.com/api/?type=meat-and-filler&sentences=1'
	)
	const text = await res.json()
	return text
}
function Game({toggleMode}) {
	const [text, setText] = useState('')
	useEffect(() => {
		const fetchData = async () => {
			const newText = await getNewText()
			setText(newText[0])
		}
		fetchData()
	}, [])
	return (
		<div>
			Game module <button onClick={toggleMode}>Menu</button>
			<div>{text}</div>
		</div>
	)
}

export default Game
