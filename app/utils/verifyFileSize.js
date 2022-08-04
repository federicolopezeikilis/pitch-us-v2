export function verifyFileSize(bytes) {
    if(bytes > 5242880) return false

    return true
}