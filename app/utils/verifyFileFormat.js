export function verifyFileFormat(type) {
    const acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png']

    if(acceptedFormats.includes(type)) return true

    return false
}