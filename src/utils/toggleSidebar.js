/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import anime from 'animejs/lib/anime.es';
import scrollLock from './scrollLock';

const toggleSidebar = () => {
  const sidebar = document.querySelector('#sidebar');
  const prev = sidebar.style.display === 'block';
  const display = prev ? 'none' : 'block';
  scrollLock(display);
  animate(sidebar, display);
};

const animate = (el, display) => {
  function setDisplay() {
    el.style.display = display;
  }

  const drawer = anime({
    targets: '#drawer',
    translateX: display === 'block' ? '-300px' : '300px',
    duration: 200,
    autoplay: false,
    easing: 'easeInOutQuad',
  });

  const container = anime({
    targets: '#sidebar',
    autoplay: false,
    duration: 150,
    easing: 'easeInOutQuad',
    opacity: display === 'block' ? '1' : '0',
    begin: display === 'block' && setDisplay,
    complete: display !== 'block' && setDisplay,
  });

  drawer.play();
  container.play();
};

export default toggleSidebar;
