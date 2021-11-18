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
	const [cursor, setCursor] = useState(0)
	const [correct, setCorrect] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const newText = await getNewText()
			setText(newText[0])
		}
		fetchData()
	}, [])
	useEffect(() => {
		function handleKeyPressed(event) {
			if (event.key == text[cursor]) {
				setCorrect((correct) => [...correct, true])
			} else {
				setCorrect((correct) => [...correct, false])
			}
			setCursor((cursor) => {
				return cursor + 1
			})
		}
		document.addEventListener('keypress', handleKeyPressed)
		return () => {
			document.removeEventListener('keypress', handleKeyPressed)
		}
	}, [text, cursor])
	useEffect(() => {
		if (cursor >= text.length) {
			console.log('stop')
		}
	}, [text, cursor])
	return (
		<div>
			Game module <button onClick={toggleMode}>Menu</button>
			<span>
				{correct.filter((item) => item).length}/{correct.length},{' '}
				{(
					correct.filter((item) => item).length / correct.length
				).toFixed(2) * 100}
				%
			</span>
			<div>
				{text.split('').map((item, index) => {
					return (
						<span
							key={index}
							className={[
								correct[index]
									? 'correct'
									: index == cursor
									? 'active'
									: index < cursor
									? 'incorrect'
									: null,
							]}
						>
							{item}
						</span>
					)
				})}
			</div>
		</div>
	)
}

export default Game
