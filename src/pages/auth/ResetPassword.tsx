import { useState } from "react"
import { ButtonAuth, InputWithLabel } from "@/components"
import { Form, Formik } from "formik"
import mail from "@/assets/images/mailsvg.svg"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    useResetPasswordMutation,
    useForgotPasswordVerifyMutation,
    useResendEmailMutation
} from "@/redux/services/auth/auth.service"
import { motion } from "framer-motion"
import { Spin, message } from "antd"
import Account from "@/layouts/Account"

interface ResetPasswordValues {
    password: string
    confirmPassword: string
}
interface SendCodeValues {
    code: string
}

const ResetPassword = () => {
    const navigate = useNavigate()
    const { email } = useParams()
    const [isPermitted, SetIsPermitted] = useState<boolean>(false)
    const [resetPassword, { isLoading: isResetPasswordLoading }] = useResetPasswordMutation()
    const [forgotPasswordVerify, { isLoading: isForgotPasswordVerifyLoading }] = useForgotPasswordVerifyMutation()
    const [resendEmail, { isLoading: isResendEmailLoading }] = useResendEmailMutation()
    const [code, setCode] = useState<string>("")

    const initialValues: ResetPasswordValues = {
        password: "",
        confirmPassword: ""
    }
    const initialSendCodeValues: SendCodeValues = {
        code: ""
    }

    const resetPasswordValidate = (values: ResetPasswordValues) => {
        const errors: Partial<ResetPasswordValues> = {}
        if (!values.password) {
            errors.password = "Password is required"
        } else if (values.password.length < 6) {
            errors.password = "Password too short"
        }

        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }

        return errors
    }
    const sendCodeValidate = (values: SendCodeValues): Partial<SendCodeValues> => {
        const errors: Partial<SendCodeValues> = {}
        if (!values.code) {
            errors.code = "Code is required"
        }
        return errors
    }

    const submitResetPasswordForm = async (values: ResetPasswordValues) => {
        try {
            const res = await resetPassword({
                email: email || "",
                password: values.password,
                code: "R-" + code
            }).unwrap()
            if (res.status === "SUCCESS") {
                navigate("/login")
            }
        } catch (error: any) {
            console.log(error)
            message.error(error.data.message)
        }
    }
    const submitCodeForm = async (values: SendCodeValues) => {
        try {
            const res = await forgotPasswordVerify({
                email: email || "",
                code: "R-" + values.code
            }).unwrap()
            console.log(res)
            if (res.status === "SUCCESS") {
                SetIsPermitted(true)
                setCode(values.code)
            }
        } catch (error: any) {
            console.log(error)
            message.error(error.data.message)
        }
    }

    const handleResetPassword = async () => {
        const res = await resendEmail({ email: email || "" }).unwrap()
        console.log(res)
    }
    return (
        <Account>
            <Spin spinning={isForgotPasswordVerifyLoading || isResendEmailLoading || isResetPasswordLoading}>
                {!isPermitted ? (
                    <Formik initialValues={initialSendCodeValues} validate={sendCodeValidate} onSubmit={submitCodeForm}>
                        {(formik) => {
                            const { values, handleChange, handleSubmit } = formik

                            return (
                                <motion.div
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -30, opacity: 0 }}
                                >
                                    <div className="relative flex w-full flex-col items-center justify-center">
                                        <div className="m-8">
                                            <div className="mb-6 flex items-center justify-center gap-8">
                                                <img src={mail} alt="" />
                                                <h1 className="text-[24px] font-semibold text-secondary ">
                                                    Check your email!
                                                </h1>
                                            </div>
                                            <p className="mb-1 px-3 text-[14px] text-secondary">
                                                We sent a verification code to <br />
                                                <span className="text-[14px] text-primary">{email}</span>{" "}
                                            </p>

                                            <Form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                                                <InputWithLabel
                                                    placeholer="Code *"
                                                    type="text"
                                                    name="code"
                                                    value={values.code}
                                                    onChange={handleChange}
                                                />
                                                <ButtonAuth type="submit" text="Reset password" />
                                            </Form>
                                            <p className="px-3 pt-3 text-[14px] text-secondary">
                                                Didn't receive the email?
                                                <span
                                                    className="cursor-pointer text-[14px] text-primary hover:underline"
                                                    onClick={handleResetPassword}
                                                >
                                                    {" "}
                                                    Click to resend
                                                </span>{" "}
                                            </p>
                                        </div>
                                        <div className="absolute bottom-[-100px] left-0 flex w-full justify-center ">
                                            <p className="mb-1 text-[14px] text-secondary">
                                                Back to
                                                <Link to={"/login"} className="text-primary hover:underline">
                                                    {" "}
                                                    Login
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        }}
                    </Formik>
                ) : (
                    <Formik
                        initialValues={initialValues}
                        validate={resetPasswordValidate}
                        onSubmit={submitResetPasswordForm}
                    >
                        {(formik) => {
                            const { values, handleChange, handleSubmit } = formik

                            return (
                                <motion.div
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -30, opacity: 0 }}
                                    className="relative flex w-full flex-col items-center justify-center"
                                >
                                    <h1 className="text-[40px] font-semibold text-secondary ">Reset Password</h1>
                                    <div className="mt-3">
                                        <p className="my-4 text-[14px] text-secondary">
                                            In order to <span className="text-primary">protect your account</span>, make
                                            sure your
                                            <br />
                                            <span>password:</span>
                                            <li className="mx-4">Longer than 8 characters</li>
                                            <li className="mx-4">Does not match or contain your username</li>
                                        </p>
                                        <form className="flex flex-col gap-8 " onSubmit={handleSubmit}>
                                            <InputWithLabel
                                                placeholer="Password *"
                                                type="Password"
                                                name="password"
                                                id="password"
                                                value={values.password}
                                                onChange={handleChange}
                                            />
                                            <InputWithLabel
                                                placeholer="Confirm password *"
                                                type="Password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                            />
                                            <ButtonAuth text="Reset password" type="submit" />
                                        </form>
                                    </div>
                                    <div className="absolute bottom-[-100px] left-0 flex w-full justify-center ">
                                        <p className="mb-1 text-[14px] text-secondary">
                                            Back to
                                            <Link to={"/login"} className="text-primary hover:underline">
                                                {" "}
                                                Login
                                            </Link>
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        }}
                    </Formik>
                )}
            </Spin>
        </Account>
    )
}

export default ResetPassword
