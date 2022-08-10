export const Input = ({ className, children, ...props }) => {
    return (
        <input {...props}
            className={`h-11 w-full py-3 px-4 rounded-lg border border-inputBorder bg-inputBg placeholder-placeholder text-sm text-mygrey ${className}`}>
            {children}
        </input>
    )
}