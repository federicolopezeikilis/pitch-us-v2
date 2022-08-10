import Link from 'next/link'

export const BlueAnchor = ({ className, children, ...props }) => {
    return (
        <Link {...props}>
            <a
                className={`text-xs text-myblue font-bold ${className || ''}`}>
                {children}
            </a>
        </Link>
    )
}