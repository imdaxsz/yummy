/**
 * @jest-environment jsdom
 */
import * as animeModule from 'animejs/lib/anime.es';
import verticalAnimate from './verticalAnimation';

describe('verticalAnimate', () => {
  let animeSpy;

  beforeEach(() => {
    animeSpy = jest.spyOn(animeModule, 'default');
  });

  afterEach(() => {
    animeSpy.mockRestore();
  });

  it('reverse가 false이고 callback이 null이면 complete가 false인 anime 인스턴스를 반환해야 한다.', () => {
    verticalAnimate('#test', 200, false, null);

    expect(animeSpy).toHaveBeenCalledWith({
      targets: '#test',
      translateY: '-100%',
      opacity: 1,
      duration: 200,
      autoplay: false,
      easing: 'easeInOutQuad',
      complete: false,
    });
  });

  it('reverse가 true이고 callback이 존재하면 complete가 callback인 인스턴스를 반환해야 한다.', () => {
    const mockCallback = jest.fn();
    verticalAnimate('#test', 200, true, mockCallback);

    expect(animeSpy).toHaveBeenCalledWith({
      targets: '#test',
      translateY: 0,
      opacity: 0.2,
      duration: 200,
      autoplay: false,
      easing: 'easeInOutQuad',
      complete: mockCallback,
    });
  });
});
