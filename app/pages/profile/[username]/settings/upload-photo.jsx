import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { verifyTokenAndRedirect, returnFileSize } from '../../../../helpers'
import { verifyFile } from '../../../../utils'
import { updateUserImage, retrieveUser } from '../../../../logic'
import { ButtonGreen, Context, FlexColSection, Footer, ChevronLeftImage } from '../../../../components'

export default function UploadPhoto({ token, user }) {
    const [file, setFile] = useState({ isTypeAllowed: true, isSizeAllowed: true, size: null })
    const [filePath, setFilePath] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    const router = useRouter()

    const { handleFeedback } = useContext(Context)

    const handleFileChange = event => {
        const fileUpload = event.target.files[0]

        let path = event.target.value

        const index = path.lastIndexOf('\\')

        path = path.substring(index + 1)

        setFilePath(path)

        const { isTypeAllowed, isSizeAllowed } = verifyFile(fileUpload)

        if (!isSizeAllowed) {
            const size = returnFileSize(fileUpload.size)

            setFile({ isSizeAllowed, isTypeAllowed, size })

        } else {
            setFile({ isSizeAllowed, isTypeAllowed })

            setPreviewImage(URL.createObjectURL(fileUpload))
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault()

        if (!file.isSizeAllowed || !file.isTypeAllowed) return

        const fileUpload = event.target.profileImage.files[0]

        try {
            await updateUserImage(token, fileUpload)

            router.push(`/profile/${user.username}/settings`)
        } catch (error) {
            handleFeedback('error', 'Error', error.message)
        }
    }

    return (
        <>
            <Head>
                <title>Upload profile photo or avatar | PitchUs</title>
            </Head>

            <header className="shadow-custom-items pt-7 px-4 pb-4">
                <Link href={`/profile/${user.username}/settings`}>
                    <a>
                        <ChevronLeftImage className="w-8 h-8 float-left" />
                    </a>
                </Link>
                <h1 className="text-xl text-mygrey font-bold">Upload Photo</h1>
            </header>

            <FlexColSection className="p-4">
                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-4">

                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="profileImage"
                            className="h-8 w-fit px-4 py-2 rounded-3xl shrink-0 flex items-center justify-center font-medium bg-myblue text-white" >
                            Choose you image
                        </label>
                        {filePath && <p>{filePath}</p>}

                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            id="profileImage"
                            name="profileImage"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {!file.isTypeAllowed && <p>Only .png, .jpg, .jpeg formats are allowed</p>}
                    {!file.isSizeAllowed && <p>{`Only a file with less than 5 MB are allowed. You file has ${file.size}`}</p>}

                    {previewImage &&
                        <div className="flex flex-col items-center justify-center gap-4">
                            <figure className="w-fit flex flex-col items-center justify-center gap-4">
                                <img
                                    src={previewImage}
                                    className="w-28 h-28 rounded-full" />
                            </figure>
                            <ButtonGreen className="w-fit" type="submit" active={true} >Send</ButtonGreen>
                        </div>
                    }

                </form>
            </FlexColSection>

            <Footer user={user} page="user-session" />

        </>
    )
}

export async function getServerSideProps({ req, res }) {
    const token = await verifyTokenAndRedirect(req, res)

    if (!token) return { props: {} }

    const user = await retrieveUser(token)

    return { props: { token, user } }
}