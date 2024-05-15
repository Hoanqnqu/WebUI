import ScrollToTop from "@/components/ScrollToTop"
import Footer from "@/container/Footer"
import Header from "@/container/Header"
import usePath from "@/hooks/usePath"
import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"

const HomeLayout = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    const { isIndex } = usePath()

    return (
        <div className="flex min-h-screen w-full flex-col overflow-y-auto overflow-x-hidden">
            <Header />

            {!isIndex && <div className="h-16" />}

            <div className="grow">
                <Outlet />
            </div>
            <Footer />

            <ScrollToTop />
        </div>
    )
}

export default HomeLayout
