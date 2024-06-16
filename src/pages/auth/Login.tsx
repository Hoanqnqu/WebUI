
import { ButtonAuth, InputWithLabel } from "@/components"
import { useNavigate } from "react-router-dom"
import { Formik } from "formik"
import { useLoginMutation } from "@/redux/services/auth/auth.service"
import { message, Spin } from "antd"

import { setCredentials } from "@/redux/features/auth/auth.slice"
import { useAppDispatch } from "@/redux/hook"

import { motion } from "framer-motion"
import { IAccountLogin } from "@/interfaces/auth.interface"
import Account from "@/layouts/Account"
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [login, { isLoading: isLoginLoading }] = useLoginMutation()
    
    const initialValues: IAccountLogin = {
        email: "",
        password: ""
    }
    const validate = (values: IAccountLogin): Partial<IAccountLogin> => {
        const errors: Partial<IAccountLogin> = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        if (!values.email) {
            errors.email = "Email is required"
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid Email"
        }
        if (!values.password) {
            errors.password = "Password is required"
        }
        return errors
    }

    const submitForm = async (values: IAccountLogin) => {
        try {
            const res = await login(values).unwrap()
            console.log(res)
            if (res.status === 200) {
                dispatch(setCredentials({ accessToken: res.token }))
                navigate("/admin/")
            }
        } catch (error: any) {
            message.error(error.data.message)
        }
    }


    return (
        <Account>
            <Spin spinning={isLoginLoading }>
                <Formik initialValues={initialValues} validate={validate} onSubmit={submitForm}>
                    {(formik) => {
                        const { values, handleChange, handleSubmit } = formik
                        return (
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -30, opacity: 0 }}
                                className="flex w-full flex-col items-center justify-center"
                            >
                                <h1 className="my-2 text-4xl font-semibold text-secondary ">Login to your account</h1>
                                <div className="mt-3">
                                   
                                    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                                        <InputWithLabel
                                            placeholer="Email *"
                                            type="text"
                                            name="email"
                                            id="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        <InputWithLabel
                                            placeholer="Password *"
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        <ButtonAuth text="Login" type="submit" />
                                    </form>
                                    <div className="mt-4 flex items-center justify-between">
                                       

                                    </div>
                                </div>
                            </motion.div>
                        )
                    }}
                </Formik>
            </Spin>
        </Account>
    )
}

export default Login
