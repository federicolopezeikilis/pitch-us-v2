import { CHORD_REGEX } from '../../helpers/constants'
import { validateInterpretationContent } from "validators"
import { Fragment } from 'react'
import { ChordButton } from '../../components'

export function Interpretation({ className, content, onChordClick }) {
    validateInterpretationContent(content)
    let positions = [], match

    while (match = CHORD_REGEX.exec(content)) {
        positions.push({ firstPosition: match.index, lastPosition: CHORD_REGEX.lastIndex })
    }

    if (positions.length === 0) {
        return <p>{content}</p>
    }

    return (
        <article className={className}>
            <p>{positions.map((position, index) => {
                let textFirstPart = ''
                let textLastPart = ''
                if (index === 0) {
                    if (position.firstPosition !== 0) {
                        textFirstPart = content.slice(0, position.firstPosition)
                    }
                } else {
                    textFirstPart = content.slice(positions[index - 1].lastPosition, position.firstPosition)
                }

                if (index === positions.length - 1) {
                    textLastPart = content.slice(position.lastPosition)
                }

                const chord = content.slice(position.firstPosition, position.lastPosition)

                return <Fragment key={index * 100}><>{textFirstPart.split('').map((character, index) => {
                    if (character === ' ' && textFirstPart[index - 1] === ' ') return <Fragment key={index * Math.random() * 100}>&nbsp;</Fragment>
                    else if (character === '\n') return <Fragment key={index * Math.random() * 100}><br /></Fragment>
                    else return <Fragment key={index * Math.random() * 100}>{character}</Fragment>
                })}</>
                    <ChordButton
                        onClick={event => {
                            event.preventDefault()

                            if (onChordClick)
                                onChordClick(chord)
                        }}
                    >{chord}
                    </ChordButton>

                    <>{textLastPart.split('').map((character, index) => {
                        if (character === ' ') return <Fragment key={index * Math.random() * 100}>&nbsp;</Fragment>
                        else if (character === '\n') return <Fragment key={index * Math.random() * 100}><br /></Fragment>
                        else return <Fragment key={index * Math.random() * 100}>{character}</Fragment>
                    })}</></ Fragment>
            })}</p>
        </article>
    )
}