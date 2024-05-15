import { SITE_MAP } from "@/utils/constants/Path"
import { useLocation } from "react-router-dom"

const usePath = () => {
    const location = useLocation()

    const isIndexPath = location.pathname === SITE_MAP.INDEX
    const params = new URLSearchParams(location.search)
    const hasParams = !params.keys().next().done

    return {
        isIndex: isIndexPath && !hasParams,
        path: location.pathname
    }
}

export default usePath
