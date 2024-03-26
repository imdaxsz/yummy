import { storage } from '@libs/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const getImageUrl = async (uid, docId, attachment) => {
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

export default getImageUrl;
