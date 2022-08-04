export const Label = ({ className, children, ...props }) => {
    return (
        <label {...props}
            className={`text-base font-light ${className}`}>
            {children}
        </label>
    )
}