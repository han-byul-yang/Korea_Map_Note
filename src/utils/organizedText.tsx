import { Fragment } from 'react'

const organizedText = (text: string) => {
  const parsedText = text.split(/\n/g).map((splitText, index) => {
    const splitTextKey = `splitText-${index}`

    return (
      <Fragment key={splitTextKey}>
        {splitText}
        <br />
      </Fragment>
    )
  })
  return parsedText
}

export default organizedText
