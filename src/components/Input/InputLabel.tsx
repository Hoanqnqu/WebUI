import { ChangeEvent } from "react"
import { ErrorMessage } from "formik"
interface Props {
    placeholer: string
    type: string
    name?: string
    id?: string
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputWithLabel = ({ placeholer, type, name, id, value, onChange }: Props) => {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholer}
                value={value}
                id={id}
                name={name}
                onChange={onChange}
                autoComplete="off"
                className="w-[360px] rounded-lg border-2 border-neutral-300 bg-white p-3 placeholder:text-[18px] placeholder:font-normal placeholder:text-secondaryBlack/80 focus:border-primary focus:bg-white focus:outline-none focus:ring-0"
            />
            <ErrorMessage component="div" name={name || ""} className="absolute text-[12px] text-red-700" />
        </div>
    )
}

export default InputWithLabel
