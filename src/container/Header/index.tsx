import Logo from "@/components/Logo"
import UserMenu from "../UserMenu"
import { AiOutlineSearch } from "react-icons/ai"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { SITE_MAP } from "@/utils/constants/Path"
import SearchRoom from "./search"
import Filter from "./filter"

const Header = () => {
    const searchToolRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isSticky, setIsSticky] = useState(false)

    const handleOnClick = (e: any) => {
        e.stopPropagation()
        setIsOpen(true)
    }

    const handleClickOutside = (e: any) => {
        if (searchToolRef.current && !searchToolRef.current.contains(e.target as HTMLElement)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 200)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    const location = useLocation()
    const isHome = location.pathname === SITE_MAP.INDEX

    return (
        <div
            onClick={() => setIsOpen(false)}
            className={`${isOpen ? "h-24" : "h-16"} ${isSticky ? "bg-white" : isHome ? "bg-transparent" : "bg-white"} 
            fixed top-0 z-[999] flex w-full items-center justify-between px-4 py-3 shadow-sm transition-all duration-150 sm:px-6 md:px-10 xl:px-28`}
        >
            <Logo />

            {isHome && (
                <div className="flex h-full grow flex-col items-center justify-center transition-all duration-200">
                    <div className={`BG-W my-1 flex items-center justify-center gap-4 ${isOpen ? "block" : "hidden"}`}>
                        <SearchRoom />
                        <Filter />
                    </div>

                    <div className={`${isOpen ? "hidden" : "block"} cursor-pointer `}>
                        <div
                            ref={searchToolRef}
                            onClick={handleOnClick}
                            className={`flex w-fit items-center justify-center gap-4 rounded-3xl border border-gray-100 bg-white py-1 pl-4 pr-2 text-sm font-bold shadow-md shadow-black/20`}
                        >
                            <span className="border-r border-gray-100 pr-4">City</span>

                            <span className="border-r border-gray-100 pr-4">District</span>

                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                                <AiOutlineSearch className="h-4 w-4" />
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <UserMenu />
        </div>
    )
}

export default Header
