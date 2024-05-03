import { db } from '@libs/firebase';
import store from '@stores';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

/**
 * @description 리스트 좋아요 추가/삭제
 * @param {string} uid 사용자 id
 * @param {string} docId 리스트 id
 * @param {boolean} isLiked 기존 좋아요 여부
 */
export const toggleLikeList = async (uid, docId, isLiked) => {
  try {
    const docRef = doc(db, 'list', docId);
    const list = await getDoc(docRef);

    if (!list.exists()) return;
    const { likes, likeCount } = list.data();

    if (isLiked) {
      await updateDoc(docRef, {
        likes: [...likes.filter((id) => id !== uid)],
        likeCount: likeCount - 1,
      });
      return;
    }
    await updateDoc(docRef, {
      likes: [...likes, uid],
      likeCount: likeCount + 1,
    });
  } catch (error) {
    console.log('Error with like list: ', error);
  }
};

/**
 * @description 맛집 포스트 좋아요 추가/삭제
 * @param {string} uid 사용자 id
 * @param {string} docId 포스트 id
 * @param {boolean} isLiked 기존 좋아요 여부
 */
export const toggleLikePost = async (uid, docId, isLiked) => {
  try {
    const docRef = doc(db, 'posts', docId);
    const post = await getDoc(docRef);

    if (!post.exists()) return;
    const { likes } = post.data();
    if (isLiked) {
      await updateDoc(docRef, {
        likes: [...likes.filter((id) => id !== uid)],
      });
      return;
    }
    await updateDoc(docRef, { likes: [...likes, uid] });
  } catch (error) {
    console.log('Error with like post: ', error);
  }
};

/**
 * @description 좋아요한 리스트 및 포스트 목록 조회
 * @param {string} type 조회할 타입: list | posts
 * @param {*} callback 조회 성공 후 수행할 callback (state update function)
 * @param {boolean} observe 실시간 업데이트 수신 대기 여부
 */
export const getLikeItems = async (type, callback, observe = false) => {
  try {
    const { user } = store.state;

    const q = query(
      collection(db, type),
      where('likes', 'array-contains', user.uid),
      limit(2),
    );

    if (!observe) {
      const res = await getDocs(q);
      const items = res.docs.map((item) => ({ id: item.id, ...item.data() }));
      if (callback) callback(items);
      return;
    }

    const q2 = query(
      collection(db, type),
      where('likes', 'array-contains', user.uid),
    );

    onSnapshot(q2, (querySnapshot) => {
      const items = querySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      if (callback) callback(items);
    });
  } catch (error) {
    console.log('Error with fetching like items: ', error);
  }
};
