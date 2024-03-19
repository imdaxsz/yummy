const scrollLock = (display, to = null) => {
  // 스크롤이 있는 경우 document 스타일 수정
  if (display === 'block') {
    document.body.style.cssText = `
      position: fixed; 
      top: -${to ? 0 : window.scrollY}px;
      overflow-y: scroll;
      width: 100%;
      `;
  }
  if (display === 'none') {
    const scrollY = to ? `-${to}` : document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
};

export default scrollLock;
