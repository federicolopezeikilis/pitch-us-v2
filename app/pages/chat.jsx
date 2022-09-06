import io from 'socket.io-client'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { FlexColSection, Footer, Header, ButtonBlue } from '../components'
import { verifyTokenAndRedirect } from '../helpers'
import { retrieveUser, retrieveBothFollowingsAndFollowers } from '../logic'

export default function Chat({ token, user, follows }) {
    const socket = io(
        process.env.NEXT_PUBLIC_API_SOCKET_URL,
        {
            auth: { token },
            autoConnect: false
        }
    )

    const [users, setUsers] = useState([])
    const [isConnected, setIsConnected] = useState(false)
    const [chat, setChat] = useState(null)

    useEffect(() => {
        socket.connect()

        socket.on('connect', () => setIsConnected(true))

        socket.on('disconnect', () => setIsConnected(false))

        socket.on('users', usersFromApi => setUsers(usersFromApi))

        socket.on('user connected', user => {
            debugger
            setUsers(u => {
                if(!u.some(elem => elem.userId === user.userId))
                    u.push(user)

                return u
            })
        })

        socket.on('connect_error', (error) => {
            console.log(error.message)

            setIsConnected(false)
        })

        socket.onAny((event, ...args) => console.log(event, args))

        return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off('pong')
            socket.off('connect_error')
            socket.off('users')
        }
    }, [])

    const handleChatButton = async follow => {
        socket.emit('reqRetrieveChat', { to: follow.id })

        //const chat = await retrieveChat(token, follow._id)

        socket.on('resRetrieveChat', chat => {
            if (!chat) {
                setChat({ to: follow, messages: null })
            } else {
                setChat({ to: follow, messages: chat.messages })
            }
        })
    }

    const handleFormChatSubmit = event => {
        event.preventDefault()

        const text = event.target.text.value

        event.target.reset()

        if (text !== '')
            socket.emit('chatFromApp', { to: chat.to._id, text })
    }

    return (
        <>
            <Head>
                <title>Chat with musicians | Pitch Us</title>
            </Head>

            <Header title='Chat' />

            <FlexColSection className={'bg-primary flex-1 overflow-y-auto'}>
                <h2>Is Connected: {`${isConnected}`}</h2>
                {follows.map(follow => {
                    const userFollowConnected = users.find(user => user.userId === follow.id)

                    return (
                        <div className="m-4 border border-myblack" key={follow._id}>
                            {userFollowConnected &&
                                <p>this user isconnected</p>
                            }
                            <ButtonBlue
                                className="inline-block"
                                onClick={() => {
                                    handleChatButton(follow)
                                }}>
                                Chat with {follow.username}
                            </ButtonBlue>
                        </div>
                    )
                })}

                {chat &&
                    <div className='w-1/2 p-4 border border-myblack'>
                        <h2>Chat with {chat.to.username}:</h2>
                        {chat.messages && chat.messages.map((message, index) => {
                            return <p key={index}>{message.user.username} says: {message.text}</p>
                        })}
                        <form onSubmit={handleFormChatSubmit}>
                            <input className='border border-myblack' type='text' name='text' />
                            <button type='submit'>Send</button>
                        </form>
                    </div>
                }

            </FlexColSection >

            <Footer user={user} />
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    debugger
    const token = await verifyTokenAndRedirect(req, res)
    const [user, follows] = await Promise.all([retrieveUser(token), retrieveBothFollowingsAndFollowers(token)])

    return { props: { token, user, follows } }
}
