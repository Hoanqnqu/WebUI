interface Props {
    text: string
    disabled?: boolean
    type?: "button" | "submit" | "reset" | undefined
    onClick?: () => void
}

const ButtonAuth = ({ text, type, disabled, onClick }: Props) => {
    return (
        <button
            disabled={disabled}
            type={type}
            className="mt-4 w-[360px] rounded-[6px] bg-primary p-2 text-[20px] text-white hover:bg-orange-500"
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default ButtonAuth
