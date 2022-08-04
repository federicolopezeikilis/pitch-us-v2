export const FlexColSection = ({ className, children, ...props }) => {
    return (
        <section {...props}
            className={`w-full h-full flex flex-col ${className}`}>
            {children}
        </section>
    )
}