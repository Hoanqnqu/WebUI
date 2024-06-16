import { SITE_MAP } from "@/utils/constants/Path"

import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Loading from "@/container/Loading"
import {RequireAuthAdmin} from "@/layouts/requiredAuth"
const AdminPage = lazy(() => import("../pages/admin"))



const CategoriesPage = lazy(() => import("../pages/admin/categories"))
const UserPage = lazy(() => import("../pages/admin/users"))
const NewsPage = lazy(() => import("../pages/admin/news"))
const LoginPage = lazy(() => import("../pages/auth/Login"))

    
const MainRoute = () => {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <Routes>
                <Route element={<RequireAuthAdmin />}>
                    <Route index element={<Navigate to={SITE_MAP.ADMIN} replace  />}/>
                    <Route path={SITE_MAP.ADMIN} element={<AdminPage />}>
                        <Route index element={<Navigate to={SITE_MAP.CATEGORIES} replace />} />
                        <Route path={SITE_MAP.CATEGORIES} element={<CategoriesPage />} />
                        <Route path={SITE_MAP.USERS} element={<UserPage />} />
                        <Route path={SITE_MAP.NEWS} element={<NewsPage />} />
                        </Route>     
                    </Route>
                    <Route path={SITE_MAP.AUTH.LOGIN} element={<LoginPage />} />
                    <Route path="*" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default MainRoute
