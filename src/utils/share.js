/* eslint-disable no-use-before-define */
import Snackbar from '@components/Snackbar';

/**
 * @description 리스트 또는 맛집 공유
 */
const sharePage = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  // 모바일 환경인 경우 web share api 사용
  const url = window.location.href;
  if (isMobile) {
    const shareObject = {
      title: document.title,
      text: '맛집 공유 웹앱',
      url,
    };

    if (navigator.share) {
      try {
        navigator.share(shareObject);
      } catch (error) {
        console.log(error);
        window.alert('오류가 발생했어요.');
      }
      return;
    }
    new Snackbar({ message: '현재 환경에서는 공유를 지원하지 않아요.' });
    return;
  }

  // PC 환경인 경우 링크 복사만 수행
  copyURL(url);
};

const copyURL = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    new Snackbar({ message: '링크가 복사되었어요.' });
  } catch (error) {
    alert('오류가 발생했어요.');
    console.log('Error with copy Url: ', error);
  }
};

export default sharePage;
