/* eslint-disable no-param-reassign */
import scrollLock from './scrollLock';

const toggleSearchModal = (modal) => {
  const display = modal.style.display;
  if (display === 'block') {
    modal.style.display = 'none';
    scrollLock('none');
    return;
  }
  modal.style.display = 'block';
  scrollLock('block');
  const input = modal.querySelector('input.auto-focus');
  if (input) input.focus();
};

export default toggleSearchModal;
