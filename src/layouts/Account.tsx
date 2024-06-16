import { Navigate } from "react-router-dom"
import Cloud from "@/assets/images/cloud.png"
import { useAppSelector } from "@/redux/hook"

type Props = {
    children: string | JSX.Element
}

const Account = ({ children }: Props) => {
    const accessToken = useAppSelector((state) => state.auth.accessToken)

    return !accessToken ? (
        <div className=" relative flex h-screen w-screen items-center justify-center overflow-hidden before:absolute before:right-[-600px] before:top-[-600px] before:h-[1200px] before:w-[1200px] before:rounded-full before:bg-bgColor">
            <div className="relative flex h-[800px] w-[1200px] rounded-[20px] border-neutral-700 shadow-3xl before:absolute before:bottom-[-400px] before:left-[-400px] before:h-[800px] before:w-[800px] before:rounded-full before:border-[140px] before:border-secondary ">
                <div className="relative flex flex-1 flex-col items-center rounded-l-[20px] bg-secondary ">
                    <div>
                    </div>
                    {/* <img src={Logo} alt="" className="w-[510px]" /> */}
                   
                    <img src={Cloud} alt="" className="absolute -left-[1px] bottom-0 z-0 w-[480px] rounded-l-[20px]" />
                </div>
                <div className="relative flex-1 rounded-r-[20px] bg-white  pb-10">
                    <div className="flex h-full w-full flex-col items-center justify-center  ">
                        {/* <img src={RentallyLogo} alt="" className="w-[60px]" /> */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Navigate to="/" />
    )
}

export default Account
