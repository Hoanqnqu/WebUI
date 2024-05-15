import { IRoom } from "@/interfaces/room.interface"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    rooms: [] as IRoom[],
    roomPattern: {} as IRoom,
    count: 0 as number,
    srcImage: "" as string
}

const generateRoomSlice = createSlice({
    name: "generateRoom",
    initialState,
    reducers: {
        generateRoom: (state, action: PayloadAction<{ roomPattern: IRoom; quantity: number }>) => {
            const rooms = []
            const { quantity, roomPattern } = action.payload
            state.roomPattern = roomPattern
            roomPattern.id = "0"
            roomPattern.roomName = "F0"
            for (let i = 0; i < quantity; i++) {
                state.count++
                const room = { ...roomPattern }
                // const id = i
                room.id = `${state.count}`
                room.roomName = `F${state.count}`
                rooms.push(room)
            }
            state.rooms = rooms
        },

        saveSrcImage: (state, action: PayloadAction<{ srcImage: string }>) => {
            state.srcImage = action.payload.srcImage
        },

        changeRoomName: (state, action: PayloadAction<{ id: string; roomName: string }>) => {
            const roomIndex = state.rooms.findIndex((room) => room.id === action.payload.id)
            if (roomIndex !== -1) {
                state.rooms[roomIndex].roomName = action.payload.roomName
            }
        },
        changeUtilitiesRoom: (state, action: PayloadAction<{ id: string; utilities: string[] }>) => {
            const roomIndex = state.rooms.findIndex((room) => room.id === action.payload.id)
            if (roomIndex !== -1) {
                state.rooms[roomIndex].utilities = action.payload.utilities
            }
        },
        changeImagesRoom: (state, action: PayloadAction<{ index: number; images: string[] }>) => {
            state.rooms[action.payload.index].images = action.payload.images
        },
        deleteRoom: (state, action: PayloadAction<{ id: string }>) => {
            const roomIndex = state.rooms.findIndex((room) => room.id === action.payload.id)

            if (roomIndex !== -1) {
                state.rooms.splice(roomIndex, 1)
            }
        },
        addRoom: (state) => {
            const newRoom = { ...state.roomPattern }
            state.count++
            newRoom.id = `${state.count}`
            newRoom.roomName = `F${state.count}`
            state.rooms.push(newRoom)
        },
        saveRoom: (state) => {
            state.rooms = []
            state.roomPattern = {
                area: 0,
                roomName: "",
                price: 0,
                depositAmount: 0
            }
            state.count = 0
            state.srcImage = ""
        }
    }
})

export const {
    generateRoom,
    changeRoomName,
    changeImagesRoom,
    saveRoom,
    addRoom,
    deleteRoom,
    changeUtilitiesRoom,
    saveSrcImage
} = generateRoomSlice.actions

export default generateRoomSlice.reducer
