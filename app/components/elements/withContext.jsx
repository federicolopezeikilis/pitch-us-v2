import { Context } from "../../components"
import { useContext } from "react"

export function withContext(Compo) {
    const MyCompoTemp = (props) => {
        const context = useContext(Context)

        return <Compo {...props} context={context} />
    }

    MyCompoTemp.displayName = 'none'
    
    return MyCompoTemp
}