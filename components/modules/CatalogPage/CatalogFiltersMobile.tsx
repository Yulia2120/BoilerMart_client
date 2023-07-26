import { $mode } from "@/context/mode"
import { useStore } from "effector-react"
import styles from '@/styles/catalog/index.module.scss'
import { ICatalogFilterMobileProps } from "@/types/catalog"
import spinnerStyles from '@/styles/spinner/index.module.scss'
import FiltersPopupTop from "./FiltersPopupTop"

const CatalogFiltersMobile = ({spinner, resetFilterBtnDisabled, resetFilters, closePopup}: ICatalogFilterMobileProps) => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const applyFiltersAndClosePopup = () => {

    }

    return(
        <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
            <div className={styles.catalog__bottom__filters__inner}>
                <FiltersPopupTop
                resetBtnText="Сбросить все"
                title="Фильтры"
                resetFilters={resetFilters}
                resetFilterBtnDisabled={resetFilterBtnDisabled}
                closePopup={closePopup}
                />
            </div>
            <div className={styles.filters__actions}>
                <button 
                    className={styles.filters__actions__show} 
                    onClick={applyFiltersAndClosePopup}
                    disabled={resetFilterBtnDisabled}
                    >
                    {spinner ? <span className={spinnerStyles.spinner} 
                    style={{top: 6, left: "47%"}}/> : 'Показать'}
                    </button>
            </div>
        </div>
    )
}

export default CatalogFiltersMobile