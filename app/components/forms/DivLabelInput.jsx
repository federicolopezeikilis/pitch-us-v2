export const DivLabelInput = ({ className, children }) => {
    return (
        <div className={`flex content-between items-start gap-1 ${className || ''}`}>
            {children}
        </div>
    )
}