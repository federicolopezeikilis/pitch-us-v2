import Link from 'next/link'
import { SearchImage } from "../../components"

export const SearchLink = ({ className, children, pageOn, onClick, ...props }) => {
    return (
            <Link href="/search" className={`${className}`}  {...props}>
                <a onClick={onClick}>
                <SearchImage className="w-10 h-10" pageOn={pageOn} />
                </a>
            </Link>
    )
}