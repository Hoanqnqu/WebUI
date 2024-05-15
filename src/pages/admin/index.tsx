import Slider from "@/container/Slider"
import { Outlet } from "react-router-dom"

const Admin = () => {
    return (
        <div className="flex h-screen overflow-y-hidden">
            <Slider />
            <div className="h-full w-full overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Admin
