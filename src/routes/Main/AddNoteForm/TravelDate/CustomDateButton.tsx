import { forwardRef, LegacyRef } from 'react'

export const CustomDateButton = forwardRef(({ value, onClick }: any, ref: LegacyRef<HTMLButtonElement> | undefined) => (
  <div>
    <button type='button' onClick={onClick} ref={ref}>
      <div>{value}</div>
    </button>
  </div>
))

CustomDateButton.displayName = 'customButton'
