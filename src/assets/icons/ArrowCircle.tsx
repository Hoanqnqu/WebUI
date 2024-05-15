interface IArrowCircleProps {
    isExpanding: boolean
    onClick: () => void
}

const ArrowCircle = ({ isExpanding, onClick }: IArrowCircleProps) => {
    if (isExpanding)
        return (
            <svg
                onClick={onClick}
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
                preserveAspectRatio="none"
                className="absolute -right-4 top-14 h-8 w-8 cursor-pointer rounded-full bg-white text-gray-500 transition duration-200 hover:text-primary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
        )

    return (
        <svg
            onClick={onClick}
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
            preserveAspectRatio="none"
            className="absolute -right-4 top-14 h-8 w-8 cursor-pointer rounded-full bg-white text-gray-500 duration-200 hover:text-primary"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
        </svg>
    )
}
export default ArrowCircle
