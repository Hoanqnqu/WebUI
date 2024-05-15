import { FaArrowUp } from "react-icons/fa"
import { useEffect, useState } from "react"
import Button from "@/components/Button"

const ScrollToTop = () => {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop
            const scrollThreshold = 200

            setShowButton(scrollY > scrollThreshold)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <Button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-[9999] h-10 w-10 cursor-pointer rounded-full bg-primary text-white transition-all duration-100 hover:scale-110 ${
                showButton ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            <FaArrowUp />
        </Button>
    )
}

export default ScrollToTop
