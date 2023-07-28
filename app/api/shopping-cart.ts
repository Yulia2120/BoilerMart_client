
import { createEffect } from "effector";
import api from '../axiosClient'
import { IAddToCartFx, IUpdateCartItemFx } from "@/types/shopping-cart";

//эндпойнт для получения данных в корзине
export const getCartItemsFx = createEffect(async (url: string) => {
    const {data} = await api.get(url)

    return data})

//эндпойнт для добавления данных в корзину
export const addToCartFx = createEffect(
    async ({url, username, partId}: IAddToCartFx) => {
    const {data} = await api.post(url, {username, partId})
    
    return data})

//эндпойнт для удаления данных из корзины    
export const removeFromCartFx = createEffect(
        async (url: string) => {
        await api.delete(url)
        
})

export const updateCartItemFx = createEffect(async ({url, payload}: IUpdateCartItemFx) => {
    const {data} = await api.patch(url, payload)
    return data
    
})