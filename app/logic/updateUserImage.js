import { validateFile, validateJWT } from 'validators'
import imageCompression from 'browser-image-compression'
import Apium from '../vendor/Apium'

export async function updateUserImage(token, file) {
    
    validateJWT(token)
    validateFile(file)

    console.log(`size file is ${file.size / 1024 / 1024} MB`)

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,   
    }

    const compressedFile = await imageCompression(file, options)

    console.log(`size file compressed ${compressedFile.size / 1024 / 1024} MB`)

    const formData = new FormData()

    formData.append('file', compressedFile)

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    const { status, payload } = await api.patch(
        'users/image',
        {
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data'
            },
            body: formData
        })

    if (status === 204) return

    else if (status >= 400 && status < 500) {
        const data = JSON.parse(payload)

        throw new Error(data.error)
    }

    else if (status >= 500) throw new Error('server error')

}