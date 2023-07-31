import { IBoilerPart } from "@/types/boierparts";
import { createDomain } from "effector-next";

const boilerPart = createDomain()

export const setBoilerPart = boilerPart.createEvent<IBoilerPart>()

export const $boilerPart = boilerPart
    .createStore<IBoilerPart>({} as IBoilerPart)
    .on(setBoilerPart, (_, part) => part)