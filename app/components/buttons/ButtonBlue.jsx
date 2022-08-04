export const ButtonBlue = ({ className, children, onClick, ...props }) => {
    return (
        <button onClick={onClick} {...props}
            className={`font-bold text-myblue ${className}`}>
            {children}
        </button>
    )
}