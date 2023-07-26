import { $mode } from "@/context/mode"
import { useStore } from "effector-react"
import styles from '@/styles/catalog/index.module.scss'
import { ICatalogFilterMobileProps } from "@/types/catalog"

const CatalogFiltersMobile = ({

}: ICatalogFilterMobileProps) => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return(
        <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>

        </div>
    )
}

export default CatalogFiltersMobile