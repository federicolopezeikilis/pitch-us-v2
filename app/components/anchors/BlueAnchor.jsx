export const BlueAnchor = ({ className, children, ...props }) => {

    return (
        <a
            className={`text-xs text-myblue font-bold ${className}`}>
            {children}
        </a>
    )
}