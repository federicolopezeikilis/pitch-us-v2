import { useEffect, useState } from 'react'
import { SearchLink, HomeLink, CreateInterPretationLink, UserSessionLink, Context } from '../../components'
import { useContext } from 'react'

export function Footer({ user, page }) {
    const { handleCloseDialogClick } = useContext(Context)
    
    const [pageHome, setPageHome] = useState(false)
    const [pageSearch, setPageSearch] = useState(false)
    const [pageCreateInterpretation, setPageCreateInterpretation] = useState(false)
    const [pageUserSession, setPageUserSession] = useState(false)

    useEffect(() => {
        switch (page) {
            case 'home':
                setPageHome(true)
                break;
            case 'search':
                setPageSearch(true)
                break;
            case 'create-interpretation':
                setPageCreateInterpretation(true)
                break;
            case 'user-session':
                setPageUserSession(true)
                break;
        }
    }, [])

    return <footer className="w-full h-20 bg-white shadow-custom-footer flex justify-center" >
        <nav className="w-4/5 flex justify-between items-center">
            <HomeLink pageOn={pageHome} onClick={handleCloseDialogClick} />
            <SearchLink pageOn={pageSearch} onClick={handleCloseDialogClick} />
            <CreateInterPretationLink pageOn={pageCreateInterpretation} onClick={handleCloseDialogClick} userLoggedIn={!!user} />
            <UserSessionLink user={user} pageOn={pageUserSession} onClick={handleCloseDialogClick} />
        </nav>
    </footer>
}