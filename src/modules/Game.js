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
	const [mistakes, setMistakes] = useState([])
	const [popup, setPopup] = useState(false)
	const [restart, setRestart] = useState(false)
	function newGame() {
		setText('')
		setCursor(0)
		setCorrect([])
		setMistakes([])
		setPopup(false)
		setRestart(!restart)
	}
	useEffect(() => {
		const fetchData = async () => {
			const newText = await getNewText()
			setText(newText[0])
		}
		fetchData()
	}, [restart])
	useEffect(() => {
		function handleKeyPressed(event) {
			if (cursor < text.length) {
				if (event.key == text[cursor]) {
					setCorrect((correct) => [...correct, true])
					setMistakes((mistakes) => [...mistakes, null])
				} else {
					setCorrect((correct) => [...correct, false])
					setMistakes((mistakes) => {
						return [...mistakes, event.key]
					})
				}
				setCursor((cursor) => {
					return cursor + 1
				})
			}
		}
		document.addEventListener('keypress', handleKeyPressed)
		return () => {
			document.removeEventListener('keypress', handleKeyPressed)
		}
	}, [text, cursor])
	useEffect(() => {
		if (cursor == text.length && cursor != 0) {
			console.log(cursor, text.length)
			setPopup(true)
		}
	}, [cursor])
	function getScore() {
		if (correct.length > 0) {
			return (
				<span>
					{correct.filter((item) => item).length}/{correct.length},{' '}
					{(
						(correct.filter((item) => item).length /
							correct.length) *
						100
					).toFixed(2)}
					%
				</span>
			)
		} else {
			return (
				<span>
					{correct.filter((item) => item).length}/{correct.length}
				</span>
			)
		}
	}
	return (
		<div>
			Game module <button onClick={toggleMode}>Menu</button>
			{getScore()}
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
							title={
								mistakes[index]
									? 'You typed: ' + mistakes[index]
									: null
							}
						>
							{item}
						</span>
					)
				})}
			</div>
			<div className={[popup ? 'show' : 'hide']}>
				<button onClick={newGame}>Start again</button>
				<button onClick={toggleMode}>To menu</button>
			</div>
		</div>
	)
}

export default Game
