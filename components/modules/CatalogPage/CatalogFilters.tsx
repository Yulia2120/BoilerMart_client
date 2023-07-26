import { useMediaQuery } from "@/hooks/useMediaQuery"
import CatalogFiltersDesktop from "./CatalogFiltersDesktop"
import { ICatalogFiltersProps } from "@/types/catalog"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useStore } from "effector-react"
import { $boilerManufacturers, $partsManufacturers, setBoilerManufacturersFromQuery, setFilteredBoilerParts, setPartsManufacturersFromQuery } from "@/context/boilerParts"
import { useRouter } from "next/router"
import { getBoilerPartsFx } from "@/app/api/boilerParts"
import { getQueryParamOnFirstRender } from "@/utils/common"


const CatalogFilters = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
    resetFilterBtnDisabled,
    resetFilters,
    isPriceRangeChanged,
    currentPage,
    setIsFilterInQuery
}: ICatalogFiltersProps) => {
    const isMobile = useMediaQuery(820)
    const [spinner, setSpinner] = useState(false)
    const boilerManufacturers = useStore($boilerManufacturers)
    const partsManufacturers = useStore($partsManufacturers)
    const router = useRouter()

    useEffect(() => {
         applyFiltersFromQuery()
      }, [])

    const applyFiltersFromQuery = async () => {
        try{
            const priceFromQueryValue = getQueryParamOnFirstRender('priceFrom', router)
            const priceToQueryValue = getQueryParamOnFirstRender('priceTo', router)
            const boilerQueryValue = JSON.parse(decodeURIComponent(
                getQueryParamOnFirstRender('boiler', router) as string
            ))
            const partsQueryValue = JSON.parse(decodeURIComponent(
                getQueryParamOnFirstRender('parts', router) as string
            ))
            // проверка на массив query параметров строки(чтобы пользователь не вставил что-то не то или не удалил часть строки)
            const isValidBoilerQuery = Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
            const isValidPartsQuery = Array.isArray(partsQueryValue) && !!partsQueryValue?.length

            const boilerQuery = `&boiler=${getQueryParamOnFirstRender('boiler', router)}`
            const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`
            const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

            //проверки на обновление параметров строки
            if(isValidBoilerQuery && isValidPartsQuery && priceFromQueryValue && priceToQueryValue){
           
                updateParamsAndFiltersFromQuery(() => {
                    updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
                    setBoilerManufacturersFromQuery(boilerQueryValue)
                    setPartsManufacturersFromQuery(partsQueryValue)
                }, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`)
                return
            }

            if(priceFromQueryValue && priceToQueryValue){
                updateParamsAndFiltersFromQuery(() => {
                updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
                }, `${currentPage}${priceQuery}`)
            }

            if(isValidBoilerQuery && isValidPartsQuery){
                updateParamsAndFiltersFromQuery(() => {
                    setIsFilterInQuery(true)
                    setBoilerManufacturersFromQuery(boilerQueryValue)
                    setPartsManufacturersFromQuery(partsQueryValue)
                }, `${currentPage}${boilerQuery}${partsQuery}`)
                return
            }

            if(isValidBoilerQuery){
                updateParamsAndFiltersFromQuery(() => {
                    setIsFilterInQuery(true)
                    setBoilerManufacturersFromQuery(boilerQueryValue)
                }, `${currentPage}${boilerQuery}`)
               
            }

            if(isValidPartsQuery){
                updateParamsAndFiltersFromQuery(() => {
                    setIsFilterInQuery(true)
                    setPartsManufacturersFromQuery(partsQueryValue)
                }, `${currentPage}${partsQuery}`)
               
            }

            if(isValidBoilerQuery && priceFromQueryValue && priceToQueryValue){
                updateParamsAndFiltersFromQuery(() => {
                updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
                setBoilerManufacturersFromQuery(boilerQueryValue)
                }, `${currentPage}${priceQuery}${boilerQuery}`)
            }

            if(isValidPartsQuery && priceFromQueryValue && priceToQueryValue){
                updateParamsAndFiltersFromQuery(() => {
                updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
                setPartsManufacturersFromQuery(partsQueryValue)
                }, `${currentPage}${priceQuery}${partsQuery}`)
            }

        }catch(error){
            toast.error((error as Error).message)
        }
    }

    const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
        setIsFilterInQuery(true)
        setPriceRange([+priceFrom, +priceTo])
        setIsPriceRangeChanged(true)
    }

    const updateParamsAndFiltersFromQuery = async (callback: VoidFunction, path: string) => {
        callback()
        const data = await getBoilerPartsFx
        (`/boiler-parts?limit=20&offset=${path}`)
        setFilteredBoilerParts(data)

    }

    async function updateParamsAndFilters<T>(updatedParams: T, path: string){

        const params = router.query
        //удаляем старые параметры поисковой строки
              delete params.boiler
              delete params.parts
              delete params.priceFrom
              delete params.priceTo
              params.first = 'cheap'
        router.push(
            {
                query:{
                    ...params,
                    ...updatedParams
                   
                }
         
        }, undefined, {shallow: true})
        const data = await getBoilerPartsFx
        (`/boiler-parts?limit=20&offset=${path}`)
        setFilteredBoilerParts(data)


    }

    const applyFilters = async () => {
        setIsFilterInQuery(true)
        try{
            setSpinner(true)
            const priceFrom = Math.ceil(priceRange[0])
            const priceTo = Math.ceil(priceRange[1])
            const priceQuery = isPriceRangeChanged ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''

            const boilers = boilerManufacturers
            .filter((item) => item.checked)
            .map((item) => item.title)

            const parts = partsManufacturers
            .filter((item) => item.checked)
            .map((item) => item.title)

            const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers))
            const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))
            const boilerQuery = `&boiler=${encodedBoilerQuery}`
            const partsQuery = `&parts=${encodedPartsQuery}`
            const initialPage = currentPage > 0 ? 0 : currentPage

            //проверка на фильтрацию производителей котлов, производителей деталей и диапазон цены
            if(boilers.length && parts.length && isPriceRangeChanged)
            {
                updateParamsAndFilters({
                    boiler: encodedBoilerQuery,
                    parts: encodedPartsQuery,
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1

                }, `${initialPage}${priceQuery}${boilerQuery}${partsQuery}`)

                return
            }
            //проверка на фильтрацию диапазона цены
            if(isPriceRangeChanged){
                updateParamsAndFilters({
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1

                }, `${initialPage}${priceQuery}`)

            }

            //проверка на фильтрацию производителей котлов и производителей запчастей
            if(boilers.length && parts.length){
                updateParamsAndFilters({
                    boiler: encodedBoilerQuery,
                    parts: encodedPartsQuery,
                    offset: initialPage + 1

                }, `${initialPage}${boilerQuery}${partsQuery}`)
           
                return
            }

            //проверка на фильтрацию производителей котлов 
            if(boilers.length){
                updateParamsAndFilters({
                    boiler: encodedBoilerQuery,
                    offset: initialPage + 1

                }, `${initialPage}${boilerQuery}`)
            
            }

            //проверка на фильтрацию производителей запчастей
            if(parts.length){
                updateParamsAndFilters({
                    parts: encodedPartsQuery,
                    offset: initialPage + 1

                }, `${initialPage}${partsQuery}`)
           
            }

            //проверка на фильтрацию производителей котлов и диапазон цены
            if(boilers.length && isPriceRangeChanged){
                updateParamsAndFilters({
                    boiler: encodedBoilerQuery,
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1

                }, `${initialPage}${priceQuery}${boilerQuery}`)
            
            }

               //проверка на фильтрацию производителей запчастей и диапазон цены
               if(parts.length && isPriceRangeChanged){
                updateParamsAndFilters({
            
                    parts: encodedPartsQuery,
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1

                }, `${initialPage}${priceQuery}${partsQuery}`)
            
            }
          

        }catch(error){
            toast.error((error as Error).message)
        }finally{
            setSpinner(false)
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
                applyFilters={applyFilters} 
    
                />
    }
        </>
    )
}

export default CatalogFilters