import { useMediaQuery } from "@/hooks/useMediaQuery"
import CatalogFiltersDesktop from "./CatalogFiltersDesktop"
import { ICatalogFiltersProps } from "@/types/catalog"
import { useState } from "react"


const CatalogFilters = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
    resetFilterBtnDisabled,
    resetFilters,
    isPriceRangeChanged
}: ICatalogFiltersProps) => {
    const isMobile = useMediaQuery(820)
    const [spinner, setSpinner] = useState(false)

    const applyFilters = async () => {
        try{
            setSpinner(true)
            const priceFrom = Math.ceil(priceRange[0])
            const priceTo = Math.ceil(priceRange[1])
            const priceQuery = isPriceRangeChanged ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''

        }catch(error){

        }
    }

    return(
        <>
        {isMobile ? <div/> : <CatalogFiltersDesktop
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            setIsPriceRangeChanged={setIsPriceRangeChanged}
            resetFilterBtnDisabled={resetFilterBtnDisabled}
            spinner={spinner}
            resetFilters={resetFilters}
            isPriceRangeChanged={isPriceRangeChanged}
        />}
        </>
    )
}

export default CatalogFilters