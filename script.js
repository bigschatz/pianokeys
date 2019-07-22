/* eslint-disable no-use-before-define */
/* the keys and notes variables store the piano keys */
const pianoKeys = [
  'c-key',
  'd-key',
  'e-key',
  'f-key',
  'g-key',
  'a-key',
  'b-key',
  'high-c-key',
  'c-sharp-key',
  'd-sharp-key',
  'f-sharp-key',
  'g-sharp-key',
  'a-sharp-key',
]

/* word key variables */
const wordOne = document.getElementById('word-one')
const wordTwo = document.getElementById('word-two')
const wordThree = document.getElementById('word-three')
const wordFour = document.getElementById('word-four')
const wordFive = document.getElementById('word-five')
const wordSix = document.getElementById('word-six')

/* letter key variables */
const letterNoteOne = document.getElementById('letter-note-one')
const letterNoteTwo = document.getElementById('letter-note-two')
const letterNoteThree = document.getElementById('letter-note-three')
const letterNoteFour = document.getElementById('letter-note-four')
const letterNoteFive = document.getElementById('letter-note-five')
const letterNoteSix = document.getElementById('letter-note-six')

// These variables store the buttons that progress the user through the lyrics
const lineTwo = document.getElementById('line-two')
const lineThree = document.getElementById('line-three')
const lineFour = document.getElementById('line-four')
const reset = document.getElementById('reset')

// This variable stores the '-END' lyric element
const lastLyric = document.getElementById('column-optional')

/* get all html elements into notes array */
const notes = []
pianoKeys.forEach(key => notes.push(document.getElementById(key)))

/* create color change events for keys */
const changeNoteColorToRed = event => (event.target.style.backgroundColor = '#fd4d3f')
const changeNoteColorToDef = event => (event.target.style.backgroundColor = '')

/* event handler properties that will be assigned to each key */
const enableNoteColorChange = note => {
  note.onmousedown = changeNoteColorToRed
  note.onmouseup = changeNoteColorToDef
}

/* assign color change event handler for every note */
notes.forEach(note => enableNoteColorChange(note))

/* default */
resetButtons()

// Write anonymous event handler property and function for the first progress button
lineTwo.onclick = () => {
  lineTwo.hidden = true
  lineThree.hidden = false
  letterNoteFive.innerHTML = 'D'
  letterNoteSix.innerHTML = 'C'
}

lineThree.onclick = () => {
  lineThree.hidden = true
  lineFour.hidden = false
  wordFive.innerHTML = 'DEAR'
  wordSix.innerHTML = 'FRI-'
  letterNoteThree.innerHTML = 'G'
  letterNoteFour.innerHTML = 'E'
  letterNoteFive.innerHTML = 'C'
  letterNoteSix.innerHTML = 'B'
  lastLyric.style.display = 'inline-block'
}

lineFour.onclick = () => {
  lineFour.hidden = true
  reset.hidden = false
  wordFive.innerHTML = 'TO'
  wordSix.innerHTML = 'YOU!'
  letterNoteOne.innerHTML = 'F'
  letterNoteTwo.innerHTML = 'F'
  letterNoteThree.innerHTML = 'E'
  letterNoteFour.innerHTML = 'C'
  letterNoteFive.innerHTML = 'D'
  letterNoteSix.innerHTML = 'C'
  lastLyric.style.display = 'none'
}

reset.onclick = () => {
  resetSong()
}

/* reset helper functions */
function resetSong() {
  wordSix.innerHTML = 'YOU'
  letterNoteOne.innerHTML = 'G'
  letterNoteTwo.innerHTML = 'G'
  letterNoteThree.innerHTML = 'A'
  letterNoteFour.innerHTML = 'G'
  letterNoteFive.innerHTML = 'C'
  letterNoteSix.innerHTML = 'B'
  resetButtons()
}

function resetButtons() {
  lineTwo.hidden = false
  lineThree.hidden = true
  lineFour.hidden = true
  reset.hidden = true
}

function playSound(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`)
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`)
  if (!audio) return // stop function altogether if null
  audio.currentTime = 0 // rewind to start on each key press
  audio.play()
  key.classList.add('playing')
}

function removeTransition(event) {
  if (event.propertyName !== 'transform') return // skip if not a transform event
  this.classList.remove('playing')
}

/* attach transition end listener to each key */
const keys = document.querySelectorAll('.key')
keys.forEach(key => key.addEventListener('transitionend', removeTransition))

/* play element on page equal to data-key */
window.addEventListener('keydown', playSound)
