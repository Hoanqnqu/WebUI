import { Spin } from "antd"

const Loading = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-transparent">
            <Spin spinning={true} />
        </div>
    )
}

export default Loading
