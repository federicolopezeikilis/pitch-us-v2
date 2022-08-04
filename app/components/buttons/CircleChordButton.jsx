export const CircleChordButton = ({ className, children, ...props }) => {
    return (
        <button {...props}
            className={`border-2 border-mygreen rounded-full py-1 px-2 text-mygreen font-medium leading-none ${className}`}>
            {children}
        </button>
    )
}