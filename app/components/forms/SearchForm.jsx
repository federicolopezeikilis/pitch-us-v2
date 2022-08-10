import { SearchImage, ButtonBlue, Tag } from '..'

export function SearchForm({ className, children, onChangeInput, onCancelClick, tag, onAllTagClick, onArtistsTagClick, onSongsTagClick, onUsersTagClick, ...props }) {
    return (
        <form className={`w-full flex flex-col gap-4 ${className}`}>
            <div className={`w-full h-10 flex items-center justify-between gap-2`} >
                <div className="w-full border border-inputBorder rounded-lg bg-inputBg pl-4 flex items-center">
                    <SearchImage className="w-6 h-6" />
                    <input className="h-10 w-full py-3 px-4 bg-inputBg focus:outline-none placeholder-black placeholder-opacity-50 text-sm text-mygrey"
                        type="search"
                        placeholder="Artists, songs or users"
                        onChange={onChangeInput} />
                </div>
                <ButtonBlue type="reset" onClick={onCancelClick}>Cancel</ButtonBlue>
            </div>
            <div className="w-full flex gap-2">
                <Tag
                    active={tag === 'all' ? true : false}
                    onClick={event => {
                        event.preventDefault()
                        onAllTagClick()
                    }}
                >All</Tag>

                <Tag
                    active={tag === 'artists' ? true : false}
                    onClick={event => {
                        event.preventDefault()
                        onArtistsTagClick()
                    }}
                >Artists</Tag>

                <Tag
                    active={tag === 'songs' ? true : false}
                    onClick={event => {
                        event.preventDefault()
                        onSongsTagClick()
                    }}
                >Songs</Tag>

                <Tag
                    active={tag === 'users' ? true : false}
                    onClick={event => {
                        event.preventDefault()
                        onUsersTagClick()
                    }}
                >Users</Tag>
            </div>
        </form>
    )
}