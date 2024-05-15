import { useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface HeartButtonProps {
    isInCheckList: boolean
}

const HeartButton: React.FC<HeartButtonProps> = ({ isInCheckList }) => {
    const [hasFavorited, setHasFavorited] = useState(isInCheckList)

    return (
        <div
            onClick={() => setHasFavorited((state: any) => !state)}
            className="
        relative
        cursor-pointer
        transition
        hover:opacity-80
      "
        >
            <AiOutlineHeart
                size={28}
                className="
          absolute
          -right-[2px]
          -top-[2px]
          fill-white
        "
            />
            <AiFillHeart size={24} className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"} />
        </div>
    )
}

export default HeartButton
