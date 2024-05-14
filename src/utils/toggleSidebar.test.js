/**
 * @jest-environment jsdom
 */
import * as animeModule from 'animejs/lib/anime.es';
import * as scrollLockModule from './scrollLock';
import toggleSidebar from './toggleSidebar';

window.scrollTo = jest.fn();

describe('toggleSidebar', () => {
  let scrollLockSpy;
  let animeSpy;

  // sidebar 생성
  const sidebar = document.createElement('div');
  sidebar.id = 'sidebar';
  sidebar.style.display = 'block';
  document.body.appendChild(sidebar);

  beforeEach(() => {
    scrollLockSpy = jest.spyOn(scrollLockModule, 'default');
    animeSpy = jest.spyOn(animeModule, 'default');
  });

  afterEach(() => {
    scrollLockSpy.mockRestore();
    animeSpy.mockRestore();
  });

  it('현재 sidebar의 display가 block이면 sidebar를 닫아야 한다.', () => {
    toggleSidebar();

    expect(scrollLockSpy).toHaveBeenCalledWith('none');

    expect(animeSpy).toHaveBeenCalledWith({
      targets: '#drawer',
      translateX: '300px',
      duration: 200,
      autoplay: false,
      easing: 'easeInOutQuad',
    });

    expect(animeSpy).toHaveBeenCalledWith({
      targets: '#sidebar',
      autoplay: false,
      duration: 150,
      easing: 'easeInOutQuad',
      opacity: '0',
      begin: false,
      complete: expect.any(Function),
    });
  });

  it('현재 sidebar의 display가 none이면 sidebar를 열어야 한다.', () => {
    sidebar.style.display = 'none';

    toggleSidebar();

    expect(scrollLockSpy).toHaveBeenCalledWith('block');

    expect(animeSpy).toHaveBeenCalledWith({
      targets: '#drawer',
      translateX: '-300px',
      duration: 200,
      autoplay: false,
      easing: 'easeInOutQuad',
    });

    expect(animeSpy).toHaveBeenCalledWith({
      targets: '#sidebar',
      autoplay: false,
      duration: 150,
      easing: 'easeInOutQuad',
      opacity: '1',
      begin: expect.any(Function),
      complete: false,
    });
  });
});
