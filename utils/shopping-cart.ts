import { addToCartFx, removeFromCartFx } from "@/app/api/shopping-cart"
import { removeShoppingCartItem, updateShoppingCart } from "@/context/shopping-cart"
import { toast } from "react-toastify"

export const toggleCartItem = async (
    username: string, 
    partId: number, 
    isInCart: boolean
    ) => {
        try{

            if(isInCart){
                await removeFromCartFx(`/shopping-cart/one/${partId}`)
                removeShoppingCartItem(partId)
                return
            }
            const data = await addToCartFx({
                url: '/shopping-cart/add',
                username,
                partId
            })

            updateShoppingCart(data)
        }catch(error){
            toast.error((error as Error).message)

        }finally{
            
        }
}


export const removeItemFromCart = async (partId: number) => {
    try {
      await removeFromCartFx(`/shopping-cart/one/${partId}`)
      removeShoppingCartItem(partId)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
  
 
  