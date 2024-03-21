/**
 * @description popup 생성/제거 시 body 스크롤을 설정하는 함수
 * @param {*} display popup 요소의 display
 * @param {*} to popup을 닫을 때 이동할 좌표 (popup을 열 때 최상단으로 이동하는 경우에만 사용)
 * @returns
 */
const scrollLock = (display, to = null) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // 스크롤을 막는다.
  if (display === 'block') {
    if (isMobile) {
      document.body.style.overflowY = 'hidden';
      return;
    }
    document.body.style.cssText = `
      position: fixed; 
      top: -${to ? 0 : window.scrollY}px;
      overflow-y: ${
        window.innerWidth - document.body.clientWidth > 0 ? 'scroll' : 'hidden'
      };
      width: 100%;
      `;
  }
  if (display === 'none') {
    document.body.style.cssText = '';
    if (isMobile) return;
    const scrollY = to ? `-${to}` : document.body.style.top;
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
  if (navigator.userAgentData.mobile) document.body.style.background = 'black';
};

export default scrollLock;
