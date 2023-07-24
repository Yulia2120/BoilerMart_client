
import { IAuthPageInput } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'




const EmailInput = ({register, errors}: IAuthPageInput) =>{
    return(
        <label className={styles.form__label}>
            <input{...register('email', {
                required: 'Введите Email!',
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Некорректный Email!'
                }
            })} className={styles.form__input} type="email" placeholder='Email' />
            {errors.name && (
                <span className={styles.error_alert}>{errors.email?.message}</span>
            )}
           
        </label>
    )
}

export default EmailInput