import Link from 'next/link'
import { UserIcon } from '../../components'

export const UserItem = ({ className, children, user, onClick, ...props }) => {
   
    return (
        <li
        className={`w-full h-14 bg-primary shadow-custom-items ${className}`}
        onClick={onClick}
        {...props}>
            
            {!onClick ?
             <Link href={`/profile/${user.username}`} >
                <div className="w-full h-full px-4 flex gap-4 items-center">
                    <UserIcon className="w-6 h-6" />
                    <div className="h-full w-full flex flex-col justify-center">
                        <div className="flex items-end gap-1">
                            <p className="leading-4 font-medium text-myblack" >{user.username}</p>
                        </div>
                        <p className="w-full leading-4 text-sm font-medium text-placeholder" >User</p>
                    </div>
                </div>
            </Link>
            :
            <div className="w-full h-full px-4 flex gap-4 items-center">
                    <UserIcon className="w-6 h-6" />
                    <div className="h-full w-full flex flex-col justify-center">
                        <div className="flex items-end gap-1">
                            <p className="leading-4 font-medium text-myblack" >{user.username}</p>
                        </div>
                        <p className="w-full leading-4 text-sm font-medium text-placeholder" >User</p>
                    </div>
                </div>
            }

        </li>
    )
}