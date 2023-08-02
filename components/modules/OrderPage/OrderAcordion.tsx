import { $mode } from "@/context/mode";
import { IOrderAccordionProps } from "@/types/order";
import { useStore } from "effector-react";
import { motion } from "framer-motion";
import styles from '@/styles/order/index.module.scss'
import DoneSvg from "@/components/elements/DoneSvg/DoneSvg";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import EditSvg from "@/components/elements/EditSvg/EditSvg";
import { is } from "effector";
import { useState } from "react";

const OrderAccordion = (
    {setOrderIsReady, showDoneIcon}: IOrderAccordionProps) => {
        const mode = useStore($mode)
        const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
        const isMedia550 = useMediaQuery(550)
        const [expanded, setExpanded] = useState(false)

        const toggleAccordion = () => setExpanded(!expanded)
           
        

        return (
            <>
            <motion.div
        initial={false}
        className={`${styles.order__cart__title} ${darkModeClass}`}
      >
        <h3 className={`${styles.order__cart__title__text} ${darkModeClass}`}>
            {showDoneIcon && (
                <span>
                    <DoneSvg/>
                </span>
            )}
            Корзина
            </h3>
            <button className={styles.order__cart__title__btn} onClick={toggleAccordion}>
                <span>
                    <EditSvg/>
                </span>
                {isMedia550 ? '' : 'Редактировать'}
            </button>
        </motion.div>
            </>
        )

    }

    export default OrderAccordion