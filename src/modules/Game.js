import React, {useEffect, useState} from 'react'
import {
	ButtonGroup,
	Button,
	Col,
	Container,
	Navbar,
	Row,
	Spinner,
} from 'react-bootstrap'

// get json response from api and return plain text
async function getNewText(number = 2) {
	if (typeof number != 'number') {
		number = 2
	}
	const res = await fetch(
		'https://baconipsum.com/api/?type=meat-and-filler&sentences=' + number
	)
	const text = await res.json()
	return text
}
function Game({toggleMode, number}) {
	const [text, setText] = useState('')
	const [cursor, setCursor] = useState(0)
	const [correct, setCorrect] = useState([])
	const [mistakes, setMistakes] = useState([])
	const [timer, setTimer] = useState(null) // reference to interval
	const [timerStart, setTimerStart] = useState(null)
	const [timerCurrent, setTimerCurrent] = useState(null)
	const [isTimerActive, setIsTimerActive] = useState(false)
	const [symbolScore, setSymbolScore] = useState(0)
	const [popup, setPopup] = useState(false)
	const [restart, setRestart] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	// reset values for new game session
	function newGame() {
		setText('')
		setCursor(0)
		setCorrect([])
		setMistakes([])
		setPopup(false)
		setSymbolScore(0)
		setIsLoading(true)
		setRestart(!restart)
	}

	// get new text after restart
	useEffect(() => {
		const fetchData = async () => {
			const newText = await getNewText(number)
			setText(newText[0])
			setIsLoading(false)
		}
		fetchData()
	}, [restart, number])

	// process user input
	useEffect(() => {
		function handleKeyPressed(event) {
			// if it is first key in this session
			if (cursor === 0) {
				setTimerStart(Date.now())
				setIsTimerActive(true)
				const interval = setInterval(() => {
					setTimerCurrent(Date.now())
				}, 100)
				setTimer(interval)
			}

			// all other keys
			if (cursor < text.length) {
				// correct answer
				if (event.key === text[cursor]) {
					setCorrect((correct) => [...correct, true])
					setMistakes((mistakes) => [...mistakes, null])
				} else {
					// incorrect inswer
					setCorrect((correct) => [...correct, false])
					setMistakes((mistakes) => {
						return [...mistakes, event.key]
					})
				}

				// go to next symbol
				setCursor((cursor) => {
					return cursor + 1
				})
			}
		}
		document.addEventListener('keypress', handleKeyPressed) // bind global listener
		return () => {
			document.removeEventListener('keypress', handleKeyPressed)
		}
	}, [text, cursor])

	// when finished
	useEffect(() => {
		if (cursor === text.length && cursor !== 0) {
			setIsTimerActive(false)
			clearInterval(timer)
			setPopup(true)
		}
	}, [cursor, text])

	// calculate speed
	useEffect(() => {
		if (isTimerActive) {
			setSymbolScore(() => {
				const symbols = correct.filter((item) => item).length
				const time = (Date.now() - timerStart) / 1000 / 60
				return symbols / time
			})
		}
	}, [isTimerActive, correct, timerCurrent])

	// calculate answers and accuracy
	function getScore() {
		const data = []
		if (correct.length === 0) {
			data.push('-')
			data.push('-')
			data.push('-')
		} else {
			data.push(correct.filter((item) => item).length)
			data.push(correct.length)
			data.push(((data[0] / data[1]) * 100).toFixed(0))
		}
		return data
	}
	return isLoading ? (
		<Spinner animation='border'></Spinner>
	) : (
		<div style={{width: 100 + '%'}}>
			<Navbar>
				<Container>
					<Col className='centered'>
						Correct: {getScore()[0]}/{getScore()[1]}
					</Col>
					<Col className='centered'>Accuracy: {getScore()[2]}%</Col>
					<Col className='centered'>
						Speed: {Math.round(symbolScore)} per minute
					</Col>
				</Container>
			</Navbar>
			<Row>
				<Col className={'text'}>
					{text.split('').map((item, index) => {
						return (
							<span
								key={index}
								className={[
									correct[index]
										? 'correct'
										: index === cursor
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
				</Col>
			</Row>
			<div
				className={[popup ? 'show' : 'hide']}
				style={{justifyContent: 'center'}}
			>
				<ButtonGroup>
					<Button onClick={newGame}>Start again</Button>
					<Button onClick={toggleMode} variant='outline-primary'>
						To menu
					</Button>
				</ButtonGroup>
			</div>
		</div>
	)
}

export default Game
