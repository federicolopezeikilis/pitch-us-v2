export const ButtonGreen = ({ className, children, onClick, active, ...props }) => {
    return (
        <button onClick={onClick} {...props}
            className={`h-8 px-4 py-2 rounded-3xl border border-myblue flex items-center justify-center font-medium ${className} ${active ? "text-white bg-mygreen" : "text-mygreen"}`}>
            {children}
        </button>
    )
}