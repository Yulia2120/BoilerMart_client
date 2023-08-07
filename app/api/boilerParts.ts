import { createEffect } from "effector-next";
import api from '../axiosClient'
import { toast } from "react-toastify";

export const getBestsellersOrNewPartsFx = createEffect(async (url: string) => {
    const {data} = await api.get(url)

    return data

})

export const getBoilerPartsFx = createEffect(async (url: string) => {
    const {data} = await api.get(url)

    return data

})

export const getBoilerPartFx = createEffect(async (url: string) => {
    const {data} = await api.get(url)

    return data

})
//поиск по букве и возврат массива с найденными эл-тами
export const searchPartsFx = createEffect(
    async({url, search}: {url: string; search: string}) => {
        const {data} = await api.post(url, {search})

        return data.rows
    }
)
//поиск по названию товара
export const getPartByNameFx = createEffect(
    async ({url, name}: {url: string; name: string}) => {
        try {
            const {data} = await api.post(url, {name})

            return data

        } catch (error) {
            toast.error((error as Error).message)
        }
    }
)