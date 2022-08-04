import Link from 'next/link'
import { UserSessionImage } from "../../components"

export const UserSessionLink = ({ className, children, user, pageOn, onClick, ...props }) => {
    return (
        <Link href={user ? `/profile/${user.username}` : '/login'} className={`${className}`} {...props}>
            <a onClick={onClick}>
                <UserSessionImage pageOn={pageOn} />
            </a>
        </Link>
    )
}