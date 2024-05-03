import { storage } from '@libs/firebase';
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadString,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { getListInfo, updateList } from './list';

/**
 * @description storage에 이미지 저장 후 url을 반환하는 함수
 */
export const getImageUrl = async (uid, docId, attachment) => {
  try {
    const locationRef = ref(storage, `${uid}/${docId}/${uuidv4()}`);
    const response = await uploadString(locationRef, attachment, 'data_url');
    const attachmentUrl = await getDownloadURL(response.ref);
    return attachmentUrl;
  } catch (error) {
    console.log('Error with getting image url: ', error);
    throw error;
  }
};

/**
 * @description storage에서 포스트 이미지 전체 삭제
 */
export const deleteImageFiles = async (uid, postId) => {
  const locationRef = ref(storage, `${uid}/${postId}`);
  try {
    const listRef = await getListInfo(uid);
    const listThumbnail = listRef.data().thumbnail;

    const res = await listAll(locationRef);
    res.items.forEach(async (itemRef) => {
      // 맛집 목록의 섬네일을 삭제할 경우 목록 데이터에도 반영
      if (listThumbnail.includes(itemRef.name)) {
        await updateList(uid, { thumbnail: '' });
      }
      await deleteObject(itemRef);
    });
  } catch (error) {
    console.log('Error with deleting image files: ', error);
  }
};

/**
 * @description storage에서 포스트 이미지 하나 삭제
 */
export const deleteImageFile = async (uid, image) => {
  try {
    const locationRef = ref(storage, image);
    await deleteObject(locationRef);
    const listRef = await getListInfo(uid);
    const listThumbnail = listRef.data().thumbnail;
    if (listThumbnail === image) {
      await updateList(uid, { thumbnail: '' });
    }
  } catch (error) {
    console.log('Error with deleting image file: ', error);
  }
};
