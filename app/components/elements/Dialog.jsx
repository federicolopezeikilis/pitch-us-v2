import Link from "next/link";
const querystring = require('query-string');

export function Dialog({ level, title, description, button1, button2, onCloseClick, onCloseDialog }) {
    const state = Math.random() * 10000;
    const scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-position playlist-read-collaborative user-read-playback-state user-follow-read user-read-currently-playing user-library-read playlist-read-private'

    return (
        <div className="fixed w-[358px] top-1/2 left-1/2 [transform:translate(-50%,-50%)] pt-8 px-4 pb-2 rounded-3xl bg-white flex flex-col gap-6">
            <div className="w-full flex flex-col gap-4">
                <h4 className="w-full flex items-center justify-center text-xl font-bold text-myblack">{title}</h4>
                <p className="w-full text-center text-mygrey">{description}</p>
            </div>
            <div className="w-full flex flex-col gap-2">

                <Link href={`https://accounts.spotify.com/authorize?${querystring.stringify({
                    response_type: 'code',
                    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
                    scope: scope,
                    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
                    state: state
                })}`} >
                    <a className="w-full p-4 rounded-full bg-mygreen text-white flex justify-center items-center"
                    >{button1}
                    </a>
                </Link>

                <button
                    className="w-full p-4 text-myblue flex justify-center items-center"
                    onClick={function () {
                        
                        onCloseClick()
                        onCloseDialog()
                    }}
                >{button2}</button>
            </div>
        </div >
    )



    // <div className="fixed bottom-24 w-full px-4" >

    //     <div className={"border-2 p-4 rounded-3xl flex gap-4 " +

    //         (level === 'info' ? "border-myblue bg-purpleBg" :
    //             level === 'success' ? "border-mygreen bg-mygreenLight" :
    //                 level === 'warning' ? "border-myorange bg-myorangeLight" : "border-mymagenta bg-mymagentaLight")
    //     } >

    //         <FeedbackImage className="w-6 h-6" level={level} />

    //         <div className="w-full flex flex-col">
    //             <h5 className="font-bold text-myblack">{title}</h5>
    //             <p className="text-myblack">{description}</p>
    //         </div>

    //         <button
    //             className={"w-6 h-6" + (level !== 'error' ? ' hidden' : '')}
    //             onClick={onCloseImageClick}>

    //             <CrossImage className="w-6 h-6" />

    //         </button>
    //     </div>
    // </div>

    // level, title, description, button1, button2,
}