import { removeCookie } from '../helpers'

export default function Logout() {
    return <></>
}

export async function getServerSideProps({ req, res }) {
    await removeCookie(req, res, 'token')

    res.writeHead(307, { Location: '/login' })
    res.end()

    return { props: {} }
}

