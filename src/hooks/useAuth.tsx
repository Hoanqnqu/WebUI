import { useAppSelector } from "@/redux/hook"

const useAuth = () => {
    const userInfo = useAppSelector((state) => state.auth.userInfo)

    const isAuth = !!userInfo

    const role = userInfo?.role

    return { isAuth, role, userInfo }
}

export default useAuth
