import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import ReactDatePicker from 'react-datepicker'

import { memoAtom } from 'store/atom'
import { CustomDateButton } from './CustomDateButton'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './travelDate.module.scss'
import dayjs from 'dayjs'

const TravelDate = () => {
  const [memo, setMemo] = useRecoilState(memoAtom)

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setMemo((prevTask) => ({
      ...prevTask,
      travelDate: { startDate: start, endDate: end },
    }))
  }

  return (
    <div className={styles.customDateButton}>
      <ReactDatePicker
        selected={new Date()}
        onChange={handleDateChange}
        startDate={new Date()}
        endDate={null}
        selectsRange
        dateFormat='yyyy.MM.dd'
        customInput={<CustomDateButton />}
      />
    </div>
  )
}

export default TravelDate
