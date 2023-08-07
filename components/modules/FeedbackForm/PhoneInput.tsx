import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const PhoneInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Телефон *</span>
    <input
      className={styles.feedback_form__form__input}
      placeholder="380 97 999 99 99"
      type="tel"
      {...register('phone', {
        required: 'Введите телефон!',
        pattern: {
          value: /^\d*[1-9]\d*$/,
          message: 'Недопустимое значение',
        },
        minLength: 12,
        maxLength: 12,
      })}
    />
    {errors.phone && (
      <span className={styles.error_alert}>{errors.phone?.message}</span>
    )}
    {errors.phone && errors.phone.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 12 цифр!</span>
    )}
    {errors.phone && errors.phone.type === 'maxLength' && (
      <span className={styles.error_alert}>Не более 12 цифр!</span>
    )}
  </label>
)

export default PhoneInput