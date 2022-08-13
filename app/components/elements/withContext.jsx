import { Context } from "../../components"
import { useContext } from "react"

export function withContext(Compo) {
    return function(props) {
        const context = useContext(Context)

        return <Compo {...props} context={context} />
    }
}