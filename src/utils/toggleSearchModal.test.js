/**
 * @jest-environment jsdom
 */
import * as scrollLockModule from './scrollLock';
import toggleSearchModal from './toggleSearchModal';

window.scrollTo = jest.fn();

describe('toggleSearchModal', () => {
  let modal;
  let scrollLockSpy;

  beforeEach(() => {
    modal = document.createElement('div');
    modal.id = 'searchModal';
    modal.style.display = 'none';
    document.body.appendChild(modal);

    scrollLockSpy = jest.spyOn(scrollLockModule, 'default');
  });

  afterEach(() => {
    modal.remove();
    scrollLockSpy.mockRestore();
  });

  it('modal의 display가 block이면 modal을 제거해야 한다.', () => {
    modal.style.display = 'block';
    toggleSearchModal(modal);
    expect(modal.style.display).toBe('none');
    expect(scrollLockSpy).toHaveBeenCalledWith('none');
  });

  it('modal의 display가 none이면 modal을 화면에 띄워야 한다.', () => {
    const input = document.createElement('input');
    input.classList.add('auto-focus');
    modal.appendChild(input);

    toggleSearchModal(modal);

    expect(modal.style.display).toBe('block');
    expect(scrollLockSpy).toHaveBeenCalledWith('block');
    expect(document.activeElement).toBe(input);
  });
});
