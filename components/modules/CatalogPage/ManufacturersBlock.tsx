import { $mode } from "@/context/mode"
import { useStore } from "effector-react"
import styles from '@/styles/catalog/index.module.scss'
import { AnimatePresence, motion } from "framer-motion"
import { IManufacturersBlockProps } from "@/types/catalog"
import ManufacturersBockItem from "./ManufacturersBlockItem"


const ManufacturersBock = ({title, manufacturersList, event}: IManufacturersBlockProps) => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const checkedItems = manufacturersList.filter((item) => item.checked)

    return(
        <motion.div
        initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className={`${styles.manufacturers} ${darkModeClass}`}
        >
            <h3 className={`${styles.manufacturers__title} ${darkModeClass}`}>
                {title}
                </h3>
            <ul className={styles.manufacturers__list}>
                <AnimatePresence >
                {checkedItems.map((item) => (
                    <ManufacturersBockItem key={item.id} item={item} event={event}/>
                    
                    ))}
                    </AnimatePresence>
            </ul>

        </motion.div>
    )
}

export default ManufacturersBock