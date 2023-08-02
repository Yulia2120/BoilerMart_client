import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { $shoppingCart, $totalPrice } from '@/context/shopping-cart'
import { formatPrice } from '@/utils/common'
import styles from '@/styles/order/index.module.scss'


const OrderPage = () => {
    const mode = useStore($mode)
    const shoppingCart = useStore($shoppingCart)
    const totalPrice = useStore($totalPrice)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    return(
        <section className={styles.order}>
            <div className='container'>
                <h2 className={`${styles.order__title} ${darkModeClass}`}>
                Оформление заказа
                </h2>
                <div className={styles.order__inner}>
                    <div className={styles.order__cart}>
                        <div/>
                    </div>
                    <div className={styles.order__pay}>
                        <h3 className={`${styles.order__pay__title} ${darkModeClass}`}>
                            Итого
                            </h3>
                            <div className={`${styles.order__pay__inner} ${darkModeClass}`}>
                                <div className={styles.order__pay__goods}>
                                    <span>Товары 
                                        ({shoppingCart.reduce((defaultCount, item) => defaultCount + item.count, 0)})
                                        </span>
                                        <span>{formatPrice(totalPrice)} UAN</span>
                                </div>
                                <div className={styles.order__pay__total}>
                                    <span>На сумму</span>
                                    <span className={darkModeClass}>{formatPrice(totalPrice)} UAN</span>
                                </div>
                                <button>Подтвердить заказ</button>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderPage