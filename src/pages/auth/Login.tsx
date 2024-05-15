import { Link } from "react-router-dom"
import { ButtonAuth, InputWithLabel } from "@/components"
import { useNavigate } from "react-router-dom"
import { Formik } from "formik"
import { useLoginMutation, useContinueWithGGMutation } from "@/redux/services/auth/auth.service"
import { message, Spin } from "antd"

import { setCredentials } from "@/redux/features/auth/auth.slice"
import { useAppDispatch } from "@/redux/hook"
import { useGoogleLogin } from "@react-oauth/google"
import logoGG from "@/assets/images/logoGG.svg"
import { motion } from "framer-motion"
import { IAccountLogin } from "@/interfaces/auth.interface"
import Account from "@/layouts/Account"
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [login, { isLoading: isLoginLoading }] = useLoginMutation()
    const [continueWithGG, { isLoading: isContinueWithGGLoading }] = useContinueWithGGMutation()
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
            if (res.status === "SUCCESS" && res.data) {
                dispatch(setCredentials({ accessToken: res.data.token }))
                navigate(-1)
            }
        } catch (error: any) {
            message.error(error.data.message)
        }
    }

    const loginWithGG = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse.access_token || "")
            const res = await continueWithGG({ accessToken: tokenResponse.access_token || "" }).unwrap()
            if (res.status === "SUCCESS" && res.data) {
                dispatch(setCredentials({ accessToken: res.data.token }))
                navigate("/")
            }
        },
        onError: () => {
            console.log("Login Failed")
        }
    })

    return (
        <Account>
            <Spin spinning={isLoginLoading || isContinueWithGGLoading}>
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
                                    <p className="mb-1 text-[14px] text-secondary">
                                        Not a member?
                                        <Link to={"/register"} className="font-medium text-primary hover:underline">
                                            {" "}
                                            Create account
                                        </Link>
                                    </p>
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
                                        <Link
                                            to="/forgot-password"
                                            className="text-[14px] text-secondary hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                        <button
                                            className="flex items-center justify-center gap-2 rounded-[6px] border-2 border-neutral-300 p-1 text-[14px] hover:border-neutral-500 hover:bg-slate-200"
                                            onClick={() => loginWithGG()}
                                        >
                                            Countinue with <img src={logoGG} alt="logoGG" />
                                        </button>
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
