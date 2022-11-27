import dayjs from 'dayjs'

const updatedDate = (createAt: string) => {
  const nowDate = dayjs()
  const nowDateFormat = dayjs(nowDate.format(), 'YYYY-MM-DDTHH:mm:ss+SSS')
  const createDate = dayjs(createAt, 'd, DD MM YYYY HH:mm:ss GMT')

  if (createDate.format('YYYY MM DD') === nowDateFormat.format('YYYY MM DD')) {
    if (nowDateFormat.diff(createDate, 'hour')) return `${nowDateFormat.diff(createDate, 'hour')}시간 전`
    if (nowDateFormat.diff(createDate, 'minute')) return `${nowDateFormat.diff(createDate, 'minute')}분 전`
    if (nowDateFormat.diff(createDate, 'second')) return `${nowDateFormat.diff(createDate, 'second')}초 전`
  }
  if (createDate.get('year') < nowDateFormat.get('year')) return `${createDate.format('YYYY년 MM월 DD일')}`
  return `${createDate.format('MM월 DD일')}`
}

export default updatedDate
