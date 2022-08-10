import Link from 'next/link'
import { HomeImage } from "../../components"

export const HomeLink = ({ className, pageOn, onClick }) => {
    return (
        <Link href="/" className={`${className || ''}`}>
            <a onClick={onClick}>
                <HomeImage pageOn={pageOn} />
            </a>
        </Link>
    )
}

