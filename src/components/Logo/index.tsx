import { useNavigate } from "react-router-dom"
import { SITE_MAP } from "@/utils/constants/Path"
import { RentallyLogo, RentallyLogoFull } from "@/assets/images"

interface ILogo {
    isOpen?: boolean
}

const Logo = (props: ILogo) => {
    const { isOpen = true } = props

    const navigate = useNavigate()

    const handleClick = (e: any) => {
        e.stopPropagation()
        navigate(SITE_MAP.INDEX)
    }

    return (
        <div className="flex flex-row items-center justify-center gap-2">
        <img
            onClick={(e) => handleClick(e)}
            className={`${isOpen ? "h-full" : "h-8"} max-h-10 cursor-pointer transition duration-100`}
            src={isOpen ? RentallyLogoFull : RentallyLogo}
            alt="Rentally Logo"
        />
       {isOpen? <h3 className="text-[#FFBF66] text-xl tracking-wide">NewsFU</h3>:<></>}
        </div>
        
    )
}

export default Logo
