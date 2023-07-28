import { $mode } from "@/context/mode";
import { ICartItemCounterProps } from "@/types/shopping-cart";
import { useStore } from "effector-react";
import MinusSvg from "../MinusSvg/MinusSvg";
import PlusSvg from "../PlusSvg/PlusSvg";
import { useState } from "react";
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/cartPopup/index.module.scss'

const CartItemCounter = ({
    totalCount,
    partId,
    increasePrice,
    decreasePrice,
    initialCount
}: ICartItemCounterProps) => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const spinnerDarkModeClass = mode === 'dark' ? `${spinnerStyles.dark_mode}` : ''
    const [spinner, setSpinner] = useState(false)
    const [count, setCount] = useState(initialCount)
    const [disableIncrease, setDisableIncrease] = useState(false)
    const [disableDecrease, setDisableDecrease] = useState(false)

    return(
        <div>
            <button disabled={disableDecrease}>
                <MinusSvg/>
            </button>
            <span className={spinnerStyles.spinner}
            style={{top: 4, left: 33, width: 20, height: 20}}
            >
                {spinner ? <span/> : count}
            </span>
            <button disabled={disableIncrease}>
                <PlusSvg/>
            </button>
        </div>
    )
    
}