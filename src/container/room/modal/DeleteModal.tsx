import Title from "@/components/Modal/Title"
import useServerMessage from "@/hooks/useServerMessage"
import { IRoom } from "@/interfaces/room.interface"
import { useAppSelector } from "@/redux/hook"
import { useDeleteRoomMutation } from "@/redux/services/room/room.service"
import { Button, Spin } from "antd"

const DeleteModal = () => {
    const roomData = useAppSelector((state) => state.modal.data) as IRoom
    const role = useAppSelector((state) => state.auth.userInfo?.role) || ""
    const [deleteModRoom, { data, error, isLoading }] = useDeleteRoomMutation()

    useServerMessage({ data: data!, error: error })

    const handleClick = async () => {
        await deleteModRoom({ role, id: roomData?.id || "" })
    }

    return (
        <Spin spinning={isLoading} className="flex flex-col items-center">
            <Title>Remove Room </Title>
            <p className=" mb-6 text-center font-medium">
                Are you sure you want to delete the room <br />
                <span className=" font-bold">{roomData?.roomName}</span>?
            </p>
            <div className="flex w-full justify-end">
                <Button onClick={handleClick} loading={isLoading} className={`border-none bg-red-500 text-white`}>
                    Delete
                </Button>
            </div>
        </Spin>
    )
}

export default DeleteModal
