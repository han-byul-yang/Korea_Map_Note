import { query, collection, getDocs, doc, setDoc, onSnapshot, Query, DocumentData } from 'firebase/firestore'
import { deleteObject, getBlob, getDownloadURL, getStorage, listAll, ref, uploadBytesResumable } from 'firebase/storage'

import { IStoredMemoInfo } from 'types/memoType'
import { firebaseDBService, firebaseStorageService } from './firebaseSetting'

export const createDocsToFirebase = async (collectionName: string, docId: number, data: IStoredMemoInfo) => {
  await setDoc(doc(firebaseDBService, collectionName, `${docId}`), { data })
}

export const getDocsFromFirebase = async (id: string) => {
  const collectionQuery = query(collection(firebaseDBService, id))
  const docs = await getDocs(collectionQuery)

  return docs
}

const deleteImagesOfFirebase = async (userId: string, createAt: number) => {
  const storage = getStorage()

  const desertRef = ref(storage, `${userId}/${createAt}`)
  const storageList = await listAll(desertRef)
  storageList.items.map((item) => {
    deleteObject(ref(storage, `${userId}/${createAt}/${item.name}`))
  })
}

const storeImagesToFirebase = (imageFileUrl: File[], userId: string, createAt: number) => {
  const storage = getStorage()

  const uploadTaskList = imageFileUrl.map((file, index) => {
    const storageRef = ref(storage, `${userId}/${createAt}/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    if (index !== imageFileUrl.length - 1) return
    // eslint-disable-next-line consistent-return
    return uploadTask
  })

  return uploadTaskList[imageFileUrl.length - 1]
}

export const addImagesToFirebase = (imageFileUrl: File[], userId: string, createAt: number) => {
  return storeImagesToFirebase(imageFileUrl, userId, createAt)
}

export const updateImagesToFirebase = (imageFileUrl: File[], userId: string, createAt: number) => {
  deleteImagesOfFirebase(userId, createAt)
  return storeImagesToFirebase(imageFileUrl, userId, createAt)
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
