import { $mode } from "@/context/mode"
import { IWrappedComponentProps } from "@/types/common"
import { useStore } from "effector-react"
import { forwardRef } from "react"
import ShoppingCartSvg from "@/components/elements/ShoppingCartSvg/ShoppingCartSvg"
import { withClickOutside } from "@/utils/withClickOutside"
import { AnimatePresence, motion } from "framer-motion"
import { $shoppingCart } from "@/context/shopping-cart"
import Link from "next/link"
import styles from '@/styles/cartPopup/index.module.scss'
import { spawn } from "child_process"

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
    ({open, setOpen}, ref) => {
     const mode = useStore($mode)
     const shoppingCart = useStore($shoppingCart)
     const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
 
     const toggleCartDropDown = () => setOpen(!open)
 
     return(
         <div className={styles.cart} ref={ref}>
           <button className={`${styles.cart__btn} ${darkModeClass}`} onClick={toggleCartDropDown}>
            {!!shoppingCart.length &&
            <span className={styles.cart__btn__count}>{shoppingCart.length}</span>}
            <span className={styles.cart__svg}><ShoppingCartSvg/></span>
            <span className={styles.cart__text}>Cart</span>
           </button>
           <AnimatePresence>
           {open && (
                          <motion.ul
                          initial={{opacity: 0, scale: 0}}
                          animate={{ opacity: 1, scale: 1}}
                          exit={{opacity: 0, scale: 0 }}
                          className={`${styles.cart__popup} ${darkModeClass}`}
                          style={{transformOrigin: 'right top'}}
                          >
                            <h3 className={styles.cart__popup__title}>
                                Cart
                            </h3>
                                <ul className={styles.cart__popup__list}>
                                {shoppingCart.length ? shoppingCart.map((item) => <li key={item.id}></li>) 
                                : (<li className={styles.cart__popup__empty}>
                                    <span className={`${styles.cart__popup__empty__text} ${darkModeClass}`}>
                                        Cart empty
                                    </span>
                                    </li>)}
                                </ul>
                                <div className={styles.cart__popup__footer}>
                                    <div className={styles.cart__popup__footer__total}>
                                        <span className={`${styles.cart__popup__footer__text} ${darkModeClass}`}>Общая сумма заказа:</span>
                                        <span className={styles.cart__popup__footer__price}>0</span>
                                    </div>
                                    <Link href='/order' passHref legacyBehavior>
                                        <button className={styles.cart__popup__footer__btn}
                                        disabled={!shoppingCart.length}>
                                            Оформить заказ
                                        </button>
                                    </Link>
                                </div>
                          </motion.ul>
                )}
           </AnimatePresence>
         </div> 
     )
    }
 )
 
 CartPopup.displayName = 'CartPopup'
 export default withClickOutside(CartPopup)