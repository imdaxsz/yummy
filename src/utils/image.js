import { storage } from '@libs/firebase';
import { deleteObject, getDownloadURL, listAll, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

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

export const deleteImageFiles = async (uid, postId) => {
  const locationRef = ref(storage, `${uid}/${postId}`);
  try {
    const res = await listAll(locationRef);
    res.items.forEach((itemRef) => deleteObject(itemRef));
  } catch (error) {
    console.log('Error with deleting image files: ', error);
  }
};
