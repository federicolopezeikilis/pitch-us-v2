import Link from 'next/link'
import { SearchImage } from "../../components"

export const SearchLink = ({ className, pageOn, onClick }) => {
    return (
            <Link href="/search" className={`${className || ''}`} >
                <a onClick={onClick}>
                <SearchImage className="w-8 h-8" pageOn={pageOn} />
                </a>
            </Link>
    )
}