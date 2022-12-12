import { useRecoilState } from 'recoil'
import ReactDatePicker from 'react-datepicker'

import { memoAtom } from 'store/atom'
import { CustomDateButton } from './CustomDateButton'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './travelDate.module.scss'

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
        selected={memo.travelDate.startDate}
        onChange={handleDateChange}
        startDate={memo.travelDate.startDate}
        endDate={memo.travelDate.endDate}
        selectsRange
        dateFormat='yyyy.MM.dd'
        customInput={<CustomDateButton />}
      />
    </div>
  )
}

export default TravelDate
