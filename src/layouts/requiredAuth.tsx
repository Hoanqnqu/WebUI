import { Navigate, Outlet } from "react-router-dom"
import useAuth from "@/hooks/useAuth"

export const RequireAuthAdmin = () => {
    const { role } = useAuth()

    switch (role) {
        case "admin":
            return <Outlet />
        default:
            return <Navigate to="/login" />
    }
}
