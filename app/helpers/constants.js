const CHORD_REGEX = /((\\)?\b[A-G](?:(?:add|dim|°|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)/g

const GUITAR = {
    strings: 6,
    fretsOnChord: 4,
    name: 'Guitar',
    keys: [],
    tunings: {
        standard: ['E', 'A', 'D', 'G', 'B', 'E']
    }
}

export {
    CHORD_REGEX,
    GUITAR
}