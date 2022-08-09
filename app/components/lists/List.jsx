export const List = ({ className, children, title }) => {
    return (
        <div className="py-4 w-full flex flex-col gap-2">
            <h2 className="px-4 text-xl font-bold text-mygrey">{title}</h2>

            <ul className={`px-4 flex items-center overflow-auto scrollbar-hide gap-2 ${className}`}>
                {children}
            </ul>
        </div>
    )
}