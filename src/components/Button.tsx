interface IButton {
    isDisabled?: boolean
    children?: React.ReactNode
    onClick?: any
    className?: string
}

const Button = (props: IButton) => {
    const defaultClassName =
        "flex cursor-pointer justify-center items-center gap-1 font-medium text-black transition duration-200"

    return (
        <button
            className={`${defaultClassName} ${props.className} ${
                props.isDisabled && "pointer-events-none opacity-50"
            } `}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default Button
