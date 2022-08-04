export const ChordButton = ({ className, children, ...props }) => {
    return (
        <button {...props}
            className={`font-bold ${className}`}>
            {children}
        </button>
    )
}