import { Context } from "../../components"
import { useContext } from "react"

export function withContext(Compo) {
    const MyComp = (props) => {
        const context = useContext(Context)

        return <Compo {...props} context={context} />
    }

    MyComp.displayName = 'none'
    
    return myComp
}