export const SecondaryButton = ({ className, children, ...props }) => {

    return (
        <button {...props}
            className={`w-full h-10 rounded-xl bg-mygreen text-center text-base font-medium text-white ${className}`}>
            {children}
        </button>
    )
}