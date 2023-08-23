import { IGeolocation } from "@/types/common";
import { createEffect } from "effector-next";
import api from '../axiosClient'

export const getGeolocationFx = createEffect(async (params: IGeolocation) => {
    const data = await api.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${params.latitude}&lon=${params.longitude}&lang=ru&apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,
        {withCredentials: false}
    )
    return data
})