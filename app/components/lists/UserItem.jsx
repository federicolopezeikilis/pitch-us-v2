import Link from 'next/link'
import { UserIcon } from '../../components'

export const UserItem = ({ className, user, onClick }) => {

    return (
        <li
            className={`w-full h-14 bg-primary shadow-custom-items ${className}`}
            onClick={onClick}>

            {!onClick ?
                <Link href={`/profile/${user.username}`} >
                    <a className="w-full h-full px-4 flex gap-4 items-center">
                        <UserIcon className="w-6 h-6" />
                        <div className="h-full w-full flex flex-col justify-center">
                            <h2 className="leading-4 font-medium text-myblack" >{user.username}</h2>
                            <p className="w-full leading-4 text-sm font-medium text-placeholder" >User</p>
                        </div>
                    </a>
                </Link>
                :
                <div className="w-full h-full px-4 flex gap-4 items-center">
                    <UserIcon className="w-6 h-6" />
                    <div className="h-full w-full flex flex-col justify-center">
                        <h2 className="leading-4 font-medium text-myblack" >{user.username}</h2>
                        <p className="w-full leading-4 text-sm font-medium text-placeholder" >User</p>
                    </div>
                </div>
            }

        </li>
    )
}