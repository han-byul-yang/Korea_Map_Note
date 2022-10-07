import { query, collection, getDocs, addDoc } from 'firebase/firestore'

import { IMemoDocs } from 'types/memoType'
import { firebaseDBService } from './firebaseSetting'

export const getDocsFromFirebase = async (id: string) => {
  const collectionQuery = query(collection(firebaseDBService, id))
  const docs = await getDocs(collectionQuery)

  return docs
}

export const createDocsToFirebase = (id: string, data: IMemoDocs) => {
  addDoc(collection(firebaseDBService, id), { data })
}
