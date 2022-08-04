const { data: { keys, chords } } = require('../data/guitar')
const { GUITAR } = require('./constants')
import { ChordFigure, CircleChordButton, CrossClose17Image } from '../components'

export function generateChordImages(chord) {
    let chordObjectFounded

    if (chord.includes('D#'))
        chord = chord.replace('D#', 'Eb')
    else if (chord.includes('G#'))
        chord = chord.replace('G#', 'Ab')
    else if (chord.includes('A#'))
        chord = chord.replace('A#', 'Bb')
    else if (chord.includes('Db'))
        chord = chord.replace('Db', 'C#')
    else if (chord.includes('Gb'))
        chord = chord.replace('Gb', 'F#')

    if (keys.some(key => key === chord)) {
        chordObjectFounded = chords[chord].find(elem => elem.suffix === 'major')

    } else if (keys.some(key => `${key}m` === chord)) {
        chordObjectFounded = chords[`${chord.slice(0, chord.length - 1)}`].find(elem => elem.suffix === 'minor')

    } else {
        if (chord[1] === '#' || chord[1] === 'b') {
            chordObjectFounded = chords[`${chord.slice(0, 2)}`].find(elem => elem.suffix === `${chord.slice(2)}`)
        } else {
            chordObjectFounded = chords[`${chord.slice(0, 1)}`].find(elem => elem.suffix === `${chord.slice(1)}`)
        }
    }

    try {
        const positions = chordObjectFounded.positions || null

        return positions.map((position, index) => {
            const { fingers, frets, barres, capo, baseFret } = position
            return (
                    <ChordFigure
                        key={index}
                        chord={{ frets, fingers, barres, capo, baseFret }}
                        instrument={GUITAR}
                        lite={false}
                    />
            )
        })
    } catch (error) {
        return console.log('no positions founded')
    }
}
