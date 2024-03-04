const scrollLock = (display) => {
  if (window.innerWidth - document.body.clientWidth <= 0) return;

  // 스크롤이 있는 경우 document 스타일 수정
  if (display === 'block') {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;
      `;
  }
  if (display === 'none') {
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  }
};

export default scrollLock;
