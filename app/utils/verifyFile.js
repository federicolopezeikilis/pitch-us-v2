import { verifyFileFormat } from "."
import { verifyFileSize } from "."

export function verifyFile(file) {
    const isTypeAllowed = verifyFileFormat(file.type)
    const isSizeAllowed = verifyFileSize(file.size)

    return { isTypeAllowed, isSizeAllowed }
}