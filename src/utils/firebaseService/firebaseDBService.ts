import { query, collection, getDocs } from 'firebase/firestore'

import { firebaseDBService } from './firebaseSetting'

export const getDocsFromFirebase = async (id: string) => {
  const collectionQuery = query(collection(firebaseDBService, id))
  const docs = await getDocs(collectionQuery)

  return docs
}
