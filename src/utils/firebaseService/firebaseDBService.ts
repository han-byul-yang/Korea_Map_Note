import { query, collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'

import { IStoredMemoInfo } from 'types/memoType'
import { firebaseDBService, firebaseStorageService } from './firebaseSetting'

export const getDocsFromFirebase = async (id: string) => {
  const collectionQuery = query(collection(firebaseDBService, id))
  const docs = await getDocs(collectionQuery)

  return docs
}

export const createDocsToFirebase = (collectionName: string, docId: number, data: IStoredMemoInfo) => {
  // addDoc(collection(firebaseDBService, collectionName), { data })
  setDoc(doc(firebaseDBService, collectionName, `${docId}`), { data })
}

export const storeImagesToFirebase = (imageFileUrl: File[], userId: string, createAt: number) => {
  imageFileUrl.map((file) => {
    const storageRef = ref(firebaseStorageService, `${userId}/${createAt}/${file.name}`)
    uploadBytes(storageRef, file)
  })
}

export const getImagesFromFirebase = async (userId: string, createAt: number) => {
  const storageRef = ref(firebaseStorageService, `${userId}/${createAt}`)
  const storage = await listAll(storageRef)
  const data = storage.items.map((item) => {
    const url = getDownloadURL(ref(firebaseStorageService, `${userId}/${createAt}/${item.name}`))
    return url
  })
  return Promise.all(data)
}
// Promise all 자세히 알아보기
