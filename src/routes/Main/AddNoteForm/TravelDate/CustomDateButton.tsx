import { forwardRef, LegacyRef } from 'react'

import { CalendarIcon } from 'assets/svgs'
import styles from './travelDate.module.scss'

export const CustomDateButton = forwardRef(({ value, onClick }: any, ref: LegacyRef<HTMLButtonElement> | undefined) => (
  <>
    <CalendarIcon className={styles.calendarIcon} />
    <button type='button' onClick={onClick} ref={ref}>
      <div>{value}</div>
    </button>
  </>
))

CustomDateButton.displayName = 'customButton'
