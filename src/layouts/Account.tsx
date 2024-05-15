import { Navigate } from "react-router-dom"
import Logo from "@/assets/images/Logo.svg"
import Cloud from "@/assets/images/cloud.png"
import { useAppSelector } from "@/redux/hook"
import { RentallyLogo } from "@/assets/images"

type Props = {
    children: string | JSX.Element
}

const Account = ({ children }: Props) => {
    const accessToken = useAppSelector((state) => state.auth.accessToken)

    return !accessToken ? (
        <div className=" relative flex h-screen w-screen items-center justify-center overflow-hidden before:absolute before:right-[-600px] before:top-[-600px] before:h-[1200px] before:w-[1200px] before:rounded-full before:bg-bgColor">
            <div className="relative flex h-[800px] w-[1200px] rounded-[20px] border-neutral-700 shadow-3xl before:absolute before:bottom-[-400px] before:left-[-400px] before:h-[800px] before:w-[800px] before:rounded-full before:border-[140px] before:border-secondary ">
                <div className="relative flex flex-1 flex-col items-center rounded-l-[20px] bg-secondary ">
                    <div className="mt-16 w-full px-16 pt-4">
                        <h1 className="text-[40px] font-semibold text-primary ">
                            Finding a<br /> dream room to rent?
                        </h1>
                        <h4 className="text-[21px] font-normal text-white">
                            Create your account and start exploration <br /> with us
                        </h4>
                    </div>
                    <img src={Logo} alt="" className="w-[510px]" />
                    <h3 className="m-8 text-[21px] font-normal text-white">Since 2023</h3>
                    <img src={Cloud} alt="" className="absolute -left-[1px] bottom-0 z-0 w-[480px] rounded-l-[20px]" />
                </div>
                <div className="relative flex-1 rounded-r-[20px] bg-white  pb-10">
                    <div className="flex h-full w-full flex-col items-center justify-center  ">
                        <img src={RentallyLogo} alt="" className="w-[60px]" />
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
