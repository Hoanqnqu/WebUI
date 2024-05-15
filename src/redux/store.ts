import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { authApi } from "@/redux/services/auth/auth.service"
import { helpApi } from "./services/help/help.service"
import authSlice from "@/redux/features/auth/auth.slice"
import searchSlice from "@/redux/features/search/search.slice"
import searchMapSlice from "./features/search-map/search-map.slice"
import modalSlice from "./features/modal/modal.slice"
import generateRoomSlice from "./features/generateRoom/generateRoom.slice"
import contractSlice from "./features/contract/contract.slice"



import { categoriesApi } from "./services/categories/categories.service"

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [helpApi.reducerPath]: helpApi.reducer,

    [categoriesApi.reducerPath]: categoriesApi.reducer,


    auth: authSlice.reducer,
    search: searchSlice,
    searchMap: searchMapSlice,
    contract: contractSlice,
    modal: modalSlice,
    generateRoom: generateRoomSlice
})

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware.concat(
        authApi.middleware,
        helpApi.middleware,
        categoriesApi.middleware,


    )
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
