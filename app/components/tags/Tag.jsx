export const Tag = ({ className, children, active, ...props }) => {
    return (
        <button {...props}
            className={`h-8 px-4 py-2 rounded-3xl border border-myblue flex items-center font-medium ${className} ${active ? "text-white bg-myblue" : "text-myblue"}`}>
            {children}
        </button>
    )
}