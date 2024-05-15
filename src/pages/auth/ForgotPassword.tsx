import { ButtonAuth, InputWithLabel } from "@/components"
import { Link, useNavigate } from "react-router-dom"
import { useForgotPasswordMutation } from "@/redux/services/auth/auth.service"
import { motion } from "framer-motion"
import { Form, Formik } from "formik"
import { Spin, message } from "antd"
import { IEmail } from "@/interfaces/auth.interface"
import Account from "@/layouts/Account"

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

    const initialValues: IEmail = {
        email: ""
    }

    const validate = (values: IEmail): Partial<IEmail> => {
        const errors: Partial<IEmail> = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        if (!values.email) {
            errors.email = "Email is required"
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid Email"
        }
        return errors
    }

    const submitForm = async (values: IEmail) => {
        try {
            const res = await forgotPassword({ email: values.email }).unwrap()

            if (res.status === "SUCCESS") {
                navigate(`/reset-password/${values.email}`)
            }
        } catch (error: any) {
            console.log(error)
            message.error(error.data.message)
        }
    }

    return (
        <Account>
            <Spin spinning={isLoading}>
                <Formik initialValues={initialValues} validate={validate} onSubmit={submitForm}>
                    {(formik) => {
                        const { values, handleChange, handleSubmit } = formik
                        return (
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -30, opacity: 0 }}
                                className="relative flex w-full flex-col items-center justify-center"
                            >
                                <div className="m-8">
                                    <h1 className="text-[24px] font-semibold text-secondary ">Forgot Password?</h1>
                                    <p className="mb-1 text-[14px] text-secondary">
                                        No worries, we'll send you reset password instruction
                                    </p>
                                    <Form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                                        <InputWithLabel
                                            placeholer="Email *"
                                            type="text"
                                            name="email"
                                            id="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        <ButtonAuth text="Reset password" type="submit" />
                                    </Form>
                                </div>
                                <div className="absolute bottom-[-160px] left-0 flex w-full justify-center ">
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
            </Spin>
        </Account>
    )
}

export default ForgotPassword
