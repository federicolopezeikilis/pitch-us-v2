export function Title({ className, children, ...props }) {
    return (
        <h1 className={`text-3xl text-myblack font-bold ${className}`}>
            {children}
        </h1>
    )
}