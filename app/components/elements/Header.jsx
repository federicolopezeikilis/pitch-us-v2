import Link from 'next/link'
import { NotificationImage, SettingsImage } from '../../components'
import { stringToUrl } from '../../utils'

export function Header({ className, title, page, user, ...props }) {
    return (
        <header className={`w-full shadow-custom-items p-4 flex justify-between items-center ${className}`} {...props}>

            <h1 className="text-3xl font-bold text-myblack">{title}</h1>

            {/* {title === 'Explore' &&
                <nav>
                    <NotificationImage className="w-8 h-8 flex justify-center items-center" />
                </nav>
            } */}

            {user &&
                <Link href={`/profile/${stringToUrl(user.username, true)}/settings`}>
                    <a>
                        <SettingsImage className="w-8 h-8 flex justify-center items-center" />
                    </a>
                </Link>}

        </header>
    )
}