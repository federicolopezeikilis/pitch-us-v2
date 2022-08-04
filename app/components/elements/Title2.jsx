export function Title2({ className, children, ...props }) {
    return (
        <h2 className={`text-secondarygrey font-bold text-xl ${className}`}>
            {children}
        </h2>
    )
}