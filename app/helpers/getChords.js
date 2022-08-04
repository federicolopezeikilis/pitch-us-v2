import { validateInterpretationContent } from 'validators'
import { CHORD_REGEX } from './constants'

/**
 * 
 * @param {*} interpretation 
 * @returns 
 */
export function getChords(interpretation) {
    validateInterpretationContent(interpretation)
    
    const chords = interpretation.match(CHORD_REGEX)

    const uniqueChords = [...new Set(chords)]

    return uniqueChords
}

