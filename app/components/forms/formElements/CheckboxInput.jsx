export const CheckboxInput = ({ className, children, ...props }) => {
    return (
        <input type="checkbox" defaultChecked {...props}
            className={`${className}`}>
            {children}
        </input>
    )
}