import dayjs from 'dayjs'

const presentDate = () => {
  const nowDate = dayjs()
  const nowDateFormat = dayjs(nowDate.format(), 'YYYY-MM-DDTHH:mm:ss+SSS')
  return `${nowDateFormat.format('YYYY년 MM월 DD일 HH시 mm분')}`
}

export default presentDate
