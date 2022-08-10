import { SearchImage, CrossInCircleImage } from "../../components"

export function AuxiliarDivSearch({ className, children, state, type, content, onInput, onEditClick, onCreate, ref }) {
    return (
        <div className={`px-4 mb-4 flex flex-col gap-1 ${className || ''}`} ref={ref}>
            <h2 className={"font-medium" + (state === 'inactive' ? ' text-placeholder' : ' text-myblack')}>
                {(type === 'artist' && state !== 'inactive' && state && 'closed' && state !== 'chosen') ? 'Pick an Artist'
                    : type === 'artist' ? 'Artist'
                        : type === 'song' && 'Pick a Song'
                }
            </h2>

            {state === 'active' || state === 'create' ?
                <form onSubmit={event => {
                    event.preventDefault()

                    onCreate(event)
                }}>
                    <div
                        className="w-full px-4 py-3 bg-white border border-inputBg rounded flex gap-2">
                        <SearchImage className="w-5 h-5" />
                        <input
                            className="w-full bg-white focus:outline-none text-sm text-mygrey"
                            type="search"
                            name="input"
                            onInput={onInput} />
                    </div>
                    {state === 'create' &&
                        <div className="w-full px-4 py-1 flex justify-center gap-2">
                            <p className="text-sm my-grey">{"Don't have interpretations for this " + (type === 'artist' ? 'artist' : 'song')}</p>
                            <button
                                type="submit"
                                className="text-sm font-bold text-myblue">Create It</button>
                        </div>
                    }
                </form>

                :

                state === 'chosen' ?
                    <div className="w-full px-4 py-3 bg-white border border-myblack rounded flex justify-between items-center gap-2">
                        <p className="w-full bg-white text-sm text-myblack">{content.name}</p>
                        <CrossInCircleImage onClick={onEditClick} />
                    </div>

                    :

                    <div className="w-full px-4 py-3 bg-white border border-inputBg rounded flex gap-2">
                        <SearchImage color="grey" className="w-5 h-5" />
                        <p className="w-full bg-white text-sm text-placeholder" />
                    </div>
            }
            {children}
        </div>
    )
}