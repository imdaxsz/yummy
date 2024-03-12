import scrollLock from './scrollLock';

const toggleSidebar = () => {
  const sidebar = document.querySelector('#sidebar');
  const prev = sidebar.style.display === 'block';
  const display = prev ? 'none' : 'block';
  sidebar.style.display = display;
  scrollLock(display);
};

export default toggleSidebar;
