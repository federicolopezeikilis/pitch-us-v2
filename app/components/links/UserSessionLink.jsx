import Link from 'next/link'
import { UserSessionImage } from "../../components"
import { stringToUrl } from '../../utils'

export const UserSessionLink = ({ className, children, user, pageOn, onClick, ...props }) => {
    return (
        <Link href={user ? `/profile/${stringToUrl(user.username, true)}` : '/login'} className={`${className || ''}`}>
            <a onClick={onClick}>
                <UserSessionImage pageOn={pageOn} alt={user ? "Own profile link" : "Login link"} />
            </a>
        </Link>
    )
}