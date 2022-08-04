import { useState } from 'react'
import { verifyTokenAndRedirect, returnFileSize } from '../../../../helpers'
import { verifyFile } from '../../../../utils'
import { updateUserImage } from '../../../../logic'

export default function UploadPhoto({ token }) {
    const [file, setFile] = useState({ isTypeAllowed: true, isSizeAllowed: true, size: null })

    const handleFileChange = event => {
        
        const fileUpload = event.target.files[0]

        const { isTypeAllowed, isSizeAllowed } = verifyFile(fileUpload)

        if (!isSizeAllowed) {
            const size = returnFileSize(fileUpload.size)

            setFile({ isSizeAllowed, isTypeAllowed, size })
        } else {
            setFile({ isSizeAllowed, isTypeAllowed })
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault()

        if (!file.isSizeAllowed || !file.isTypeAllowed) return

        const fileUpload = event.target.profileImage.files[0]

        try {
            updateUserImage(token, fileUpload)
        } catch (error) {
            //TODO handle feedback
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="file"
                accept=".png, .jpg, .jpeg"
                id="profileImage"
                name="profileImage"
                onChange={handleFileChange} />

            {!file.isTypeAllowed && <p>Only .png, .jpg, .jpeg formats are allowed</p>}
            {!file.isSizeAllowed && <p>{`Only a file with less than 5 MB are allowed. You file has ${file.size}`}</p>}

            <button type="submit">Send</button>
        </form>
    )
}

export async function getServerSideProps({ req, res }) {
    const token = await verifyTokenAndRedirect(req, res)

    return { props: { token } }
}