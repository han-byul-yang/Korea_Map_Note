import { DocumentData, QuerySnapshot } from 'firebase/firestore'

import { IMarkPosition } from 'types/markPositionType'

export const getMemoPositionFromFirebaseHandler = (
  memoDocs: QuerySnapshot<DocumentData>,
  markPrevPosition: IMarkPosition
) => {
  return {
    ...markPrevPosition,
    memoPlacePosition: memoDocs.docs.map((docs) => {
      const {
        geolocation: { latitude, longitude },
        memo: { siteName, createAt },
      } = docs.data().data

      return {
        latitude,
        longitude,
        createAt,
        siteName,
      }
    }),
  }
}

export const getMarkPositionDocsFromFirebaseHandler = (
  memoDocs: QuerySnapshot<DocumentData>,
  markPosition: IMarkPosition
) => {
  return [...memoDocs.docs]
    .reverse()
    .map((firebaseMemo) => {
      return { memoInfo: firebaseMemo.data().data, docId: firebaseMemo.id }
    })
    .filter(
      (doc) =>
        doc.memoInfo.geolocation?.latitude === markPosition.clickedPosition.latitude &&
        doc.memoInfo.geolocation?.longitude === markPosition.clickedPosition.longitude
    )
}
