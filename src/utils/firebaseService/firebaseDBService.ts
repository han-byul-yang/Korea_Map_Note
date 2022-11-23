import { query, collection, getDocs, doc, setDoc, onSnapshot, Query, DocumentData } from 'firebase/firestore'
import { getBlob, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'

import { IStoredMemoInfo } from 'types/memoType'
import { firebaseDBService, firebaseStorageService } from './firebaseSetting'

export const getDocsFromFirebase = async (id: string) => {
  const collectionQuery = query(collection(firebaseDBService, id))
  const docs = await getDocs(collectionQuery)

  return docs
}

export const createDocsToFirebase = async (collectionName: string, docId: number, data: IStoredMemoInfo) => {
  await setDoc(doc(firebaseDBService, collectionName, `${docId}`), { data })
}

export const storeImagesToFirebase = (imageFileUrl: File[], userId: string, createAt: number) => {
  imageFileUrl.map(async (file) => {
    const storageRef = ref(firebaseStorageService, `${userId}/${createAt}/${file.name}`)
    await uploadBytes(storageRef, file)
  })
}

export const getImagesUrlFromFirebase = async (userId: string, createAt: number) => {
  const storageRef = ref(firebaseStorageService, `${userId}/${createAt}`)

  const storage = await listAll(storageRef)
  const dataList = storage.items.map((item) => {
    const url = getDownloadURL(ref(firebaseStorageService, `${userId}/${createAt}/${item.name}`))
    return url
  })

  return Promise.all(dataList)
}

export const getImagesBlobFromFirebase = async (userId: string, createAt: number) => {
  const storageRef = ref(firebaseStorageService, `${userId}/${createAt}`)

  const storage = await listAll(storageRef)
  const dataList = storage.items.map(async (item) => {
    const url = await getBlob(ref(firebaseStorageService, `${userId}/${createAt}/${item.name}`))
    return { url, name: item.name }
  })

  return Promise.all(dataList)
}

export const snapShotFirebaseData = (
  document: Query<DocumentData>,
  snapShotHandler: () => Promise<void> | Promise<void> | void
) => {
  const snapShotEvent = onSnapshot(document, snapShotHandler)
  return snapShotEvent
}
