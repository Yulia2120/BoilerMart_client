import { Event } from "effector-next"

export interface IManufacturersBlockProps {
    title: string
    event: Event<IFilterCheckboxItem>
    manufacturersList: IFilterCheckboxItem[]
}

export interface IManufacturersBlockItemProps {
    item: IFilterCheckboxItem
    event: Event<IFilterCheckboxItem>
}

export interface IQueryParams {
    offset: string
    first: string
    boiler: string
    parts: string
    priceFrom: string
    priceTo: string
    partId: string
}

export interface IFilterCheckboxItem {
    title: string
    checked: boolean
    id?: string
    event: Event<IFilterCheckboxItem>
}

export interface IFilterManufacturerAccordionProps {
    manufacturersList: IFilterCheckboxItem[]
    title: string | false
    setManufacturer: Event<IFilterCheckboxItem[]>
    updateManufacturer: Event<IFilterCheckboxItem>
}

export interface ICatalogFiltersProps {
    priceRange: number[]
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
    resetFilterBtnDisabled: boolean
    resetFilters: VoidFunction
    isPriceRangeChanged: boolean
    currentPage: number
    setIsFilterInQuery:(arg0: boolean) => void
}

export interface IPriceRangeProps {
    priceRange: number[]
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
}

export interface ICatalogFilterDesktopProps extends ICatalogFiltersProps{
    spinner: boolean
    applyFilters: VoidFunction
    
}

