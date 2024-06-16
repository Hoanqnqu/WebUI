import { Avatar, Dropdown, MenuProps } from "antd"
import { MdOutlineAdminPanelSettings, MdLogout, MdOutlinePayment } from "react-icons/md"
import { BiUser } from "react-icons/bi"
import { logOut } from "@/redux/features/auth/auth.slice"
import { useAppDispatch } from "@/redux/hook"
import { MdOutlineMenu } from "react-icons/md"
import { useState } from "react"
import { ROLE } from "@/utils/constants/GlobalConst"
import { SITE_MAP } from "@/utils/constants/Path"
import { useNavigate } from "react-router-dom"
import { VscSignIn } from "react-icons/vsc"
import { HiLogin } from "react-icons/hi"
import { AvatarDefault } from "@/assets/images"
import { ItemType } from "antd/es/menu/hooks/useItems"
import useAuth from "@/hooks/useAuth"
import "./style.css"
import { FaRegHeart } from "react-icons/fa"
import { RiVipCrownLine } from "react-icons/ri"
import { LuClipboardSignature, LuLayoutDashboard } from "react-icons/lu"

const UserMenu = () => {
    const { userInfo, role, isAuth } = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onClick: MenuProps["onClick"] = ({ key }) => {
        switch (key) {
            case "propfile":
                navigate(SITE_MAP.MY_PROFILE)
                break
            case "logout":
                dispatch(logOut())
                navigate(SITE_MAP.INDEX)
                break
            default:
                break
        }
    }

    const itemsUser: ItemType[] = [
        {
            key: "propfile",
            label: "My Profile",
            icon: <BiUser className="mr-4 h-4 w-4" />
        },
       
        {
            type: "divider"
        },
        {
            key: "logout",
            label: "Logout",
            icon: <MdLogout className="mr-4 h-4 w-4" />
        }
    ].filter(Boolean) as ItemType[]

    const itemGuest: MenuProps["items"] = [
        { key: "signup", label: "Sign Up", icon: <VscSignIn className="mr-4 h-4 w-4" /> },
        {
            type: "divider"
        },
        {
            key: "login",
            label: "Login",
            icon: <HiLogin className="mr-4 h-4 w-4" />
        }
    ]

    const items = isAuth ? itemsUser : itemGuest

    return (
        <Dropdown
            className={`relative flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-3 pr-2 transition duration-200 hover:shadow-xl ${
                isOpen ? "shadow-xl" : "shadow-none"
            }`}
            placement="bottomRight"
            menu={{ items, onClick }}
            trigger={["click"]}
            arrow
            onOpenChange={() => setIsOpen(!isOpen)}
        >
            <div>
                {/* {role === ROLE.USER && (
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-24 hidden whitespace-nowrap text-sm font-bold md:block"
                    >
                        Become a host
                    </button>
                )} */}
                <MdOutlineMenu className="h-5 w-5" />
                <Avatar className="cursor-pointer" src={userInfo ? userInfo.photo : AvatarDefault} size={36} />
            </div>
        </Dropdown>
    )
}

export default UserMenu
