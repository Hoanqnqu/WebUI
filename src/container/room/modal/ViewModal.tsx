import Title from "@/components/Modal/Title"
import "./style.css"
import { Carousel, Descriptions, Image } from "antd"
import { IRoom } from "@/interfaces/room.interface"
import { useAppSelector } from "@/redux/hook"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"

const ViewModal = () => {
    const roomData = (useAppSelector((state) => state.modal.data) as IRoom) || []

    const { data } = useGetUtilitiesQuery()

    const { id, area, depositAmount, price, roomName, utilities, images } = roomData
    return (
        <div className="flex w-full flex-col items-center">
            <Title>Room Overview</Title>
            <Carousel autoplay dotPosition={"top"} effect="fade">
                {images?.map((image, index) => {
                    return <Image key={index} height={200} width={400} src={image as string} />
                })}
            </Carousel>
            <Descriptions column={1} className="mt-2">
                <Descriptions.Item className="text-red-500" label="ID">
                    {id}
                </Descriptions.Item>
                <Descriptions.Item label="Room Name">{roomName}</Descriptions.Item>
                <Descriptions.Item label="Area">{area}</Descriptions.Item>
                <Descriptions.Item label="Price">{price}</Descriptions.Item>
                <Descriptions.Item label="Deposit Amount">{depositAmount}</Descriptions.Item>
                <Descriptions.Item label="Utilities">
                    <div>
                        {utilities
                            ?.map((value: string) => data?.find((utility) => String(utility.id) == value)?.name)
                            .join(", ")}
                    </div>
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default ViewModal
