export const ButtonGreen = ({ className, children, onClick, active, ...props }) => {
    return (
        <button onClick={onClick} {...props}
            className={`w-full rounded-full border border-myblue flex items-center justify-center font-medium ${className || ''} ${active ? "text-white bg-mygreen" : "text-mygreen"}`}>
            {children}
        </button>
    )
}