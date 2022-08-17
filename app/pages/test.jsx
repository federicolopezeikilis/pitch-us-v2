import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

export default function Test() {

    return <h1>Test</h1>
}

export async function getServerSideProps({ req, res }) {
    debugger
    const session = await unstable_getServerSession(req, res, authOptions)
    console.log(session)

    //session.token contains jwt form api
    return { props: {} }
}
