import anime from 'animejs/lib/anime.es';

/**
 * @description 수직으로 움직이는 애니메이션
 * @param {*} selector 애니메이션을 추가할 html 요소
 * @param {*} duration default = 200
 * @param {*} reverse 역방향 여부
 * @param {*} callback 애니메이션 완료 후 실행할 함수
 * @returns
 */
const animate = (
  selector,
  duration = 200,
  reverse = false,
  callback = null,
) => {
  const el = anime({
    targets: selector,
    translateY: reverse ? 0 : '-100%',
    opacity: reverse ? 0.2 : 1,
    duration,
    autoplay: false,
    easing: 'easeInOutQuad',
    complete: reverse && callback,
  });
  return el;
};

export default animate;
