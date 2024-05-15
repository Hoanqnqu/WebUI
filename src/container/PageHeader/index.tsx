import { useNavigate } from "react-router-dom"
import UserMenu from "../UserMenu"
import { styleOrEmpty } from "@/utils/helpers"

interface IPageHeader {
    title: string
    subTitle?: string
}

const PageHeader = (props: IPageHeader) => {
    const navigate = useNavigate()

    const isSubTitlePresent = !!props.subTitle

    return (
        <div className="mb-3 flex w-full items-center justify-between">
            <div className="flex items-end gap-2">
                <h1
                    onClick={() => isSubTitlePresent && navigate(-1)}
                    className={`cursor-pointer text-2xl font-medium text-secondary 
                    ${styleOrEmpty(isSubTitlePresent, "cursor-pointer")}`}
                >
                    {props.title}
                </h1>
                {props.subTitle && (
                    <>
                        <span>•</span> <p className="font-medium text-secondary">{props.subTitle}</p>
                    </>
                )}
            </div>
            <UserMenu />
        </div>
    )
}

export default PageHeader
