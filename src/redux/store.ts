import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { authApi } from "@/redux/services/auth/auth.service"
import { helpApi } from "./services/help/help.service"
import authSlice from "@/redux/features/auth/auth.slice"
import searchSlice from "@/redux/features/search/search.slice"
import searchMapSlice from "./features/search-map/search-map.slice"
import modalSlice from "./features/modal/modal.slice"

import contractSlice from "./features/contract/contract.slice"



import { categoriesApi } from "./services/categories/categories.service"
import { userApi } from "./services/users/user.service"
import { newsApi } from "./services/news/news.service"
const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [helpApi.reducerPath]: helpApi.reducer,

    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,

    auth: authSlice.reducer,
    search: searchSlice,
    searchMap: searchMapSlice,
    contract: contractSlice,
    modal: modalSlice,

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
        userApi.middleware,
        newsApi.middleware,

    )
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
